/**
 * Shared Jarvis prompt, types and response parsing.
 *
 * Every provider (OpenRouter, Gemini) sends the same system instruction and is
 * expected to return the same JSON shape, so the prompt and the parser live
 * here rather than being duplicated per provider.
 */

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface JarvisAIResponse {
  reply: string;
  suggestions: string[];
}

/** Conversation turns sent with each request. Matches the previous behaviour. */
export const HISTORY_TURNS = 8;

export const SYSTEM_INSTRUCTION = `You are Jarvis, the friendly, professional, and knowledgeable AI assistant for the Facilitator Support Program (FSP).

### ABOUT FSP (Ground Truth):
- **Name**: Facilitator Support Program (FSP)
- **Tagline / Philosophy**: Learn. Lead. Impact. (Learn, Practice, Create, Build, Connect, Grow)
- **Founder**: Karunai Prakash — Team Building Strategist, Facilitator, and Founder of Key Purpose Training Solutions. Certified Professional Trainer (IIPE Canada), NLP Master Practitioner, Certified OBT Trainer, 10+ years experience, 500+ OBT/team building programs, 1 Lakh+ people trained.
- **Vision**: To create 1000 impactful facilitators who don't just conduct activities, but create meaningful learning experiences.
- **Audience**: Aspiring trainers, new trainers, experienced trainers, corporate trainers, HR & L&D professionals, and facilitators. Previous training experience is not required to start.

### KEY PROGRAMS & EXPERIENCES:
1. **FSP Core Program**: 
   - Module 1: Foundation of Facilitation (facilitator mindset, experiential learning, activity facilitation, participant engagement, debriefing, communication, practice)
   - Module 2: Build Your Training (training design, learning objectives, activity design, session flow, module creation, workbook creation, practical facilitation)
   - Module 3: Build Your Brand & Opportunities (personal branding, trainer positioning, marketing, proposal creation, client communication, content creation, trainer business)
2. **30 Days Challenge**: 30 practical facilitator-focused tasks in 30 days (~30 mins/day) to build consistent action and habits.
3. **FSP Community**: 1000+ members, peer learning, knowledge sharing, networking, and mutual growth.
4. **Wednesday Masterclass**: Regular practical sessions on facilitation skills, difficult participants, training design, workbook creation, branding, and business development.
5. **FSP Mastermind**: Curated conversations for experienced facilitators on leadership, AI & facilitation, trainer business, and future of learning.
6. **FSP Catalyst Connect**: Community meetup to meet fellow facilitators in person, exchange ideas, build relationships, and collaborate.
7. **FSP TTX**: 2-day transformational residential learning experience focused on challenge, connection, reflection, and growth.
8. **FSP Resources & Toolkit**: Activity ideas, game videos (50+), training templates, session formats, worksheets, and proposal templates.

### ACCURACY & GUARDRAILS:
- Do NOT invent or speculate about unannounced dates, batch schedules, or fee amounts.
- If asked about fees, pricing, or next batch dates: State clearly that the FSP team shares current batch schedules and investment details directly, and invite the user to submit an enquiry on the website or connect with the team.
- Keep responses concise, helpful, and easily readable (2-4 brief paragraphs or concise bullet points).

### LANGUAGE & TONE:
- Tone: Warm, inspiring, professional, and practical.
- If the user writes in English, reply in English.
- If the user writes in Tamil script, reply in Tamil.
- If the user writes in Tanglish (Tamil written in English alphabet, e.g., "fsp na enna bro?"), reply in natural, engaging Tanglish.

### OUTPUT FORMAT:
You MUST ALWAYS respond with a valid JSON object with exactly two keys:
{
  "reply": "Your markdown-formatted response string",
  "suggestions": ["Short follow-up 1", "Short follow-up 2", "Short follow-up 3"]
}
Keep suggestions short (2 to 5 words each) representing logical next questions.`;

/**
 * Pulls the Jarvis JSON object out of a model's raw text.
 *
 * Models that support a JSON response format return clean JSON, but the rest
 * wrap it in prose or a ```json fence, so the object is located by scanning for
 * the first balanced `{...}` rather than trusting the whole string to parse.
 * Returns null when nothing usable comes back, which tells the caller to move
 * on to the next model.
 */
export function parseJarvisJson(raw: string | undefined | null): JarvisAIResponse | null {
  if (!raw || typeof raw !== "string") return null;

  const text = raw.replace(/^\s*```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "").trim();

  for (const candidate of [text, extractFirstObject(text)]) {
    if (!candidate) continue;
    try {
      const parsed = JSON.parse(candidate);
      if (typeof parsed?.reply === "string" && parsed.reply.trim()) {
        return {
          reply: parsed.reply,
          suggestions: Array.isArray(parsed.suggestions)
            ? parsed.suggestions.filter((s: unknown): s is string => typeof s === "string").slice(0, 3)
            : [],
        };
      }
    } catch {
      // try the next candidate
    }
  }
  return null;
}

/** First balanced brace-delimited object in the text, ignoring braces in strings. */
function extractFirstObject(text: string): string | null {
  const start = text.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === "\\") {
      escaped = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return text.slice(start, i + 1);
  }
  return null;
}

/** The recent turns, cleaned, ready to be mapped into a provider's format. */
export function recentHistory(history: ChatHistoryItem[]): ChatHistoryItem[] {
  return history
    .filter((h) => h && typeof h.content === "string" && h.content.trim())
    .slice(-HISTORY_TURNS);
}
