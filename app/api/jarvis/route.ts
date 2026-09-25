import { NextRequest, NextResponse } from "next/server";
import { processMessage, isGoodbye } from "@/lib/jarvis-engine";
import { generateJarvisReply, type ChatHistoryItem } from "@/lib/llm";

/**
 * The provider stack budgets itself to ~20s before handing over to the local
 * engine; this leaves headroom above that. Vercel clamps it to the plan limit.
 */
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message: string = body.message;
    const history: ChatHistoryItem[] = Array.isArray(body.history) ? body.history : [];

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const goodbye = isGoodbye(message);

    // 1. Attempt generation via the configured providers (OpenRouter model
    //    chain, then Gemini). Each returns null rather than throwing.
    const aiResponse = await generateJarvisReply(message, history);
    if (aiResponse && aiResponse.reply) {
      return NextResponse.json({
        reply: aiResponse.reply,
        suggestions: aiResponse.suggestions || [],
        goodbye,
        source: aiResponse.source,
      });
    }

    // 2. Seamless fallback to local deterministic engine if every provider is
    //    unavailable, so the chatbot always answers.
    const fallbackResponse = processMessage(message);
    return NextResponse.json({
      reply: fallbackResponse.reply,
      suggestions: fallbackResponse.suggestions || [],
      goodbye,
      source: "local",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
