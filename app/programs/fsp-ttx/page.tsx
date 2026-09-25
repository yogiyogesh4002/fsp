import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getExperience } from "@/data/community";
import { imagesFor } from "@/data/media";
import { joinHref } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { Gallery } from "@/components/fsp/Gallery";
import { FinalCTA } from "@/components/fsp/FinalCTA";

/**
 * FSP TTX — the residential program.
 *
 * Every claim on this page comes from the approved TTX entry in
 * `data/community.ts`. Curriculum, schedule, location, dates, pricing,
 * accommodation and outcomes are deliberately absent: no such material has
 * been supplied. Add those sections only when the FSP team provides them.
 */

const ttx = getExperience("ttx");

export const metadata: Metadata = pageMetadata({
  title: "FSP TTX | Transformational Residential Experience",
  description: ttx
    ? `${ttx.headline} ${ttx.summary ?? ""}`.trim()
    : "FSP TTX is a transformational residential learning experience.",
  path: "/programs/fsp-ttx",
});

export default function TtxPage() {
  if (!ttx) return null;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: "FSP TTX", path: "/programs/fsp-ttx" },
        ])}
      />

      <PageHero
        eyebrow="FSP TTX · Residential program"
        lines={["FSP", <>TTX<span key="s" className="text-orange">.</span></>]}
        aside={
          <>
            <p className="text-lede">{ttx.headline}</p>
            {ttx.summary && <p className="mt-4 text-muted">{ttx.summary}</p>}
            <div className="mt-8">
              <Button href={joinHref} size="lg">
                Register your interest
              </Button>
            </div>
          </>
        }
      />

      {/* Residential framing — the one distinguishing fact we hold. */}
      <section aria-labelledby="residential-title" className="tone-navy">
        <div className="container-fsp py-16 md:py-24">
          <h2 id="residential-title" className="eyebrow text-orange">
            A residential experience
          </h2>
          <p className="mt-8 max-w-4xl text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-tight">
            Step away from your routine. Step into an immersive learning experience
            <span className="text-orange">.</span>
          </p>
        </div>
      </section>

      {/* The five pillars, from the approved content source. */}
      <section aria-labelledby="pillars-title" className="section-pad bg-paper">
        <div className="container-fsp grid-fsp gap-y-12">
          <SectionHeading
            id="pillars-title"
            eyebrow="What the experience is built on"
            lines={withStop(["Five", "pillars."])}
            size="headline"
            className="col-span-4 md:col-span-8 lg:col-span-4"
          />
          <ol className="col-span-4 border-t border-line md:col-span-8 lg:col-span-7 lg:col-start-6">
            {ttx.list.map((item, i) => (
              <li
                key={item.title}
                data-reveal=""
                style={{ ["--reveal-i" as string]: i }}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-line py-6"
              >
                <span className="text-xs font-semibold tabular-nums text-navy">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-tight">{item.title}</span>
                {item.description && <span className="col-start-2 mt-2 text-muted">{item.description}</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {ttx.close && (
        <section aria-labelledby="ttx-close-title" className="section-pad bg-white">
          <div className="container-fsp">
            <h2 id="ttx-close-title" className="sr-only">
              {ttx.close}
            </h2>
            <TextReveal
              as="p"
              className="font-display text-display max-w-6xl"
              lines={ttx.close.split(". ").map((line, i, all) =>
                i === all.length - 1 ? (
                  <>
                    {line.replace(/\.$/, "")}
                    <span key="s" className="text-orange">.</span>
                  </>
                ) : (
                  `${line}.`
                ),
              )}
            />
          </div>
        </section>
      )}

      <Gallery
        slots={imagesFor("fsp-ttx")}
        eyebrow="FSP TTX"
        headline={["Inside", "the experience."]}
        pending="Photographs from FSP TTX will appear here."
      />

      {/* Awaiting source material: program overview, curriculum/modules,
          activities, learning outcomes, schedule and a program FAQ. These
          sections are intentionally not rendered until the FSP team supplies
          the TTX material — nothing here is to be invented. */}

      <FinalCTA showBelief={false} />
    </>
  );
}
