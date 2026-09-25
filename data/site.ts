/**
 * Site-wide configuration: URL, navigation and brand constants.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment so canonical URLs,
 * the sitemap and Open Graph tags point at the production domain. On Vercel,
 * the project's production domain is used automatically when it is not set.
 * Blank values and values without a protocol are handled.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      // Ignore malformed values and try the next candidate.
    }
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "Facilitator Support Program",
  shortName: "FSP",
  tagline: "Learn. Lead. Impact.",
  founder: "Karunai Prakash",
  organisation: "Key Purpose Training Solutions",
  description:
    "Facilitator Support Program (FSP) is a practical learning and growth ecosystem for trainers, facilitators and aspiring facilitators who want to improve their facilitation skills, build their personal brand and create more professional opportunities.",
  /**
   * Contact channels. Leave null until approved details are supplied;
   * components render them only when present.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },
  /** Endpoint that receives enquiry form submissions (JSON POST). */
  formEndpoint: process.env.NEXT_PUBLIC_FSP_FORM_ENDPOINT?.trim() || null,
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavDropdown = {
  label: string;
  children: NavLink[];
  /** Render the panel in two columns — keeps a long list from running down the screen. */
  columns?: 2;
  /** Optional link to the hub page for the whole section. */
  footer?: NavLink;
};
export type NavItem = NavLink | NavDropdown;

export const primaryNav: NavItem[] = [
  { label: "About FSP", href: "/about-fsp" },
  {
    label: "Programs",
    // All eight official FSP programs, in two columns so the panel stays compact.
    columns: 2,
    footer: { label: "All programs", href: "/programs" },
    children: [
      { label: "30 Days Challenge", href: "/programs/30-days-challenge", description: "30 days. 30 tasks." },
      { label: "FSP TTX", href: "/programs/fsp-ttx", description: "Residential experience" },
      { label: "FSP GTX", href: "/programs/fsp-gtx", description: "Upcoming experience" },
      { label: "FSP Mastermind", href: "/programs/fsp-mastermind", description: "Think differently" },
      { label: "Wednesday Masterclass", href: "/programs/fsp-wednesday-masterclass", description: "Learn. Apply. Every time." },
      { label: "FSP Catalyst Connect", href: "/events/catalyst-connect", description: "Connect. Learn. Collaborate." },
      { label: "FSP Habit Circle", href: "/programs/fsp-habit-circle", description: "Details to follow" },
      { label: "FSP Fun Day", href: "/programs/fsp-fun-day", description: "Details to follow" },
    ],
  },
  { label: "Community", href: "/community" },
  {
    label: "Events",
    children: [
      { label: "All Events", href: "/events", description: "What's happening inside FSP" },
      { label: "FSP Catalyst Connect", href: "/events/catalyst-connect", description: "Connect. Learn. Collaborate." },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
];

export const joinHref = "/contact";
export const talkHref = "/contact?intent=talk";

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Programs",
    links: [
      { label: "About FSP", href: "/about-fsp" },
      { label: "30 Days Challenge", href: "/programs/30-days-challenge" },
      { label: "FSP TTX", href: "/programs/fsp-ttx" },
      { label: "FSP GTX", href: "/programs/fsp-gtx" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "FSP Community", href: "/community" },
      { label: "FSP Mastermind", href: "/programs/fsp-mastermind" },
      { label: "Wednesday Masterclass", href: "/programs/fsp-wednesday-masterclass" },
      { label: "Catalyst Connect", href: "/events/catalyst-connect" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Join FSP", href: "/contact" },
    ],
  },
];
