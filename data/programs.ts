/** Programs and the FSP ecosystem, from the approved content source. */

export type EcosystemItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Route this node leads to. Omitted for nodes that are a concept, not a page. */
  href?: string;
};

export const ecosystem = {
  headline: ["One ecosystem.", "Multiple growth experiences."],
  items: [
    {
      id: "core",
      number: "01",
      title: "FSP Core Program",
      description: "Build your foundation in facilitation, experiential learning, training design, branding and professional growth.",
      href: "/core-program",
    },
    {
      id: "challenge",
      number: "02",
      title: "30 Days Challenge",
      description: "Turn learning into action through 30 practical tasks completed over 30 days.",
      href: "/programs/30-days-challenge",
    },
    {
      // Grouping, not a program: node 03 held the Good to Great Certification
      // in the original source. It now points at the eight official programs
      // rather than singling one out, which also keeps TTX to node 06.
      id: "programs",
      number: "03",
      title: "FSP Programs & Experiences",
      description: "The eight FSP programs — each one a different way to build your facilitation practice.",
      href: "/programs",
    },
    {
      id: "community",
      number: "04",
      title: "FSP Community",
      description: "Stay connected with trainers and facilitators who are on the same journey.",
      href: "/community",
    },
    {
      id: "masterclasses",
      number: "05",
      title: "Masterclasses & Mastermind",
      description: "Keep learning through regular knowledge-sharing sessions and conversations with experienced professionals.",
      href: "/programs/fsp-wednesday-masterclass",
    },
    {
      id: "experiences",
      number: "06",
      title: "Experiences & Connections",
      description: "Participate in Catalyst Connect, FSP TTX, community meetups and other curated learning experiences.",
      href: "/events/catalyst-connect",
    },
    {
      // The closing idea of the Core Positioning progression. It is a concept,
      // not a destination, so it carries no link.
      id: "continuous-growth",
      number: "07",
      title: "Continuous Growth",
      description: "FSP is not just a course. It is a growth ecosystem — keep learning, create opportunities and continuously develop yourself.",
    },
  ] satisfies EcosystemItem[],
  /** "Core ecosystem" progression from the Core Positioning section. */
  flow: [
    "FSP Core Program",
    "30 Days Challenge",
    "FSP Programs & Experiences",
    "FSP Community",
    "Masterclasses + Masterminds",
    "Catalyst Connect + TTX + Experiences",
    "Continuous Growth",
  ],
};

export type ProgramStatus = "practical" | "residential" | "upcoming" | "recurring" | "pending";

export type FspProgram = {
  id: string;
  number: string;
  name: string;
  /** Short form used by the FSP team, e.g. "FSP 30DC". */
  abbr: string;
  href: string;
  status: ProgramStatus;
  statusLabel: string;
  /** Short line for cards and previews. Verified copy, or an honest holding line. */
  summary: string;
  /** True when approved detail exists for the page beyond the summary. */
  hasContent: boolean;
  /** Shown as a highlighted card on the homepage. */
  featured?: boolean;
};

/**
 * The eight official FSP programs.
 *
 * `summary` is verified copy wherever approved material exists. Habit Circle
 * and Fun Day have no approved material anywhere in the project, so they carry
 * a holding line and no claims — do not fill these in without source material.
 *
 * Catalyst Connect keeps its page under /events because it is run as an event;
 * it is listed here so the programs hub covers the full ecosystem.
 */
export const programs: FspProgram[] = [
  {
    id: "30-days-challenge",
    number: "01",
    name: "FSP 30 Days Challenge",
    abbr: "FSP 30DC",
    href: "/programs/30-days-challenge",
    status: "practical",
    statusLabel: "Practical challenge",
    summary: "30 days. 30 practical tasks. One step forward every day.",
    hasContent: true,
    featured: true,
  },
  {
    id: "fsp-ttx",
    number: "02",
    name: "FSP TTX",
    abbr: "FSP TTX",
    href: "/programs/fsp-ttx",
    status: "residential",
    statusLabel: "Residential program",
    summary: "A transformational residential learning experience away from your routine.",
    hasContent: true,
    featured: true,
  },
  {
    id: "fsp-gtx",
    number: "03",
    name: "FSP GTX",
    abbr: "FSP GTX",
    href: "/programs/fsp-gtx",
    status: "upcoming",
    statusLabel: "Upcoming",
    summary: "An upcoming FSP experience. Details will be announced by the FSP team.",
    hasContent: false,
    featured: true,
  },
  {
    id: "fsp-mastermind",
    number: "04",
    name: "FSP Mastermind",
    abbr: "FSP MM",
    href: "/programs/fsp-mastermind",
    status: "recurring",
    statusLabel: "Recurring session",
    summary: "Conversations that make you think differently.",
    hasContent: true,
  },
  {
    id: "fsp-wednesday-masterclass",
    number: "05",
    name: "FSP Wednesday Masterclass",
    abbr: "FSP WM",
    href: "/programs/fsp-wednesday-masterclass",
    status: "recurring",
    statusLabel: "Recurring session",
    summary: "Learn something. Apply something. Every time.",
    hasContent: true,
  },
  {
    id: "catalyst-connect",
    number: "06",
    name: "FSP Catalyst Connect",
    abbr: "FSP CC",
    href: "/events/catalyst-connect",
    status: "recurring",
    statusLabel: "Community event",
    summary: "Connect. Learn. Collaborate.",
    hasContent: true,
  },
  {
    id: "fsp-habit-circle",
    number: "07",
    name: "FSP Habit Circle",
    abbr: "FSP HC",
    href: "/programs/fsp-habit-circle",
    status: "pending",
    statusLabel: "Details to follow",
    summary: "An FSP program. Details will be shared by the FSP team.",
    hasContent: false,
  },
  {
    id: "fsp-fun-day",
    number: "08",
    name: "FSP Fun Day",
    abbr: "FSP FD",
    href: "/programs/fsp-fun-day",
    status: "pending",
    statusLabel: "Details to follow",
    summary: "An FSP program. Details will be shared by the FSP team.",
    hasContent: false,
  },
];

/** The programs highlighted on the homepage. */
export const featuredPrograms = programs.filter((p) => p.featured);

export function getProgram(id: string): FspProgram | undefined {
  return programs.find((p) => p.id === id);
}

export type Module = { number: string; label: string; title: string; topics: string[] };

export const coreProgram = {
  headline: ["Build your foundation.", "Strengthen your facilitation."],
  description:
    "The FSP Core Program is a hands-on learning journey designed to help you develop the essential capabilities required to become a professional facilitator.",
  modules: [
    {
      number: "01",
      label: "Module 1",
      title: "Foundation of Facilitation",
      topics: [
        "Facilitator mindset",
        "Experiential learning",
        "Activity facilitation",
        "Participant engagement",
        "Debriefing",
        "Communication",
        "Facilitation practice",
      ],
    },
    {
      number: "02",
      label: "Module 2",
      title: "Build Your Training",
      topics: [
        "Training design",
        "Learning objectives",
        "Activity design",
        "Session flow",
        "Module creation",
        "Workbook creation",
        "Practical facilitation",
      ],
    },
    {
      number: "03",
      label: "Module 3",
      title: "Build Your Brand & Opportunities",
      topics: [
        "Personal branding",
        "Trainer positioning",
        "Marketing",
        "Proposal creation",
        "Client communication",
        "Content creation",
        "Building your trainer business",
      ],
    },
  ] satisfies Module[],
  close: ["The Core Program is where", "your journey begins."],
};

export const thirtyDays = {
  headline: ["30 days.", "30 tasks.", "One better facilitator."],
  statement: "Knowledge becomes valuable when you put it into action.",
  description:
    "The FSP 30 Days Challenge is designed to help facilitators develop the habit of taking consistent action.",
  daily: { label: "Every Day", items: ["30 Minutes", "1 Practical Task", "1 Step Forward"] },
  focusAreas: [
    "Facilitation",
    "Communication",
    "Creativity",
    "Personal branding",
    "Content creation",
    "Learning design",
    "Reflection",
    "Professional development",
  ],
  goal: [
    "The goal is not just to complete 30 tasks.",
    "The goal is to build the habit of learning, practising and improving every day.",
  ],
  close: "Small Actions. Consistent Practice. Meaningful Growth.",
  totalDays: 30,
};

export type Challenge = { title: string; description: string; href?: string };

export const challenges = {
  headline: "Learning Through Action",
  items: [
    {
      title: "21-Day Habit Challenge",
      description: "Build better professional and personal habits through consistent daily action.",
    },
    {
      title: "30 Days Challenge",
      description: "Complete 30 practical facilitator-focused tasks in 30 days.",
      href: "/programs/30-days-challenge",
    },
    {
      title: "Book Reading Challenge",
      description: "Read, reflect and discuss ideas that can improve your professional and personal growth.",
    },
  ] satisfies Challenge[],
  close: "Don't Just Learn. Apply.",
};
