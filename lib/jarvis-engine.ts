import { getFallbackResponse } from "@/data/jarvis-knowledge";

type Language = "en" | "ta" | "tg";

export interface ChatResponse {
  reply: string;
  suggestions?: string[];
}

type TopicEntry = {
  id: string;
  topicEn: string[];
  topicTa: string[];
  topicTg: string[];
  replyTa: string;
  replyTg: string;
};

const topicMap: TopicEntry[] = [
  { id: "fsp-overview", topicEn: ["what is fsp", "facilitator support program", "about fsp"], topicTa: ["எஸ்பி என்ன", "ஃபாசிலிடேடர் சப்பார்ட்", "fsp பற்றி"], topicTg: ["fsp na enna", "fsp enna pannuvanga"], replyTa: "ஃபாசிலிடேடர் சப்பார்ட் (FSP) என்பது டிரெனர், ஃபாசிலிடேடர்கள் மற்றும் புதிய ஃபாசிலிடேடர்களுக்கான practical learning ecosystem. இது Karunai Prakash தோன்றியது, 2022 இலிருந்து செயல்பட்டு வருகிறது மற்றும் 1000 impactful facilitators ஆக நிறுத்துவது அதிகாரம்.", replyTg: "FSP (Facilitator Support Program) என்பது trainers, facilitators மற்றும் aspiring facilitators க்கான practical learning ecosystem. இது Karunai Prakash தோன்றியது, 2022 இலிருந்து work பண்ணுறது மற்றும் 1000 impactful facilitators ஆக வரணம்." },
  { id: "fsp-philosophy", topicEn: ["philosophy", "learn lead impact"], topicTa: ["கலவம் பற்றி", "கற்கு முன் வரு"], topicTg: ["philosophy", "learn lead impact"], replyTa: "FSP இன் philosophy என்பது Learn. Lead. Impact. இது மக்கள் கற்கலாம், practise பண்ணலாம், create பண்ணலாம், connect பண்ணலாம் மற்றும் facilitators ஆகலாம்.", replyTg: "FSP philosophy என்பது Learn. Lead. Impact. இது people ஐ help பண்ணும் learn, practise, create, connect மற்றும் grow பண்ணலாம்." },
  { id: "core-program", topicEn: ["core program", "modules", "foundation of facilitation", "build your training", "build your brand"], topicTa: ["core program", "modules", "foundation of facilitation", "build your training", "build your brand"], topicTg: ["core program", "modules", "foundation", "build your training", "build your brand"], replyTa: "FSP Core Program இல் மூன்று modules இருக்கும். Module 1: Foundation of Facilitation — facilitator mindset, experiential learning, activity facilitation, participant engagement, debriefing, communication மற்றும் practice cover பண்ணும். Module 2: Build Your Training — training design, learning objectives, activity design, session flow, module creation, workbook creation மற்றும் practical facilitation cover பண்ணும். Module 3: Build Your Brand & Opportunities — personal branding, trainer positioning, marketing, proposals, client communication, content creation மற்றும் trainer business build பண்ணும்.", replyTg: "FSP Core Program இல் 3 modules இருக்கும். Module 1: Foundation of Facilitation — facilitator mindset, experiential learning, activity facilitation, participant engagement, debriefing, communication practice cover பண்ணும். Module 2: Build Your Training — training design, learning objectives, activity design, session flow, module creation, workbook creation practice cover பண்ணும். Module 3: Build Your Brand & Opportunities — personal branding, trainer positioning, marketing, proposals, client communication, content creation trainer business build பண்ணும்." },
  { id: "thirty-days", topicEn: ["30 days challenge", "30 days"], topicTa: ["30 நாள் challenge", "30 நாள்"], topicTg: ["30 days challenge enna", "30 days pannalam"], replyTa: "FSP 30 நாள் Challenge என்பது practical action-based experience. 30 நாள், 30 practical tasks — ஒவ்வொரு நாளும் சுமார் 30 minutes, ஒவ்வொரு நாளும் ஒரு task, ஒவ்வொரு நாளும் ஒரு step forward.", replyTg: "FSP 30 Days Challenge என்பது practical action-based experience. 30 days, 30 practical tasks — approximately 30 minutes per day, one task per day, one step forward per day." },
  { id: "community", topicEn: ["community", "fsp community", "1000 members"], topicTa: ["community", "fsp community", "1000 members"], topicTg: ["community la enna benefit", "fsp community la"], replyTa: "FSP Community trainers, facilitators, aspiring trainers மற்றும் HR/L&D professionals ஐ ஒன்றாக bringing. FSP website இன் current description community 1000+ members உடன்.", replyTg: "FSP Community trainers, facilitators, aspiring trainers மற்றும் HR/L&D professionals ஐ bring பண்ணும். FSP website 1000+ members உடன் describe பண்ணும்." },
  { id: "masterclass", topicEn: ["wednesday masterclass", "masterclass"], topicTa: ["wednesday masterclass", "masterclass"], topicTg: ["wednesday masterclass", "masterclass"], replyTa: "Wednesday Masterclass practical topics ஐ cover பண்ணும் — facilitation skills, difficult participants, training design, workbook creation, personal branding, marketing, content creation, business development மற்றும் experiential learning.", replyTg: "Wednesday Masterclass practical topics cover பண்ணும்: facilitation skills, difficult participants, training design, workbook creation, personal branding, marketing, content creation, business development experiential learning." },
  { id: "mastermind", topicEn: ["mastermind", "fsp mastermind"], topicTa: ["mastermind", "fsp mastermind"], topicTg: ["mastermind", "fsp mastermind"], replyTa: "FSP Mastermind experienced professionals மற்றும் facilitators ஐ meaningful conversations க்கு bring பண்ணும். Topics include leadership, AI & facilitation, learning & development, personal branding, trainer business மற்றும் future of facilitation.", replyTg: "FSP Mastermind experienced professionals facilitators bring பண்ணும் meaningful conversations. Topics: leadership, AI & facilitation, learning & development, personal branding, trainer business future of facilitation." },
  { id: "catalyst", topicEn: ["catalyst connect"], topicTa: ["catalyst connect", "catalyst"], topicTg: ["catalyst connect", "catalyst"], replyTa: "FSP Catalyst Connect participants ஐ help பண்ணும் fellow facilitators ஐ meet, ideas exchange, relationships build, experiences share மற்றும் collaboration explore பண்ணலாம்.", replyTg: "FSP Catalyst Connect participants help பண்ணும் fellow facilitators meet, ideas exchange, relationships build, experiences share collaboration explore பண்ணலாம்." },
  { id: "ttx", topicEn: ["ttx", "fsp ttx"], topicTa: ["ttx", "fsp ttx"], topicTg: ["ttx", "fsp ttx"], replyTa: "FSP TTX two-day transformational residential experience — learning, challenge, connection, reflection மற்றும் growth ஐ focus பண்ணும்.", replyTg: "FSP TTX two-day transformational residential experience focused on learning, challenge, connection, reflection growth." },
  { id: "who-can-join", topicEn: ["who can join", "eligible", "can i join", "beginner", "new trainer"], topicTa: ["யாருக்கும் வரலாம்", "eligible", "என் join பண்ணலாமா", "புதிய trainer"], topicTg: ["who can join fsp", "trainer ah irundha join pannalama", "beginner ah join pannalam"], replyTa: "FSP aspiring trainers, new trainers, experienced trainers, facilitators மற்றும் HR/L&D professionals க்கு open. Foundation ஐத் தொடங்க உங்களுக்கு previous training experience தேவையில்லை.", replyTg: "FSP aspiring trainers, new trainers, experienced trainers, facilitators HR/L&D professionals க்கு open. Foundation ஐத் தொடங்க previous training experience வேண்டாம்." },
  { id: "how-to-join", topicEn: ["how to join", "how do i join", "how can I register"], topicTa: ["எவ்வளவு join பண்ணலாம்", "fsp ku evlo", "எப்படி join பண்ணலாம்"], topicTg: ["fsp ku evlo", "how join pannalam", "register pannalam"], replyTa: "நீங்கள் FSP website இல் உங்கள் interest register பண்ணலாம், FSP team latest program details உடன் share பண்ணலாம்.", replyTg: "நீங்க FSP website இல interest register பண்ணலாம், FSP team latest program details உடன் share பண்ணலாம்." },
  { id: "pricing", topicEn: ["price", "cost", "fee", "how much", "pricing"], topicTa: ["விலை", "கட்டணம்", "எவ்ளவை"], topicTg: ["pricing enna", "cost solra", "fee ivala"], replyTa: "FSP programs இக்கு latest confirmed pricing என்றில்லை. FSP team current fee மற்றும் payment details உடன் share பண்ணலாம்.", replyTg: "FSP programs இக்கu latest confirmed pricing என்றில்லை. FSP team current fee payment details உடன் share பண்ணலாம்." },
  { id: "dates", topicEn: ["next batch", "when does fsp start", "dates", "timings"], topicTa: ["அடுத்த batch", "fsp எப்போது start பண்ணும்", "dates", "timings"], topicTg: ["next batch enna", "when does fsp start", "dates", "timings"], replyTa: "FSP latest confirmed batch schedule என்றில்லை. FSP team current dates மற்றும் timings உடன் share பண்ணலாம்.", replyTg: "FSP latest confirmed batch schedule என்றில்லை. FSP team current dates timings உடன் share பண்ணலாம்." },
  { id: "online-offline", topicEn: ["online", "offline", "where is the program", "format"], topicTa: ["ஆன்லாயின்", "ஆஃப்லைன்", "எங்க இருக்கும்"], topicTg: ["Zoom la nadakuma", "Chennai la enga", "online la nadakkum", "offline la nadakkum"], replyTa: "Format specific FSP program அல்லது experience இப் படி depend பண்ணலாம். FSP team current format உடன் confirm பண்ணலாம்.", replyTg: "Format depend பண்ணலாம் specific FSP program experience இப் படி. FSP team current format confirm பண்ணலாம்." },
  { id: "founder", topicEn: ["founder", "karunai prakash"], topicTa: ["founder", "கருணை பிரகாச்"], topicTg: ["founder", "karunai prakash"], replyTa: "FSP ஐ Karunai Prakash தோன்றியது — Team Building Strategist, Facilitator மற்றும் Key Purpose Training Solutions இன் Founder.", replyTg: "FSP founded பட்டது Karunai Prakash தோன்றியது — Team Building Strategist, Facilitator Founder of Key Purpose Training Solutions." },
  { id: "vision", topicEn: ["vision", "fsp vision"], topicTa: ["vision", "fsp vision"], topicTg: ["vision", "fsp vision"], replyTa: "FSP இன் stated vision 1000 impactful facilitators ஐ உருவாக்க அதிகாரம்.", replyTg: "FSP stated vision 1000 impactful facilitators ஆக create பண்ணலாம்." },
];

/**
 * Detect the language of a message: English, Tamil, or Tanglish.
 */
export function detectLanguage(message: string): Language {
  if (/[\u0B80-\u0BFF]/.test(message)) return "ta";
  const tanglishIndicators = [
    /\benna\b/, /\bpannalama\b/, /\bkudupingala\b/, /\bevlo\b/,
    /\bnadakkum\b/, /\binga\b/, /\bina\b/, /\biru\b/, /\bpaadam\b/,
    /\booda\b/, /\bsari\b/, /-la\b/, /-ku\b/, /-ah\b/, /-aa\b/,
    /fsp\s+na\s+enna/i, /fsp\s+la\s+enna\s+pannuvanga/i, /fsp\s+ku\s+evlo/i,
    /trainer\s+ah\s+irundha\s+join\s+pannalama/i, /certificate\s+kudupingala/i,
    /community\s+la\s+enna\s+benefit/i, /zoom\s+la\s+nadakuma/i, /chennai\s+la\s+enga/i,
  ];
  for (const pattern of tanglishIndicators) {
    if (pattern.test(message)) return "tg";
  }
  return "en";
}

function getTopics(entryId: string, lang: Language): string[] {
  const entry = topicMap.find((t) => t.id === entryId);
  if (!entry) return [];
  switch (lang) {
    case "ta": return entry.topicTa;
    case "tg": return entry.topicTg;
    default: return entry.topicEn;
  }
}

function matchTopics(message: string, lang: Language): string[] {
  const lower = message.toLowerCase().trim();
  const matchedIds: string[] = [];
  for (const entry of topicMap) {
    const topics = getTopics(entry.id, lang);
    for (const topic of topics) {
      const tLower = topic.toLowerCase().trim();
      if (lower.includes(tLower) || tLower.includes(lower)) {
        matchedIds.push(entry.id);
        break;
      }
    }
  }
  return matchedIds;
}

function getReply(entryId: string, lang: Language): string | null {
  const entry = topicMap.find((t) => t.id === entryId);
  if (!entry) return null;
  switch (lang) {
    case "ta": return entry.replyTa;
    case "tg": return entry.replyTg;
    default: return null;
  }
}

function getFallback(lang: Language): string {
  switch (lang) {
    case "ta": return "இது பற்றிய confirmed details என்றில்லை. FSP team இந்த information உடன் பகுப்பாய்வு பண்ணலாம்.";
    case "tg": return "இது பற்றிய confirmed details என்றில்லை. FSP team இந்த info உடன் பகுப்பாய்வு பண்ணலாம்.";
    default: return getFallbackResponse();
  }
}

/**
 * Check if a message is a goodbye.
 */
export function isGoodbye(message: string): boolean {
  const lower = message.toLowerCase().trim();
  const words = ["bye", "goodbye", "see you", "quit", "exit", "later", "நற்பாவம்", "பார்க்கலாம்", "bye bye"];
  return words.some((w) => lower.includes(w));
}

function getGreeting(lang: Language): string {
  switch (lang) {
    case "ta": return "வணக்கம்! 👋 FSP இல் வருகிறீர்கள். என்ன உதவலாம்?";
    case "tg": return "Vanakkam! 👋 FSP இல் வருகிறீர்கள். என்ன உதவலாம்?";
    default: return "Hi there! 👋 Welcome to FSP. I'm Jarvis. Ask me about FSP programs, the Core Program, community, or how to join!";
  }
}

function getFarewell(lang: Language): string {
  switch (lang) {
    case "ta": return "நற்பாவம்! 😊 FSP க்கு எப்போதாவது வருங்க. என்ன உதவலாம்?";
    case "tg": return "Baarer! 😊 FSP க்கு எப்போதாவது வருங்க. என்ன உதவலாம்?";
    default: return "Goodbye! 😊 Feel free to come back anytime. I'm here to help with FSP!";
  }
}

/**
 * Process a user message and return a chatbot response in the detected language.
 */
export function processMessage(message: string): ChatResponse {
  const lang = detectLanguage(message);
  const lower = message.toLowerCase().trim();

  // Greetings
  const enGreetings = ["hi", "hello", "hey", "hii", "namaste", "good morning", "good afternoon", "good evening"];
  const taGreetings = ["வணக்கம்", "நன்றி", "ஹாலோ"];
  if ([...enGreetings, ...taGreetings].some((g) => lower.includes(g))) {
    return { reply: getGreeting(lang) };
  }

  // Help
  const helpTriggers = ["help", "what can you do", "what do you know", "assist me", "உதவலாமா", "என்ன பண்ணலாம்"];
  if (helpTriggers.some((t) => lower.includes(t))) {
    if (lang === "ta") return { reply: "என்ன உதவலாம்:\n\n• FSP பற்றி\n• Core Program\n• 30 Days Challenge\n• FSP TTX / FSP GTX\n• Community\n• Pricing மற்றும் Dates\n• Join பண்ணலாம் என்ன\n• Facilitation tips" };
    if (lang === "tg") return { reply: "என்ன help பண்ணலாம்:\n\n• FSP பற்றி\n• Core Program\n• 30 Days Challenge\n• FSP TTX / FSP GTX\n• Community\n• Pricing மற்றும் Dates\n• Join பண்ணலாம் என்ன\n• Facilitation tips" };
    return { reply: "I can help with:\n\n• What FSP is and how it works\n• Core Program details\n• 30 Days Challenge\n• FSP TTX and FSP GTX\n• Community and experiences\n• Pricing and dates\n• How to join\n• Facilitation tips\n\nJust ask me anything about FSP!" };
  }

  // Match topics
  const matchedIds = matchTopics(message, lang);
  if (matchedIds.length > 0) {
    const bestEntry = topicMap.find((t) => matchedIds.includes(t.id));
    if (!bestEntry) return { reply: getFallback(lang) };
    const content = getReply(bestEntry.id, lang);
    if (!content) return { reply: getFallback(lang) };

    const suggestionTopics = ["who-can-join", "how-to-join", "pricing", "dates"];
    if (matchedIds.some((id) => suggestionTopics.includes(id))) {
      const extra: string[] = [];
      if (matchedIds.includes("who-can-join")) extra.push(...["Am I eligible?", "Do I need experience?"]);
      if (matchedIds.includes("how-to-join")) extra.push(...["How do I register?", "What's the process?"]);
      if (matchedIds.includes("pricing")) extra.push(...["What does it cost?", "Payment options?"]);
      if (matchedIds.includes("dates")) extra.push(...["When's the next batch?", "Upcoming dates?"]);
      const unique = [...new Set(extra)];
      return { reply: content, suggestions: unique.slice(0, 2) };
    }
    return { reply: content };
  }

  // FSP-related fallback
  const fspKeywords = ["fsp", "facilitat", "trainer", "training", "ஃபாசிலிடேடர்", "டிரெனர்", "பயிற்சி", "கற்பனை"];
  if (fspKeywords.some((kw) => lower.includes(kw))) return { reply: getFallback(lang) };

  return { reply: getFallback(lang) };
}

export function getFarewellMessage(lang: Language): string {
  return getFarewell(lang);
}


