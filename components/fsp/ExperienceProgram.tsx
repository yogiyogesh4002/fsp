import type { ReactNode } from "react";
import type { CommunityExperience } from "@/data/community";
import type { FspProgram } from "@/data/programs";
import { imagesFor, type ImageSlot as Slot } from "@/data/media";
import { joinHref } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";
import { Gallery } from "@/components/fsp/Gallery";
import { FinalCTA } from "@/components/fsp/FinalCTA";

type Props = {
  program: FspProgram;
  experience: CommunityExperience;
  /** Headline lines for the page hero. */
  lines: string[];
  galleryHeadline: string[];
  galleryPending: string;
  /** Supplied material for this program, rendered above the gallery. */
  sessions?: ReactNode;
  /** Overrides the gallery set when the page shows some of its images itself. */
  gallerySlots?: Slot[];
};

/**
 * A program page built from an approved community-experience entry
 * (FSP Mastermind, FSP Wednesday Masterclass).
 *
 * Renders only what the entry holds — headline, optional summary, its topic
 * list and optional closing line. Schedule, timings, facilitators, pricing and
 * registration detail are not shown because no such material exists; add them
 * only when the FSP team supplies them.
 */
export function ExperienceProgram({
  program,
  experience,
  lines,
  galleryHeadline,
  galleryPending,
  sessions,
  gallerySlots,
}: Props) {
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
            <p className="text-lede">{experience.headline}</p>
            {experience.summary && <p className="mt-4 text-muted">{experience.summary}</p>}
            <div className="mt-8">
              <Button href={joinHref} size="lg">
                Register your interest
              </Button>
            </div>
          </>
        }
      />

      <section aria-labelledby="topics-title" className="section-pad bg-paper">
        <div className="container-fsp grid-fsp gap-y-12">
          <SectionHeading
            id="topics-title"
            eyebrow={experience.listLabel ?? "What it covers"}
            lines={withStop(["What it", "covers."])}
            size="headline"
            className="col-span-4 md:col-span-8 lg:col-span-4"
          />
          <ol className="col-span-4 grid gap-px bg-line md:col-span-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {experience.list.map((item, i) => (
              <li
                key={item.title}
                data-reveal="cell"
                style={{ ["--reveal-i" as string]: i % 2 }}
                className="flex items-baseline gap-4 bg-paper py-5 sm:px-5"
              >
                <span className="w-7 shrink-0 text-xs font-semibold tabular-nums text-navy">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[clamp(1.125rem,1.8vw,1.375rem)] font-semibold leading-snug tracking-tight">
                    {item.title}
                  </span>
                  {item.description && <span className="mt-1 block text-sm text-muted">{item.description}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {experience.close && (
        <section aria-labelledby="close-title" className="tone-navy">
          <div className="container-fsp py-16 md:py-24">
            <h2 id="close-title" className="eyebrow text-orange">
              In short
            </h2>
            <p className="mt-8 max-w-4xl text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-tight">
              {experience.close.replace(/\.$/, "")}
              <span className="text-orange">.</span>
            </p>
          </div>
        </section>
      )}

      {sessions}

      <Gallery
        slots={gallerySlots ?? imagesFor(program.id)}
        eyebrow={program.name}
        headline={galleryHeadline}
        pending={galleryPending}
      />

      {/* Awaiting source material: schedule and timings, facilitators,
          session format, registration detail. Not rendered until supplied. */}

      <FinalCTA showBelief={false} />
    </>
  );
}
