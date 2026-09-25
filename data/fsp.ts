/**
 * Core FSP messaging. Copy is taken from the approved content source
 * (fsp_content_source.md). Do not add claims that are not in that document.
 */

export const hero = {
  headline: ["Become a", "facilitator."],
  support: ["Build your facilitation skills.", "Build your brand.", "Create more impact."],
  programName: "Facilitator Support Program",
  tagline: ["Learn.", "Lead.", "Impact."],
  intro:
    "Facilitator Support Program (FSP) is a practical learning and growth ecosystem for trainers, facilitators and aspiring facilitators who want to improve their facilitation skills, build their personal brand and create more professional opportunities.",
  cta: { primary: "Join FSP", secondary: "Explore the program" },
};

export const positioning = {
  statement: "FSP is not just a course for trainers. It is a growth ecosystem for facilitators.",
  sourceMotto: "Learn. Practice. Grow.",
};

export const problem = {
  eyebrow: "Why FSP?",
  headline: ["Being a good trainer", "is not enough."],
  lead: [
    "You may know your subject.",
    "You may have great activities.",
    "You may have years of experience.",
    "But becoming a great facilitator requires more.",
  ],
  points: [
    "Engage different types of participants",
    "Design meaningful learning experiences",
    "Conduct powerful activities",
    "Debrief effectively",
    "Handle difficult participants",
    "Create your own training modules",
    "Build your personal brand",
    "Market yourself professionally",
    "Create effective proposals",
    "Generate opportunities",
    "Continuously improve yourself",
  ],
  close: "FSP helps you develop all of these together.",
};

export const transformationStages = ["Trainer", "Facilitator", "Facilitator with impact"];

export const whatIsFsp = {
  eyebrow: "What is FSP?",
  headline: ["More than", "a course."],
  body: "The Facilitator Support Program is a structured learning and growth ecosystem created for people who want to become better facilitators.",
};

export type JourneyStage = { key: string; title: string; description: string };

export const journey: JourneyStage[] = [
  { key: "learn", title: "Learn", description: "Build strong foundations in facilitation and experiential learning." },
  { key: "practice", title: "Practice", description: "Apply your learning through activities, assignments and real-world practice." },
  { key: "create", title: "Create", description: "Develop your own modules, activities, workbooks and training resources." },
  { key: "build", title: "Build", description: "Build your personal brand and professional positioning." },
  { key: "connect", title: "Connect", description: "Learn and grow with a community of trainers and facilitators." },
  { key: "grow", title: "Grow", description: "Create opportunities and continuously develop yourself." },
];

export type Audience = { title: string; description: string };

export const audiences: Audience[] = [
  { title: "Aspiring Trainers", description: "You want to enter the training profession and need the right foundation." },
  { title: "New Trainers", description: "You have started training and want to become more confident and effective." },
  { title: "Experienced Trainers", description: "You already conduct programs but want to improve your facilitation, branding and business." },
  { title: "Corporate Trainers", description: "You want to strengthen your facilitation and learning design capabilities." },
  { title: "HR & L&D Professionals", description: "You want to improve your ability to facilitate learning experiences." },
  { title: "Facilitators", description: "You want a community and ecosystem where you can continuously learn and grow." },
];

export type StatItem = {
  /** Numeric part used for the count-up; null for non-numeric values. */
  value: number | null;
  prefix?: string;
  suffix?: string;
  display: string;
  label: string;
};

export const numbers: StatItem[] = [
  { value: 1000, suffix: "+", display: "1000+", label: "Community Members" },
  { value: 50, suffix: "+", display: "50+", label: "Learning Resources & Game Videos" },
  { value: 10, suffix: "+", display: "10+", label: "Years of Training & Facilitation Experience" },
  { value: 500, suffix: "+", display: "500+", label: "Team Building & OBT Programs" },
  { value: 1, suffix: " Lakh+", display: "1 Lakh+", label: "People Trained" },
  { value: null, display: "India + International", label: "Training Experiences" },
];

export const founder = {
  name: "Karunai Prakash",
  role: "Team Building Strategist | Facilitator | Founder, Key Purpose Training Solutions",
  roles: ["Team Building Strategist", "Facilitator", "Founder, Key Purpose Training Solutions"],
  bio: [
    "Karunai Prakash is a professional trainer, facilitator and team-building strategist with extensive experience in experiential learning, team building and behavioural training.",
    "Over the years, he has conducted hundreds of team-building and outbound training programs across India and international locations and has trained more than 1 lakh participants.",
    "His experience across corporate training, experiential learning and facilitation led to the creation of the Facilitator Support Program.",
  ],
  vision: "To create 1000 impactful facilitators.",
  visionSupport: [
    "Facilitators who don't just conduct activities.",
    "Facilitators who create meaningful learning experiences.",
  ],
  credentials: [
    "Certified Professional Trainer in Design and Facilitation of Experiential Learning — IIPE, Canada",
    "NLP Master Practitioner",
    "Certified OBT Trainer",
    "10+ years of training and facilitation experience",
    "500+ team-building / OBT programs",
    "1 lakh+ people trained",
    "Experience with corporate, institutional and community learning programs",
  ],
  /** Approved photograph. Drives the portrait slot on the homepage and About FSP. */
  photo: "/images/karunai-prakash-portrait.jpg" as string | null,
};

export type TransformationExample = { before: string; after: string };

export const transformationExamples = {
  eyebrow: "Transformation Examples",
  headline: ["From learning", "to action."],
  items: [
    {
      before: "I wanted to become a trainer but didn't know where to start.",
      after: "I gained clarity, confidence and started building my training journey.",
    },
    {
      before: "I was conducting sessions but struggled to create structured learning experiences.",
      after: "I learned how to design and facilitate better learning experiences.",
    },
    {
      before: "I knew training but didn't know how to position myself.",
      after: "I started working on my personal brand and professional positioning.",
    },
  ] satisfies TransformationExample[],
};

export const finalCta = {
  headline: ["Ready to become", "a better facilitator?"],
  lines: [
    "You don't need to know everything before you start.",
    "You need the right environment to Learn. Practice. Create. Connect. Grow.",
  ],
  belief:
    "Join a community that believes facilitation is not just about conducting a session. It's about creating an experience that creates learning.",
  close: "Start Your FSP Journey Today.",
  cta: { primary: "Join FSP", secondary: "Talk to us" },
};
