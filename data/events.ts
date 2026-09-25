/**
 * FSP event hub data.
 *
 * To publish an event, append an object to `events`. Only add confirmed
 * details — every optional field is hidden in the UI when omitted.
 *
 * Example:
 * {
 *   id: "masterclass-facilitation-skills",
 *   title: "Wednesday Masterclass: Facilitation skills",
 *   category: "wednesday-masterclass",
 *   startDate: "2026-10-07T19:00:00+05:30",
 *   format: "Online",
 *   location: undefined,
 *   summary: "…",
 *   registrationUrl: "https://…",
 * }
 */

export const eventCategories = [
  { id: "core-program", label: "FSP Core Program", description: "Build your foundation in facilitation, experiential learning, training design, branding and professional growth.", href: "/core-program" },
  { id: "30-days-challenge", label: "30 Days Challenge", description: "Turn learning into action through 30 practical tasks completed over 30 days.", href: "/programs/30-days-challenge" },
  { id: "wednesday-masterclass", label: "Wednesday Masterclass", description: "Learn Something. Apply Something. Every Time.", href: "/programs/fsp-wednesday-masterclass" },
  { id: "mastermind", label: "FSP Mastermind", description: "Conversations That Make You Think Differently.", href: "/programs/fsp-mastermind" },
  { id: "catalyst-connect", label: "FSP Catalyst Connect", description: "Connect. Learn. Collaborate.", href: "/events/catalyst-connect" },
  { id: "ttx", label: "FSP TTX", description: "2-Day Transformational Residential Experience", href: "/programs/fsp-ttx" },
  { id: "community-meetups", label: "Community Meetups", description: "Stay connected with trainers and facilitators who are on the same journey.", href: "/community" },
  { id: "special-experiences", label: "Special Learning Experiences", description: "Curated learning experiences inside the FSP ecosystem.", href: "/community" },
] as const;

export type EventCategoryId = (typeof eventCategories)[number]["id"];

export type FspEvent = {
  id: string;
  title: string;
  category: EventCategoryId;
  /** ISO 8601 date-time including offset. */
  startDate: string;
  endDate?: string;
  format?: string;
  location?: string;
  summary?: string;
  registrationUrl?: string;
};

export const events: FspEvent[] = [];

export const eventsCopy = {
  headline: "What's Happening Inside FSP?",
  empty: "Upcoming experiences will appear here.",
};

/** Upcoming events, soonest first. */
export function getUpcomingEvents(now = new Date()): FspEvent[] {
  return events
    .filter((e) => new Date(e.endDate ?? e.startDate) >= now)
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
}
