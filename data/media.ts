/**
 * Image and team slots.
 *
 * Every entry here is a SLOT, not content. Nothing in this file describes a
 * real photograph, person or event — the FSP team supplies those later.
 *
 * To publish an image: set `src` to a file in `public/images/` and replace the
 * placeholder `label` with a real, factual `alt` description. A slot with no
 * `src` renders as a clearly marked placeholder and is never presented as a
 * real photo.
 */

import { flyerAlt, mastermindSessions } from "./mastermind";

export type ImageSlot = {
  id: string;
  /** Path under /public once an approved image is supplied, e.g. "/images/fsp-01.jpg". */
  src?: string;
  /** Factual alt text. Required once `src` is set. */
  alt?: string;
  /** Placeholder caption shown while the slot is empty. */
  label: string;
  /** Aspect ratio for the reserved space. */
  ratio: "portrait" | "landscape" | "square" | "wide" | "flyer";
  /** Optional caption displayed under a filled image. */
  caption?: string;
};

/** Founder portrait slots for the About FSP page. */
export const founderImages: ImageSlot[] = [
  // src comes from `founder.photo`, which stays the single source of truth.
  { id: "founder-portrait", label: "Founder portrait", ratio: "portrait" },
  {
    id: "founder-secondary",
    label: "Secondary image",
    ratio: "square",
    src: "/images/karunai-prakash-stage.jpg",
    alt: "Karunai Prakash",
  },
];

/**
 * FSP Mastermind session flyers, supplied by the FSP team.
 *
 * Built from `mastermindSessions` so the flyer file and its alt text can never
 * disagree with the session details printed on it.
 */
export const mastermindFlyers: ImageSlot[] = mastermindSessions.map((session) => ({
  id: `mastermind-flyer-${session.id}`,
  src: session.flyer,
  alt: flyerAlt(session),
  label: `FSP Mastermind — ${session.title}`,
  ratio: "flyer",
  caption: `${session.title} · ${session.dateLabel}`,
}));

export type GalleryCategory = {
  id: string;
  label: string;
  /** Route of the program this category belongs to, when it has one. */
  href?: string;
  images: ImageSlot[];
};

/** Reserves a set of empty slots in the standard editorial shape. */
function slots(prefix: string, label: string): ImageSlot[] {
  return [
    { id: `${prefix}-01`, label: `${label} — feature image`, ratio: "wide" },
    { id: `${prefix}-02`, label: `${label} image`, ratio: "portrait" },
    { id: `${prefix}-03`, label: `${label} image`, ratio: "landscape" },
    { id: `${prefix}-04`, label: `${label} image`, ratio: "square" },
  ];
}

/**
 * The nine gallery categories.
 *
 * Every category exists whether or not images have been supplied. Empty
 * categories render marked placeholders — never stock photography, and never a
 * description of a photo that does not exist. Add an approved image by setting
 * `src` and a factual `alt` on a slot, or by appending new slots.
 */
export const galleryCategories: GalleryCategory[] = [
  { id: "fsp-general", label: "FSP General", images: slots("general", "FSP") },
  {
    id: "30-days-challenge",
    label: "30 Days Challenge",
    href: "/programs/30-days-challenge",
    images: slots("challenge", "30 Days Challenge"),
  },
  { id: "fsp-ttx", label: "FSP TTX", href: "/programs/fsp-ttx", images: slots("ttx", "FSP TTX") },
  { id: "fsp-gtx", label: "FSP GTX", href: "/programs/fsp-gtx", images: slots("gtx", "FSP GTX") },
  {
    id: "fsp-mastermind",
    label: "FSP Mastermind",
    href: "/programs/fsp-mastermind",
    images: [...mastermindFlyers, ...slots("mastermind", "FSP Mastermind")],
  },
  {
    id: "catalyst-connect",
    label: "FSP Catalyst Connect",
    href: "/events/catalyst-connect",
    images: slots("catalyst", "Catalyst Connect"),
  },
  {
    id: "fsp-wednesday-masterclass",
    label: "FSP Wednesday Masterclass",
    href: "/programs/fsp-wednesday-masterclass",
    images: slots("masterclass", "Wednesday Masterclass"),
  },
  {
    id: "fsp-habit-circle",
    label: "FSP Habit Circle",
    href: "/programs/fsp-habit-circle",
    images: slots("habit-circle", "Habit Circle"),
  },
  {
    id: "fsp-fun-day",
    label: "FSP Fun Day",
    href: "/programs/fsp-fun-day",
    images: slots("fun-day", "Fun Day"),
  },
];

export function getGalleryCategory(id: string): GalleryCategory | undefined {
  return galleryCategories.find((c) => c.id === id);
}

/** Image slots for a page, by gallery category id. Empty array if unknown. */
export function imagesFor(categoryId: string): ImageSlot[] {
  return getGalleryCategory(categoryId)?.images ?? [];
}

/** About FSP gallery uses the general set. */
export const galleryImages: ImageSlot[] = getGalleryCategory("fsp-general")!.images;

export type TeamMember = {
  id: string;
  /** Real name — leave undefined until supplied by the FSP team. */
  name?: string;
  /** Real role — leave undefined until supplied by the FSP team. */
  role?: string;
  bio?: string;
  photo?: string;
};

/**
 * Our Team.
 *
 * No team members have been supplied, so this list is intentionally empty and
 * the section renders its "awaiting details" state. Append verified members
 * here to publish them — never placeholder names.
 */
export const team: TeamMember[] = [];

export const teamCopy = {
  eyebrow: "Our Team",
  headline: ["The people", "behind FSP."],
  /** Shown while `team` is empty. States the position honestly, claims nothing. */
  pending: "Team details will be published here once confirmed by the FSP team.",
};

export const galleryCopy = {
  eyebrow: "FSP in pictures",
  headline: ["Inside the", "FSP ecosystem."],
  pending: "Photographs from FSP programs, sessions and community experiences will appear here.",
};
