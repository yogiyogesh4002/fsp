import {
  SYSTEM_INSTRUCTION,
  parseJarvisJson,
  recentHistory,
  type ChatHistoryItem,
  type JarvisAIResponse,
} from "./jarvis-prompt";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

export type OpenRouterModel = {
  /** Model id exactly as OpenRouter lists it. */
  id: string;
  /**
   * Whether the model accepts `response_format: { type: "json_object" }`.
   *
   * Taken from `supported_parameters` in https://openrouter.ai/api/v1/models.
   * When a model rejects the parameter anyway it is retried once without it,
   * so a stale value here costs one extra request, never an outage.
   */
  jsonMode: boolean;
};

/**
 * Fallback chain, best first.
 *
 * Ordered for this chatbot rather than by context window: the prompt is only a
 * few thousand tokens, so what matters is reliable JSON, strong Tamil and
 * Tanglish, and answering inside the timeout. Override with OPENROUTER_MODELS
 * (comma-separated ids); append `!json` to force JSON mode on for an id.
 *
 * Two different 429s arrive here and they are not the same thing: an
 * account-level free ceiling downs every `:free` id at once, while an upstream
 * provider throttle ("google/... is temporarily rate-limited upstream") downs
 * only that model. The chain must keep walking on the second kind, which is by
 * far the more common — see isAccountLimit.
 */
const DEFAULT_MODELS: OpenRouterModel[] = [
  { id: "google/gemma-4-31b-it:free", jsonMode: true },
  { id: "google/gemma-4-26b-a4b-it:free", jsonMode: true },
  { id: "qwen/qwen3.8-27b:free", jsonMode: false },
  { id: "nvidia/nemotron-3-super-120b-a12b:free", jsonMode: true },
  { id: "dots-studio/dots-3-note-preview:free", jsonMode: true },
  { id: "openrouter/free", jsonMode: true },
];

/** Per-model request timeout. Kept short because several may be tried in turn. */
const MODEL_TIMEOUT_MS = 6_000;
/** Ceiling for the whole chain, leaving room for the next provider after it. */
const CHAIN_BUDGET_MS = 12_000;

function configuredModels(): OpenRouterModel[] {
  const raw = process.env.OPENROUTER_MODELS?.trim();
  if (!raw) return DEFAULT_MODELS;

  const models = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const forceJson = entry.endsWith("!json");
      const id = forceJson ? entry.slice(0, -"!json".length) : entry;
      const known = DEFAULT_MODELS.find((m) => m.id === id);
      return { id, jsonMode: forceJson || known?.jsonMode || false };
    });

  return models.length > 0 ? models : DEFAULT_MODELS;
}

export type OpenRouterResult = JarvisAIResponse & { model: string };

/**
 * Asks each model in turn until one returns a usable Jarvis reply.
 *
 * Returns null when the key is missing, the budget runs out or every model
 * fails — the caller then moves to the next provider, and ultimately to the
 * local engine, so the chatbot always answers.
 */
export async function generateViaOpenRouter(
  message: string,
  history: ChatHistoryItem[] = [],
): Promise<OpenRouterResult | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const messages = [
    { role: "system", content: SYSTEM_INSTRUCTION },
    ...recentHistory(history).map((h) => ({ role: h.role, content: h.content })),
    { role: "user", content: message },
  ];

  const models = configuredModels();
  const deadline = Date.now() + CHAIN_BUDGET_MS;
  let freeTierExhausted = false;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    if (Date.now() >= deadline) break;
    // An ACCOUNT-level free limit takes every `:free` id down together, so
    // skip the rest rather than spending the budget collecting 429s. A single
    // model being throttled upstream does not trigger this — see isAccountLimit.
    if (freeTierExhausted && model.id.endsWith(":free")) continue;

    // Prose is only accepted from a model with no JSON mode, or from the last
    // model in the chain. Earlier JSON-capable models are given the chance to
    // answer properly so the suggestion chips survive.
    const salvage = !model.jsonMode || i === models.length - 1;

    const outcome = await callModel(apiKey, model, messages, deadline, model.jsonMode, salvage);
    if (outcome.reply) return { ...outcome.reply, model: model.id };
    if (outcome.freeTierExhausted) freeTierExhausted = true;
  }

  return null;
}

type Outcome = { reply: JarvisAIResponse | null; freeTierExhausted?: boolean };

/**
 * Whether a failure means the ACCOUNT's free allowance is spent, as opposed to
 * one model being busy.
 *
 * The distinction matters: an account limit takes every `:free` id down at
 * once, so there is no point trying the rest. An upstream throttle — which
 * OpenRouter reports as `provider_name` plus "temporarily rate-limited
 * upstream" — affects only that model, and the next one in the chain will
 * usually answer straight away.
 *
 * 402 means out of credits, which is always account-level.
 */
function isAccountLimit(status: number, detail: string): boolean {
  if (status === 402) return true;
  if (status !== 429) return false;

  // Named upstream provider, or the wording OpenRouter uses for it.
  if (/"provider_name"\s*:\s*"[^"]+"/i.test(detail)) return false;
  if (/rate-?limited upstream|temporarily rate-?limited|provider returned error/i.test(detail)) return false;

  return true;
}

async function callModel(
  apiKey: string,
  model: OpenRouterModel,
  messages: { role: string; content: string }[],
  deadline: number,
  allowJsonMode = model.jsonMode,
  salvagePlainText = false,
): Promise<Outcome> {
  const budget = Math.min(MODEL_TIMEOUT_MS, deadline - Date.now());
  if (budget <= 0) return { reply: null };

  const body: Record<string, unknown> = {
    model: model.id,
    messages,
    temperature: 0.7,
    max_tokens: 1024,
  };
  if (allowJsonMode) body.response_format = { type: "json_object" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), budget);

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Attribution on openrouter.ai. Optional, and safe to leave unset.
        ...(process.env.NEXT_PUBLIC_SITE_URL ? { "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL } : {}),
        "X-Title": "FSP Jarvis",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 300);

      // The model rejected the JSON parameter — the prompt already asks for
      // JSON, so retry once plainly rather than dropping the model.
      if (allowJsonMode && (response.status === 400 || response.status === 422) && /response_format/i.test(detail)) {
        return callModel(apiKey, model, messages, deadline, false, salvagePlainText);
      }

      console.warn(`OpenRouter ${model.id} -> ${response.status}: ${detail}`);
      return { reply: null, freeTierExhausted: isAccountLimit(response.status, detail) };
    }

    const data = await response.json();
    // OpenRouter surfaces upstream provider failures in the body with 200 OK.
    if (data?.error) {
      console.warn(`OpenRouter ${model.id} upstream error:`, String(data.error?.message ?? data.error).slice(0, 200));
      return { reply: null };
    }

    // Models without a JSON mode sometimes answer in prose. That is still a
    // real answer, so accept it rather than dropping through to the canned
    // local reply; suggestions simply come back empty.
    const parsed = parseJarvisJson(data?.choices?.[0]?.message?.content, { salvagePlainText });
    if (!parsed) {
      console.warn(`OpenRouter ${model.id} returned no parsable Jarvis JSON.`);
      return { reply: null };
    }
    return { reply: parsed };
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError";
    console.warn(`OpenRouter ${model.id} ${aborted ? "timed out" : "failed"}:`, aborted ? `${budget}ms` : err);
    return { reply: null };
  } finally {
    clearTimeout(timeout);
  }
}
