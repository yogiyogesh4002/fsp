import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata, absoluteUrl } from "@/lib/seo";
import { site, joinHref } from "@/data/site";
import { coreProgram, ecosystem, type EcosystemItem } from "@/data/programs";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { TextReveal } from "@/components/motion/TextReveal";
import { Module } from "@/components/fsp/Module";
import { FinalCTA } from "@/components/fsp/FinalCTA";
import { Arrow } from "@/components/ui/Arrow";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "FSP Core Program | Build Your Facilitation Skills",
  description: coreProgram.description,
  path: "/core-program",
});

const courseLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "FSP Core Program",
  description: coreProgram.description,
  url: absoluteUrl("/core-program"),
  provider: { "@type": "EducationalOrganization", name: site.name, url: absoluteUrl("/") },
  hasPart: coreProgram.modules.map((m) => ({ "@type": "Course", name: `${m.label}: ${m.title}`, description: m.topics.join(", ") })),
};

export default function CoreProgramPage() {
  // "certification" was a Good to Great node and no longer exists; the
  // programs grouping takes its place so the three-up grid stays full.
  const next = ecosystem.items.filter(
    (i): i is EcosystemItem & { href: string } =>
      i.href !== undefined && (i.id === "challenge" || i.id === "programs" || i.id === "community"),
  );

  return (
    <>
      <JsonLd data={courseLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Core Program", path: "/core-program" }])} />

      <PageHero
        eyebrow="FSP Core Program"
        lines={[coreProgram.headline[0], <>{coreProgram.headline[1].slice(0, -1)}<span key="s" className="text-orange">.</span></>]}
        size="mega"
        aside={
          <>
            <p className="text-lede">{coreProgram.description}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <Button href={joinHref} size="lg">Join FSP</Button>
              <Button href="#modules" variant="text">See the modules</Button>
            </div>
          </>
        }
      />

      {/* Module overview strip */}
      <div className="tone-dark">
        <ol className="container-fsp grid divide-y divide-line-dark md:grid-cols-3 md:divide-x md:divide-y-0">
          {coreProgram.modules.map((m) => (
            <li key={m.number} className="flex items-baseline gap-4 py-6 md:px-6 md:first:pl-0">
              <span className="font-display text-4xl text-orange">{m.number}</span>
              <span className="text-lg font-semibold tracking-tight">{m.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <section id="modules" aria-label="Core Program modules" className="bg-paper">
        <div className="container-fsp pt-20 md:pt-28">
          <p className="eyebrow text-muted">3 modules · {coreProgram.modules.reduce((n, m) => n + m.topics.length, 0)} topics</p>
        </div>
        <HorizontalScroll
          className="py-10 md:py-14 lg:py-16"
          trackClassName="container-fsp lg:group-data-[enhanced=true]/hscroll:max-w-none lg:group-data-[enhanced=true]/hscroll:pt-[calc(var(--nav-h)+1rem)]"
        >
          {coreProgram.modules.map((m, i) => (
            <Module key={m.number} module={m} index={i} />
          ))}
        </HorizontalScroll>
      </section>

      <section aria-labelledby="core-close" className="section-pad bg-white">
        <div className="container-fsp">
          <TextReveal
            id="core-close"
            lines={[coreProgram.close[0], <>{coreProgram.close[1].slice(0, -1)}<span key="s" className="text-orange">.</span></>]}
            className="font-display text-display max-w-6xl"
          />
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={joinHref} size="lg">Join FSP</Button>
          </div>

          <div className="mt-24 border-t border-line pt-10">
            <p className="eyebrow mb-6 text-muted">Continue the journey</p>
            <ul className="grid gap-px bg-line md:grid-cols-3">
              {next.map((item) => (
                <li key={item.id} className="bg-white">
                  <Link href={item.href} className="group flex h-full flex-col gap-6 p-6 transition-colors hover:bg-paper md:py-8">
                    <span className="flex items-center justify-between text-sm font-semibold tabular-nums text-navy">
                      {item.number}
                      <Arrow className="text-navy transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-2xl font-semibold tracking-tight">{item.title}</span>
                    <span className="text-muted">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCTA showBelief={false} />
    </>
  );
}
