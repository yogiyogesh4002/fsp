import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { joinHref } from "@/data/site";
import { challenges, thirtyDays } from "@/data/programs";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ChallengeCounter } from "@/components/fsp/ChallengeCounter";
import { Gallery } from "@/components/fsp/Gallery";
import { imagesFor } from "@/data/media";
import { FinalCTA } from "@/components/fsp/FinalCTA";
import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";

export const metadata: Metadata = pageMetadata({
  title: "FSP 30 Days Challenge | 30 Days. 30 Tasks. One Better Facilitator.",
  description: `${thirtyDays.statement} ${thirtyDays.description}`,
  path: "/programs/30-days-challenge",
});

export default function ThirtyDaysPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: "30 Days Challenge", path: "/programs/30-days-challenge" },
        ])}
      />
      <PageHero
        eyebrow="FSP 30 Days Challenge"
        size="mega"
        lines={[thirtyDays.headline[0], thirtyDays.headline[1], <>{thirtyDays.headline[2].slice(0, -1)}<span key="s" className="text-orange">.</span></>]}
        aside={
          <>
            <p className="text-lede">{thirtyDays.statement}</p>
            <p className="mt-4 text-muted">{thirtyDays.description}</p>
            <div className="mt-8">
              <Button href={joinHref} size="lg">Join FSP</Button>
            </div>
          </>
        }
      />

      {/* Daily ritual */}
      <section aria-labelledby="daily-title" className="bg-navy text-white">
        <div className="container-fsp grid gap-px bg-white/15 md:grid-cols-[1fr_3fr]">
          <div className="bg-navy py-8 md:py-12 md:pr-8">
            <h2 id="daily-title" className="eyebrow text-orange">{thirtyDays.daily.label}</h2>
          </div>
          <ul className="grid gap-px bg-white/15 sm:grid-cols-3">
            {thirtyDays.daily.items.map((item) => {
              const [n, ...rest] = item.split(" ");
              return (
                <li key={item} className="bg-navy py-8 sm:px-6 md:py-12">
                  <span className="font-display block text-[clamp(4rem,8vw,7rem)] text-orange">{n}</span>
                  <span className="mt-2 block text-xl font-semibold tracking-tight">{rest.join(" ")}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 30-day journey */}
      <section aria-labelledby="journey-title" className="tone-dark section-pad">
        <div className="container-fsp">
          <SectionHeading
            id="journey-title"
            eyebrow="The 30-day journey"
            lines={["30 days", <>30 tasks<span key="s" className="text-orange">.</span></>]}
            size="headline"
            className="mb-14 md:mb-20 [&_.eyebrow]:text-on-dark-muted"
          />
          <ChallengeCounter variant="page" />
        </div>
      </section>

      {/* Focus areas */}
      <section aria-labelledby="focus-title" className="section-pad bg-paper">
        <div className="container-fsp grid-fsp gap-y-12">
          <SectionHeading
            id="focus-title"
            eyebrow="30 Days Challenge"
            lines={["Focus", <>areas<span key="s" className="text-orange">.</span></>]}
            size="headline"
            className="col-span-4 md:col-span-8 lg:col-span-4"
          />
          <ol className="col-span-4 grid gap-px bg-line md:col-span-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
            {thirtyDays.focusAreas.map((area, i) => (
              <li key={area} data-reveal="cell" style={{ ["--reveal-i" as string]: i % 2 }} className="flex items-baseline gap-5 bg-paper py-6 sm:px-5">
                <span className="text-xs font-semibold tabular-nums text-navy">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-tight">{area}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Goal */}
      <section aria-labelledby="goal-title" className="section-pad bg-white">
        <div className="container-fsp">
          <p className="eyebrow mb-8 text-muted">The goal</p>
          <h2 id="goal-title" className="max-w-5xl text-headline font-semibold leading-[1.02] tracking-tight">
            <span className="block text-muted">{thirtyDays.goal[0]}</span>
            <span className="mt-3 block">{thirtyDays.goal[1]}</span>
          </h2>
          <TextReveal
            as="p"
            className="font-display mt-20 text-display"
            lines={thirtyDays.close.split(". ").map((l, i, a) => (i === a.length - 1 ? <>{l.replace(/\.$/, "")}<span key="s" className="text-orange">.</span></> : `${l}.`))}
          />
        </div>
      </section>

      {/* Other challenges */}
      <section aria-labelledby="challenges-title" className="section-pad bg-stone">
        <div className="container-fsp">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="challenges-title" eyebrow="FSP Challenges" lines={[challenges.headline]} size="headline" />
            <p className="eyebrow text-navy">{challenges.close}</p>
          </div>
          <ul className="mt-14 grid gap-px bg-line-strong md:grid-cols-3">
            {challenges.items.map((c, i) => (
              <ScrollReveal as="li" key={c.title} index={i} variant="cell" className="flex flex-col bg-stone p-6 md:p-8">
                <span className="text-xs font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-muted">{c.description}</p>
                {c.href && c.href !== "/programs/30-days-challenge" && (
                  <Link href={c.href} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                    Explore <Arrow />
                  </Link>
                )}
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <Gallery
        slots={imagesFor("30-days-challenge")}
        eyebrow="30 Days Challenge"
        headline={["Inside the", "challenge."]}
        pending="Images from the 30 Days Challenge will appear here."
        tone="light"
      />

      <FinalCTA showBelief={false} />
    </>
  );
}
