import { generateViaOpenRouter } from "./openrouter";
import { generateJarvisAIResponse } from "./gemini";
import type { ChatHistoryItem, JarvisAIResponse } from "./jarvis-prompt";

export type { ChatHistoryItem, JarvisAIResponse };

export type JarvisReply = JarvisAIResponse & {
  /** Which provider answered, e.g. "openrouter:google/gemma-4-31b-it:free". */
  source: string;
};

type ProviderName = "openrouter" | "gemini";

/**
 * Wall-clock ceiling for the whole provider stack.
 *
 * Past this the local engine answers instead, because a chat that takes longer
 * than this has already lost the user. Each provider is handed the time that
 * is actually left rather than its own fixed timeout.
 */
const TOTAL_BUDGET_MS = 20_000;

const providers: Record<
  ProviderName,
  (m: string, h: ChatHistoryItem[], budgetMs: number) => Promise<JarvisReply | null>
> = {
  openrouter: async (message, history) => {
    const result = await generateViaOpenRouter(message, history);
    return result ? { reply: result.reply, suggestions: result.suggestions, source: `openrouter:${result.model}` } : null;
  },
  gemini: async (message, history, budgetMs) => {
    const result = await generateJarvisAIResponse(message, history, budgetMs);
    return result ? { ...result, source: "gemini" } : null;
  },
};

/**
 * Provider order. OpenRouter leads because it carries its own model fallback
 * chain; Gemini backs it up. Override with LLM_PROVIDERS, e.g. "gemini,openrouter".
 * A provider with no API key configured returns null and is skipped.
 */
function providerOrder(): ProviderName[] {
  const raw = process.env.LLM_PROVIDERS?.trim();
  if (!raw) return ["openrouter", "gemini"];

  const order = raw
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter((p): p is ProviderName => p === "openrouter" || p === "gemini");

  return order.length > 0 ? order : ["openrouter", "gemini"];
}

/**
 * Generates a Jarvis reply, trying each configured provider in turn.
 *
 * Returns null only when every provider is unavailable or fails, which is the
 * signal for the caller to use the local deterministic engine.
 */
export async function generateJarvisReply(
  message: string,
  history: ChatHistoryItem[] = [],
): Promise<JarvisReply | null> {
  const deadline = Date.now() + TOTAL_BUDGET_MS;

  for (const name of providerOrder()) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;

    const reply = await providers[name](message, history, remaining);
    if (reply?.reply) return reply;
  }
  return null;
}
