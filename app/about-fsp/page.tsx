import type { Metadata } from "next";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { founder, journey, positioning, problem, whatIsFsp } from "@/data/fsp";
import { ecosystem } from "@/data/programs";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ChapterNav } from "@/components/fsp/ChapterNav";
import { EcosystemFlow } from "@/components/fsp/EcosystemFlow";
import { AudienceCards } from "@/components/fsp/AudienceCards";
import { Gallery } from "@/components/fsp/Gallery";
import { TeamSection } from "@/components/fsp/TeamSection";
import { OrganisationGrid } from "@/components/fsp/OrganisationGrid";
import { TransformationStory } from "@/components/fsp/TransformationStory";
import { FinalCTA } from "@/components/fsp/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryCopy, galleryImages } from "@/data/media";

export const metadata: Metadata = pageMetadata({
  title: "About FSP | Facilitator Support Program",
  description:
    "FSP is not just a course for trainers. It is a growth ecosystem for facilitators — learn about the need, the philosophy, the ecosystem, the journey and the vision.",
  path: "/about-fsp",
});

const chapters = [
  { id: "the-need", label: "The Need" },
  { id: "the-philosophy", label: "The Philosophy" },
  { id: "the-ecosystem", label: "The Ecosystem" },
  { id: "the-journey", label: "The Journey" },
  { id: "the-vision", label: "The Vision" },
];

function Chapter({ id, index, label, children }: { id: string; index: number; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-20 md:py-28">
      <p className="eyebrow mb-8 flex items-center gap-3 text-muted">
        <span className="font-display text-5xl text-navy md:text-6xl">{String(index).padStart(2, "0")}</span>
        <span id={`${id}-title`} className="text-ink">{label}</span>
      </p>
      {children}
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About FSP", path: "/about-fsp" }])} />
      <PageHero
        eyebrow="About FSP"
        lines={["More than", <>a course<span key="s" className="text-orange">.</span></>]}
        aside={<p className="text-lede">{positioning.statement}</p>}
      />

      <div className="container-fsp">
        <div className="grid-fsp">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="h-full pt-20 md:pt-28">
              <ChapterNav chapters={chapters} />
            </div>
          </aside>

          <div className="col-span-4 md:col-span-8 lg:col-span-9">
            <Chapter id="the-need" index={1} label="The Need">
              <TextReveal
                lines={[problem.headline[0], <>{problem.headline[1].slice(0, -1)}<span key="s" className="text-orange">.</span></>]}
                className="font-display text-display"
                as="h2"
              />
              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <div className="space-y-1 text-lede text-muted">
                  {problem.lead.map((l, i) => (
                    <p key={l} className={i === problem.lead.length - 1 ? "pt-3 font-semibold text-ink" : undefined}>
                      {l}
                    </p>
                  ))}
                </div>
                <ul className="columns-1 border-t border-line text-[0.95rem] sm:columns-2 sm:gap-8">
                  {problem.points.map((p) => (
                    <li key={p} className="flex break-inside-avoid gap-3 border-b border-line py-2.5">
                      <span aria-hidden="true" className="text-orange">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-10 text-title font-semibold tracking-tight">{problem.close}</p>
            </Chapter>

            <Chapter id="the-philosophy" index={2} label="The Philosophy">
              <ScrollReveal as="blockquote" className="font-display text-headline">
                <p>
                  Facilitation is not just about conducting a session. It&apos;s about creating an experience that{" "}
                  <span className="text-navy">creates learning</span>
                  <span className="text-orange">.</span>
                </p>
              </ScrollReveal>
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                <p className="text-lede text-muted">{whatIsFsp.body}</p>
                <div className="space-y-2 text-lede">
                  {founder.visionSupport.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </div>
              <p className="eyebrow mt-12 text-muted">{positioning.sourceMotto}</p>
            </Chapter>

            <Chapter id="the-ecosystem" index={3} label="The Ecosystem">
              <TextReveal as="h2" lines={["One ecosystem.", <>Multiple growth experiences<span key="s" className="text-orange">.</span></>]} className="font-display text-headline" />
              <ol className="mt-12 border-t border-line">
                {ecosystem.items.map((item) => (
                  <li key={item.id} data-reveal="" className="grid gap-2 border-b border-line py-6 md:grid-cols-[4rem_1fr_1.2fr] md:gap-6">
                    <span className="text-sm font-semibold tabular-nums text-navy">{item.number}</span>
                    <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-muted">{item.description}</p>
                  </li>
                ))}
              </ol>
              <p className="eyebrow mb-6 mt-16 text-muted">The core ecosystem</p>
              <EcosystemFlow className="lg:grid-cols-4! lg:[&>li:last-child]:col-span-2!" />
            </Chapter>

            <Chapter id="the-journey" index={4} label="The Journey">
              <TextReveal as="h2" lines={["Learn. Practice. Create.", <>Build. Connect. Grow<span key="s" className="text-orange">.</span></>]} className="font-display text-headline" />
              <ol className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
                {journey.map((stage, i) => (
                  <li key={stage.key} className="flex min-h-56 flex-col justify-between bg-paper p-6 md:p-8">
                    <span className="text-xs font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      {/* text-5xl overflows the 3-up cell inside the 9-column
                          content track at lg; it only fits from xl. */}
                      <h3 className="font-display text-4xl xl:text-5xl">{stage.title}</h3>
                      <p className="mt-3 text-muted">{stage.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Chapter>

            <Chapter id="the-vision" index={5} label="The Vision">
              <TextReveal
                as="h2"
                // sized against the 9-column content track, not the full page:
                // 12.5vw pushed "Facilitators." past the column at lg.
                className="font-display text-[clamp(3.25rem,10.5vw,9.5rem)]"
                lines={[
                  "To create",
                  <span key="n" className="text-navy">1000</span>,
                  "Impactful",
                  <>Facilitators<span key="s" className="text-orange">.</span></>,
                ]}
              />
              <div className="mt-12 space-y-2 text-lede text-muted">
                {founder.visionSupport.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </Chapter>
          </div>
        </div>
      </div>

      <section aria-labelledby="about-audience-title" className="section-pad bg-paper">
        <div className="container-fsp">
          <SectionHeading id="about-audience-title" eyebrow="Who is FSP for?" lines={["Who is", <>FSP for<span key="s" className="text-orange">?</span></>]} size="headline" />
          <div className="mt-14">
            <AudienceCards />
          </div>
        </div>
      </section>

      <Gallery
        slots={galleryImages}
        eyebrow={galleryCopy.eyebrow}
        headline={galleryCopy.headline}
        pending={galleryCopy.pending}
        index="06"
      />

      <TeamSection index="07" />

      <OrganisationGrid index="08" />

      <TransformationStory index="09" />

      <FinalCTA />
    </>
  );
}
