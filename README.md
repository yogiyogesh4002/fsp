# Facilitator Support Program (FSP) — Website

**Learn. Lead. Impact.**

A multi-page Next.js website for the Facilitator Support Program, founded by Karunai Prakash.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

Requires Node.js 20.9+.

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL (canonical URLs, sitemap, robots, Open Graph). **Set this before deploying.** |
| `NEXT_PUBLIC_FSP_FORM_ENDPOINT` | Endpoint that receives Join FSP / Talk to us enquiries as a JSON `POST`. Until it is set, the form validates but tells visitors the enquiry was not sent. |

## Updating content

All copy lives in `data/` and comes from the approved content source (`fsp_content_source.md`). Page files only compose components.

| File | Content |
| --- | --- |
| `data/site.ts` | Navigation, footer links, contact channels (`site.contact` — add approved email/phone to show them) |
| `data/fsp.ts` | Hero, problem, journey, audiences, numbers, founder, transformation examples, final CTA |
| `data/programs.ts` | Ecosystem, the three main programs (`mainPrograms`), Core Program modules, 30 Days Challenge, challenges |
| `data/media.ts` | **Image slots and team.** Set `src` + `alt` on a slot to publish an image; append verified people to `team`. Empty slots render as marked placeholders. |
| `data/community.ts` | Community benefits, Wednesday Masterclass, Mastermind, Catalyst Connect, TTX |
| `data/events.ts` | **Events** — append to `events` (confirmed details only). Past events drop off automatically; `/events` revalidates hourly. |
| `data/resources.ts` | **Resources** — append to `resources` (approved files/links only). Search and filters pick them up automatically. |
| `data/faq.ts` | FAQ (also emitted as FAQPage structured data) |
| `data/organisations.ts` | Organisation names. Add a `logo` only for approved assets with permission; otherwise names render typographically. |

Founder photo: set `founder.photo` in `data/fsp.ts` once an approved photograph is supplied (place it in `public/images/`). The founder section lives on `/about-fsp`, not the homepage.

### Site structure

```
/                           concise introduction + previews
/about-fsp                  the full FSP story, founder, gallery, team, organisations
/programs                   the three main programs
/programs/30-days-challenge
/programs/fsp-ttx           residential program (awaiting full source material)
/programs/fsp-gtx           upcoming (awaiting all source material)
/core-program               Core Program modules (not in the primary nav)
/community                  community + Wednesday Masterclass + Mastermind
/events                     events hub
/events/catalyst-connect
/resources  /faq  /contact
```

Each page owns its content. The homepage links to pages rather than repeating them.

Transformation examples are deliberately labelled as examples, not testimonials. Replace them with real member stories only when names and approvals are available.

## Brand assets

`public/fsp-logo.png` is the supplied original. Regenerate the derived assets only if the logo changes:

```bash
node scripts/build-logo-assets.mjs
```

This creates transparent light/dark logo variants in `public/brand/` and the app icons in `app/`.

## Architecture

```
app/                    routes, metadata, sitemap, robots, manifest, OG image
components/layout/      Navbar (dropdowns), MobileMenu (full-screen overlay), Footer
components/ui/          Button, Eyebrow, SectionHeading, Accordion, Stat, Marquee, FilterChips, PageHero, Logo…
components/motion/      SmoothScroll, RevealObserver, TextReveal, ScrollReveal, Parallax, HorizontalScroll, useScrollScene
components/fsp/         Hero, ProblemList, Transformation, Journey, BrandStatement, Ecosystem, ChallengeCounter,
                        CertificationJourney, CommunityGrid, ExperienceSection, EventHub, ResourceLibrary, EnquiryForm…
data/                   all site content
lib/                    scroll orchestration, lazy GSAP loader, SEO helpers, form model
```

### Motion system

| Layer | Used for |
| --- | --- |
| **CSS** | Hero entrance (no JS above the fold), hovers, reveals (driven by one shared IntersectionObserver), marquee, trajectory spark |
| **Lenis** | Global smooth scrolling (`components/motion/SmoothScroll.tsx`). Anchor links offset for the header. Not created for `prefers-reduced-motion`. |
| **GSAP + ScrollTrigger** | Scroll choreography only: problem list highlight, Trainer → Facilitator pinned morph, journey progress, LEARN. LEAD. IMPACT., 30-day counter, horizontal module scroll. Loaded on demand via `lib/gsap.ts` — never in the initial bundle — and synced to the single Lenis instance in `lib/scroll.ts`. |
| **Framer Motion** | UI transitions: dropdowns, mobile menu, ecosystem panel, filtered lists, form states (`LazyMotion` + `m` for a small footprint). |

Every scroll scene renders a complete static layout first; GSAP only enhances it. With reduced motion, scenes, smooth scrolling and reveals are disabled and all content remains visible.

Three.js/WebGL, Lottie and Rive are intentionally not used: the logo's rising-trajectory motif is delivered with lightweight SVG/CSS, and no approved animation assets were supplied.

### Accessibility

Semantic landmarks, skip link, one `h1` per page, keyboard-operable dropdowns / tabs / accordion / mobile menu (focus trap, Escape), visible focus rings (orange on dark surfaces), labelled form fields with inline errors, and axe-core checks against WCAG 2.2 AA.

### SEO

Per-route title, description, canonical, Open Graph and Twitter metadata (`lib/seo.ts`), generated OG image, `sitemap.xml`, `robots.txt`, web manifest, and JSON-LD (EducationalOrganization, Course, FAQPage, BreadcrumbList, Event).
