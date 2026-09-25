# FSP Website — Work Completed So Far

**Project:** Facilitator Support Program (FSP) website — *Learn. Lead. Impact.*
**Repository:** `e:\fsp` · branch `main` · working tree clean
**Document generated:** 2026-09-24

This document records what has been built in this repository, in what order, and what is still
open. It is a status record, not a how-to — for setup and content-editing instructions see
[README.md](README.md).

---

## 1. What this project is

A multi-page marketing and information website for the Facilitator Support Program, founded by
Karunai Prakash (Key Purpose Training Solutions). The site presents FSP's programs, community
experiences, events, resources and enquiry flow, and includes an AI assistant ("Jarvis") that
answers visitor questions about FSP.

All approved copy lives in [fsp_content_source.md](fsp_content_source.md) /
[FSP-WEBSITE-CONTENT.md](FSP-WEBSITE-CONTENT.md); the build brief lives in
[fsp_claude_code_master_prompt.md](fsp_claude_code_master_prompt.md).

---

## 2. Technology stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.3.5 (App Router), React 19.2.8 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/postcss`), custom tokens in [app/globals.css](app/globals.css) |
| Smooth scrolling | Lenis 1.3 |
| Scroll choreography | GSAP 3.15 + ScrollTrigger (lazy-loaded) |
| UI transitions | Framer Motion 13 (`LazyMotion` + `m`) |
| Image tooling | sharp (logo asset generation script) |
| Linting | ESLint 9 + `eslint-config-next` |
| AI | Google Gemini REST API (`generateContent`), with a local deterministic fallback |

---

## 3. Timeline of work

### Phase 1 — Initial build (17 Sep 2026, commit `c8ee67f`)

The full site was built in one pass: ~90 files covering routes, components, the data layer, the
motion system, SEO and accessibility work.

### Phase 2 — Build hardening (17 Sep 2026, commit `cccb1f2`)

Fixed a production build crash that occurred when `NEXT_PUBLIC_SITE_URL` was blank.
[data/site.ts](data/site.ts) now resolves the site URL through a fallback chain —
`NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → `VERCEL_URL` → `http://localhost:3000` —
adds the protocol when missing, and ignores malformed values.

### Phase 3 — Jarvis chatbot, first version (22 Sep 2026, commit `3f25a1d`)

Added the floating AI assistant: launcher icon, chat panel, API route, a rule-based response engine
and a knowledge base sourced from the approved content. Jarvis was mounted globally in
[app/layout.tsx](app/layout.tsx). The approved content was also committed as
[FSP-WEBSITE-CONTENT.md](FSP-WEBSITE-CONTENT.md).

### Phase 4 — Gemini integration + hero rework (23 Sep 2026, commit `3426bf1`)

- Added [lib/gemini.ts](lib/gemini.ts): a Gemini client with an FSP-specific system instruction,
  structured JSON output, conversation history and guardrails.
- Rewrote [app/api/jarvis/route.ts](app/api/jarvis/route.ts) to call Gemini first and fall back to
  the local engine automatically.
- Expanded [lib/jarvis-engine.ts](lib/jarvis-engine.ts) with language detection (English, Tamil,
  Tanglish) and per-language replies.
- Upgraded [components/fsp/JarvisChat.tsx](components/fsp/JarvisChat.tsx) with multi-turn history,
  follow-up suggestion chips and richer message rendering.
- Reworked [components/fsp/Hero.tsx](components/fsp/Hero.tsx) into a responsive two-column desktop
  layout that collapses to a clean stack on tablet and mobile, with the background trajectory
  artwork clipped so it no longer causes horizontal overflow.

---

## 4. What has been built

### 4.1 Pages — all 10 routes complete

| Route | File |
| --- | --- |
| `/` | [app/page.tsx](app/page.tsx) |
| `/about-fsp` | [app/about-fsp/page.tsx](app/about-fsp/page.tsx) |
| `/core-program` | [app/core-program/page.tsx](app/core-program/page.tsx) |
| `/30-days-challenge` | [app/30-days-challenge/page.tsx](app/30-days-challenge/page.tsx) |
| `/certification` | [app/certification/page.tsx](app/certification/page.tsx) |
| `/community` | [app/community/page.tsx](app/community/page.tsx) |
| `/events` | [app/events/page.tsx](app/events/page.tsx) — revalidates hourly, past events drop off |
| `/resources` | [app/resources/page.tsx](app/resources/page.tsx) — search + filters |
| `/faq` | [app/faq/page.tsx](app/faq/page.tsx) |
| `/contact` | [app/contact/page.tsx](app/contact/page.tsx) |

Plus a 404 page, a page-transition template, and the root layout with skip link, navbar, footer and
the global Jarvis mount.

### 4.2 Component library

- **Layout** ([components/layout/](components/layout/)) — Navbar with keyboard-operable dropdowns,
  full-screen MobileMenu with focus trap, Footer.
- **UI** ([components/ui/](components/ui/)) — Button, Eyebrow, SectionHeading, Accordion, Stat,
  Marquee, FilterChips, PageHero, Logo, Divider, Arrow, JsonLd.
- **Motion** ([components/motion/](components/motion/)) — SmoothScroll, RevealObserver, TextReveal,
  ScrollReveal, Parallax, HorizontalScroll, `useScrollScene`.
- **FSP sections** ([components/fsp/](components/fsp/)) — 26 components including Hero, ProblemList,
  Transformation, Journey, BrandStatement, Ecosystem, ChallengeCounter, CertificationJourney,
  CommunityGrid, ExperienceSection, EventHub, ResourceLibrary, EnquiryForm, FounderSection.

### 4.3 Content/data layer

All copy is separated from presentation in [data/](data/) — pages only compose components:
`site.ts` (nav, footer, contact, brand), `fsp.ts`, `programs.ts`, `community.ts`, `events.ts`,
`resources.ts`, `faq.ts`, `organisations.ts`, plus the Jarvis knowledge files.

### 4.4 Motion system

A three-tier approach, documented in the README:

- **CSS** for the hero entrance (no JS above the fold), hovers, reveals, marquee.
- **Lenis** for global smooth scrolling, with header-aware anchor offsets; not created under
  `prefers-reduced-motion`.
- **GSAP + ScrollTrigger** for scroll choreography only (problem list highlight, Trainer →
  Facilitator pinned morph, journey progress, LEARN. LEAD. IMPACT., 30-day counter, horizontal
  module scroll), lazy-loaded via [lib/gsap.ts](lib/gsap.ts) so it never enters the initial bundle,
  and synced to the single Lenis instance in [lib/scroll.ts](lib/scroll.ts).
- **Framer Motion** for UI transitions (dropdowns, mobile menu, ecosystem panel, filtered lists,
  form states).

Every scroll scene renders a complete static layout first; GSAP only enhances it. Three.js/WebGL,
Lottie and Rive were deliberately not used — the logo's rising-trajectory motif is delivered with
lightweight SVG/CSS instead.

### 4.5 Jarvis AI assistant

| Piece | File |
| --- | --- |
| Launcher + panel state | [components/fsp/Jarvis.tsx](components/fsp/Jarvis.tsx), [JarvisIcon.tsx](components/fsp/JarvisIcon.tsx) |
| Chat UI | [components/fsp/JarvisChat.tsx](components/fsp/JarvisChat.tsx) |
| API endpoint | [app/api/jarvis/route.ts](app/api/jarvis/route.ts) |
| Gemini client | [lib/gemini.ts](lib/gemini.ts) |
| Local fallback engine | [lib/jarvis-engine.ts](lib/jarvis-engine.ts) |
| Knowledge base | [data/jarvis-knowledge.ts](data/jarvis-knowledge.ts), [data/jarvis-knowledge2.ts](data/jarvis-knowledge2.ts) |

Behaviour:

1. The request goes to Gemini with an FSP system instruction, the last 8 turns of history, JSON
   response format and a 12-second timeout.
2. If Gemini is unconfigured, errors, times out or returns an unusable payload, the route silently
   falls back to the local rule-based engine. The response reports `source: "gemini" | "local"`.
3. **Guardrails:** Jarvis will not invent fees, batch dates or schedules — it directs visitors to
   the FSP team instead.
4. **Languages:** replies in English, Tamil script, or Tanglish, matching how the visitor wrote.
5. Returns 2–3 short follow-up suggestions, rendered as clickable chips.

### 4.6 Enquiry form

[lib/forms.ts](lib/forms.ts) defines the enquiry model (intent, name, email, phone, role,
experience level, interest, message), client-side validation and JSON `POST` submission to
`NEXT_PUBLIC_FSP_FORM_ENDPOINT`. No backend is bundled — any CRM webhook, form service or
serverless function will do. When the endpoint is unset the form validates but tells the visitor
the enquiry was not sent.

### 4.7 SEO

Per-route title, description, canonical, Open Graph and Twitter metadata via
[lib/seo.ts](lib/seo.ts); a generated OG image ([app/opengraph-image.tsx](app/opengraph-image.tsx));
[sitemap.ts](app/sitemap.ts), [robots.ts](app/robots.ts) and [manifest.ts](app/manifest.ts); and
JSON-LD for EducationalOrganization, Course, FAQPage, BreadcrumbList and Event.

### 4.8 Accessibility

Semantic landmarks, skip link, one `h1` per page, keyboard-operable dropdowns / tabs / accordion /
mobile menu (focus trap + Escape), visible focus rings (orange on dark surfaces), labelled form
fields with inline errors, and axe-core checks against WCAG 2.2 AA.

### 4.9 Brand assets

[public/fsp-logo.png](public/fsp-logo.png) is the supplied original.
[scripts/build-logo-assets.mjs](scripts/build-logo-assets.mjs) regenerates the transparent
light/dark variants in `public/brand/` and the app icons — rerun it only if the logo changes.

---

## 5. Configuration status

| Variable | Purpose | Local status |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, robots, OG | Set |
| `NEXT_PUBLIC_FSP_FORM_ENDPOINT` | Receives enquiry submissions | **Empty — form cannot deliver enquiries** |
| `GEMINI_API_KEY` | Jarvis AI responses | Set |
| `GEMINI_MODEL` | Gemini model id | Set |

`.env.local` is git-ignored; [.env.example](.env.example) documents all four variables.

---

## 6. Open items

**Blocking for launch**

1. **Enquiry endpoint** — `NEXT_PUBLIC_FSP_FORM_ENDPOINT` is empty, so no enquiry currently reaches
   anyone. Point it at a CRM webhook or form service before going live.
2. **Contact channels** — `site.contact.email` and `site.contact.phone` in
   [data/site.ts](data/site.ts) are still `null`; components hide them until approved details are
   supplied.
3. **Production env vars** — confirm all four variables are set in the deployment environment, not
   just locally.

**Content awaiting approval**

4. **Founder photo** — `founder.photo` in [data/fsp.ts](data/fsp.ts) is `null`; drop an approved
   image into `public/images/` and set the path.
5. **Transformation examples** — currently labelled as examples, not testimonials, by design.
   Replace with real member stories only once names and permissions are in hand.
6. **Organisation logos** — names render typographically until approved logo assets arrive.
7. **Events and resources** — append confirmed entries to [data/events.ts](data/events.ts) and
   [data/resources.ts](data/resources.ts).

**Housekeeping**

8. [data/powertest.txt](data/powertest.txt) is a stray test file (contents: `test`) referenced
   nowhere — safe to delete.
9. `moreKnowledge` in [data/jarvis-knowledge2.ts](data/jarvis-knowledge2.ts) is exported but never
   imported. The local fallback engine keeps its own copy of the same topics in
   [lib/jarvis-engine.ts](lib/jarvis-engine.ts), so this content is duplicated — wire it up or
   remove it so the two cannot drift apart.
10. The last two commits are both titled "update changes"; more descriptive messages would make the
    history easier to follow.
11. [next.config.ts](next.config.ts) is still the empty scaffold — fine as-is, noted for awareness.

---

## 7. Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint

node scripts/build-logo-assets.mjs   # only when the logo changes
```

Requires Node.js 20.9+.
