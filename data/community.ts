/** FSP Community and its experiences, from the approved content source. */

export const community = {
  headline: ["You don't have to", "grow alone."],
  description:
    "The FSP Community brings together trainers, facilitators, aspiring trainers and HR/L&D professionals.",
  benefits: [
    "Knowledge sharing",
    "Peer learning",
    "Masterclasses",
    "Mastermind sessions",
    "Challenges",
    "Resources",
    "Networking",
    "Collaboration",
    "Community experiences",
    "Professional opportunities",
  ],
  close: "Learn From Others. Share What You Know. Grow Together.",
};

export type CommunityExperience = {
  id: string;
  name: string;
  headline: string;
  summary?: string;
  listLabel?: string;
  list: { title: string; description?: string }[];
  close?: string;
};

/**
 * Source of truth for the four community experiences. Each one now has its own
 * program page (Wednesday Masterclass, Mastermind, Catalyst Connect, TTX), so
 * the Community page links to them instead of repeating their content.
 */
export function getExperience(id: string): CommunityExperience | undefined {
  return experiences.find((e) => e.id === id);
}

export const experiences: CommunityExperience[] = [
  {
    id: "wednesday-masterclass",
    name: "Wednesday Masterclass",
    headline: "Learn Something. Apply Something. Every Time.",
    listLabel: "Topics include",
    list: [
      "Facilitation skills",
      "Difficult participants",
      "Training design",
      "Workbook creation",
      "Personal branding",
      "Marketing",
      "Content creation",
      "Business development",
      "Experiential learning",
    ].map((title) => ({ title })),
  },
  {
    id: "mastermind",
    name: "FSP Mastermind",
    headline: "Conversations That Make You Think Differently.",
    summary:
      "The FSP Mastermind brings experienced professionals and facilitators together for meaningful conversations around topics that matter.",
    listLabel: "Topics",
    list: [
      "Leadership",
      "AI & Facilitation",
      "Learning & Development",
      "Personal Branding",
      "Trainer Business",
      "Future of Facilitation",
    ].map((title) => ({ title })),
    close: "It's about thinking, questioning, sharing and learning together.",
  },
  {
    id: "catalyst-connect",
    name: "FSP Catalyst Connect",
    headline: "Connect. Learn. Collaborate.",
    summary: "A community experience designed to bring FSP members together beyond the virtual environment.",
    list: [
      "Meet fellow facilitators",
      "Exchange ideas",
      "Build relationships",
      "Share experiences",
      "Explore collaborations",
    ].map((title) => ({ title })),
  },
  {
    id: "ttx",
    name: "FSP TTX",
    headline: "2-Day Transformational Residential Experience",
    summary: "Step away from your routine. Step into an immersive learning experience.",
    list: [
      { title: "Learning", description: "Explore new perspectives." },
      { title: "Challenge", description: "Step outside your comfort zone." },
      { title: "Connection", description: "Build deeper relationships." },
      { title: "Reflection", description: "Pause and understand yourself better." },
      { title: "Growth", description: "Take your learning to the next level." },
    ],
    close: "Two Days. One Experience. New Perspectives.",
  },
];
