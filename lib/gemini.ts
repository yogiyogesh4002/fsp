import {
  SYSTEM_INSTRUCTION,
  parseJarvisJson,
  recentHistory,
  type ChatHistoryItem,
  type JarvisAIResponse,
} from "./jarvis-prompt";

// Re-exported so existing importers of these types keep working.
export type { ChatHistoryItem, JarvisAIResponse };

const TIMEOUT_MS = 12_000;

/**
 * Google Gemini provider.
 *
 * Returns null on any failure — missing key, HTTP error, timeout or an
 * unparsable body — so the caller can fall through to the next provider.
 */
export async function generateJarvisAIResponse(
  message: string,
  history: ChatHistoryItem[] = [],
): Promise<JarvisAIResponse | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const contents = recentHistory(history).map((h) => ({
    role: h.role === "assistant" ? "model" : "user",
    parts: [{ text: h.content }],
  }));

  contents.push({ role: "user", parts: [{ text: message }] });

  const requestBody = {
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
      maxOutputTokens: 1024,
    },
    contents,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(`Gemini API error (${response.status}):`, (await response.text()).slice(0, 300));
      return null;
    }

    const data = await response.json();
    const parsed = parseJarvisJson(data?.candidates?.[0]?.content?.parts?.[0]?.text);
    if (!parsed) {
      console.warn("Gemini returned no parsable Jarvis JSON.");
      return null;
    }
    return parsed;
  } catch (err) {
    console.warn("Gemini invocation failed:", err);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
