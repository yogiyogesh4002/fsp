import type { FspProgram } from "@/data/programs";
import { imagesFor } from "@/data/media";
import { joinHref } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Gallery } from "@/components/fsp/Gallery";
import { FinalCTA } from "@/components/fsp/FinalCTA";

/**
 * A program page for a program with no approved source material yet.
 *
 * It states the program exists and that details are to follow — and nothing
 * else. No purpose, format, duration, audience, dates, location, pricing or
 * outcomes are described, because none have been supplied. Replace this with a
 * real page once the FSP team provides the content.
 */
export function PendingProgram({ program, lines }: { program: FspProgram; lines: string[] }) {
  const last = lines[lines.length - 1];

  return (
    <>
      <PageHero
        eyebrow={`${program.name} · ${program.statusLabel}`}
        lines={[
          ...lines.slice(0, -1),
          <>
            {last.replace(/\.$/, "")}
            <span key="s" className="text-orange">
              .
            </span>
          </>,
        ]}
        aside={
          <>
            <p className="text-lede">Part of the FSP program ecosystem.</p>
            <p className="mt-4 text-muted">
              Details for {program.name} are being finalised by the FSP team. Register your interest and they will
              share them with you directly.
            </p>
            <div className="mt-8">
              <Button href={joinHref} size="lg">
                Register your interest
              </Button>
            </div>
          </>
        }
      />

      <section aria-labelledby="status-title" className="tone-navy">
        <div className="container-fsp py-16 md:py-24">
          <div className="grid-fsp items-end gap-y-8">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <h2 id="status-title" className="eyebrow text-orange">
                Status
              </h2>
              <p className="mt-8 text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-tight">
                Details to follow
                <span className="text-orange">.</span>
              </p>
              <p className="mt-6 max-w-xl text-on-dark-muted">
                Nothing about this program is confirmed publicly yet, so nothing is listed here.
              </p>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-line-dark">
                {["Format", "Schedule", "Location", "Investment"].map((label) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line-dark py-4">
                    <dt className="eyebrow text-on-dark-muted">{label}</dt>
                    <dd className="text-sm font-semibold">To be announced</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Gallery
        slots={imagesFor(program.id)}
        eyebrow={program.name}
        headline={["A first", "look."]}
        pending={`Images for ${program.name} will appear here once they are supplied.`}
      />

      {/* Awaiting all source material: overview, purpose, format, activities,
          schedule, outcomes and registration. Do not populate without it. */}

      <FinalCTA showBelief={false} />
    </>
  );
}
