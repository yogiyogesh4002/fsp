/**
 * FSP Mastermind session flyers.
 *
 * Every field below is transcribed from the flyers supplied by the FSP team
 * (`design-source/fsp-mm-flyers/`). Nothing here is inferred or written for
 * effect — titles, dates, timings, platform, speakers and their descriptions
 * appear exactly as printed on the artwork.
 *
 * Two notes on the source material, left as-is rather than "corrected":
 *  - Only flyers 3 and 4 carry a printed episode number, so `episode` is set
 *    only for those two. The others show their month badge alone.
 *  - Flyers 2 and 3 both print Monday 3rd Aug 2026. That is what the artwork
 *    says; it is for the FSP team to confirm or amend.
 *
 * To publish another session: add an entry here and drop the matching flyer in
 * `public/images/mastermind/`.
 */

export type MastermindSpeaker = {
  name: string;
  /** Role line as printed under the portrait. */
  role: string;
};

export type MastermindSession = {
  id: string;
  /** Month badge printed in the flyer header, e.g. "July Month Special". */
  badge: string;
  /** Episode number, only where the flyer prints one. */
  episode?: string;
  title: string;
  subtitle: string;
  /** Machine-readable date for <time datetime>. */
  date: string;
  /** Date line as printed on the flyer. */
  dateLabel: string;
  time: string;
  platform: string;
  /** "In the hot seat", in flyer order. */
  hotSeat: MastermindSpeaker[];
  host: MastermindSpeaker;
  /** Flyer image under /public. */
  flyer: string;
};

const host: MastermindSpeaker = {
  name: "Sunitha Ojha",
  role: "Women Empowerment Facilitator & Coach",
};

const karunai: MastermindSpeaker = {
  name: "Karunai Prakash",
  role: "Team Building Strategist, Key Purpose",
};

export const mastermindSessions: MastermindSession[] = [
  {
    id: "beyond-the-activity",
    badge: "July Month Special",
    title: "Beyond the Activity",
    subtitle: "The hidden art of creating learning that lasts",
    date: "2026-07-06",
    dateLabel: "Monday, 6th July 2026",
    time: "7:00 PM to 8:00 PM",
    platform: "Zoom Meeting",
    hotSeat: [{ name: "Arul Prakash", role: "Founder & Lead Facilitator (TDS Global)" }, karunai],
    host,
    flyer: "/images/mastermind/fsp-mastermind-flyer-01.jpg",
  },
  {
    id: "understand-participants",
    badge: "August Month Special",
    title: "Don't fix participants. Understand them.",
    subtitle: "The emotional intelligence every facilitator needs",
    date: "2026-08-03",
    dateLabel: "Monday, 3rd Aug 2026",
    time: "7:00 PM to 8:00 PM",
    platform: "Zoom Meeting",
    hotSeat: [
      { name: "Aram Rajhakumar", role: "Parenting Coach & Emotional Intelligence Educator" },
      karunai,
    ],
    host,
    flyer: "/images/mastermind/fsp-mastermind-flyer-02.jpg",
  },
  {
    id: "create-the-right-environment",
    badge: "August Month Special",
    episode: "Episode 3",
    title: "Don't motivate people. Create the right environment.",
    subtitle: "The leadership lessons every facilitator can learn from today's workplace",
    date: "2026-08-03",
    dateLabel: "Monday, 3rd Aug 2026",
    time: "7:00 PM to 8:00 PM",
    platform: "Zoom Meeting",
    hotSeat: [{ name: "Bharath Ravichandran", role: "Igniting Leadership Facilitator" }, karunai],
    host,
    flyer: "/images/mastermind/fsp-mastermind-flyer-03.jpg",
  },
  {
    id: "leadership-in-the-age-of-ai",
    badge: "September Month Special",
    episode: "Episode 4",
    title: "Leadership in the Age of AI",
    subtitle: "What makes a human leader irreplaceable?",
    date: "2026-09-07",
    dateLabel: "Monday, 7th Sep 2026",
    time: "7:00 PM to 8:00 PM",
    platform: "Zoom Meeting",
    hotSeat: [{ name: "Santha Meena", role: "Communication Growth Facilitator" }, karunai],
    host,
    flyer: "/images/mastermind/fsp-mastermind-flyer-04.jpg",
  },
];

export const mastermindSessionsCopy = {
  eyebrow: "Session flyers",
  headline: ["The sessions", "so far."],
  /** The format line printed on every flyer. */
  format: "A live expert discussion",
  lead: "Learn from real challenges, real conversations, and real facilitation insights.",
};

/** Alt text for a flyer: factual, no claims beyond what the artwork prints. */
export function flyerAlt(session: MastermindSession): string {
  return `FSP Mastermind flyer — ${session.title} — ${session.dateLabel}`;
}
