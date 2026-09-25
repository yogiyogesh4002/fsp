import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getExperience } from "@/data/community";
import { imagesFor } from "@/data/media";
import { getUpcomingEvents } from "@/data/events";
import { joinHref } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";
import { Gallery } from "@/components/fsp/Gallery";
import { EventCard } from "@/components/fsp/EventCard";
import { FinalCTA } from "@/components/fsp/FinalCTA";

/**
 * FSP Catalyst Connect.
 *
 * Content comes from the approved Catalyst Connect entry in
 * `data/community.ts`. Speakers, facilitators, dates, venue and agenda are not
 * listed because none have been supplied — scheduled sessions appear
 * automatically once they are added to `data/events.ts`.
 */

const catalyst = getExperience("catalyst-connect");

export const metadata: Metadata = pageMetadata({
  title: "FSP Catalyst Connect | Connect. Learn. Collaborate.",
  description: catalyst?.summary ?? "A community experience that brings FSP members together beyond the virtual environment.",
  path: "/events/catalyst-connect",
});

// Scheduled sessions drop off automatically once they have passed.
export const revalidate = 3600;

export default function CatalystConnectPage() {
  if (!catalyst) return null;
  const sessions = getUpcomingEvents().filter((e) => e.category === "catalyst-connect");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Events", path: "/events" },
          { name: "FSP Catalyst Connect", path: "/events/catalyst-connect" },
        ])}
      />

      <PageHero
        eyebrow="FSP Catalyst Connect"
        lines={["Connect. Learn.", <>Collaborate<span key="s" className="text-orange">.</span></>]}
        aside={
          <>
            {catalyst.summary && <p className="text-lede">{catalyst.summary}</p>}
            <div className="mt-8">
              <Button href={joinHref} size="lg">
                Register your interest
              </Button>
            </div>
          </>
        }
      />

      {/* Purpose — the five things the experience is designed for. */}
      <section aria-labelledby="purpose-title" className="section-pad bg-paper">
        <div className="container-fsp grid-fsp gap-y-12">
          <SectionHeading
            id="purpose-title"
            eyebrow="The purpose"
            lines={withStop(["Beyond the", "virtual room."])}
            size="headline"
            className="col-span-4 md:col-span-8 lg:col-span-4"
          />
          <ol className="col-span-4 border-t border-line md:col-span-8 lg:col-span-7 lg:col-start-6">
            {catalyst.list.map((item, i) => (
              <li
                key={item.title}
                data-reveal=""
                style={{ ["--reveal-i" as string]: i }}
                className="flex items-baseline gap-4 border-b border-line py-5"
              >
                <span className="w-8 shrink-0 text-xs font-semibold tabular-nums text-navy">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[clamp(1.375rem,2.4vw,2rem)] font-semibold tracking-tight">{item.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scheduled sessions, rendered only once some have been published. */}
      {sessions.length > 0 && (
        <section aria-labelledby="catalyst-sessions-title" className="section-pad bg-white">
          <div className="container-fsp">
            <h2 id="catalyst-sessions-title" className="eyebrow mb-6 text-muted">
              Upcoming sessions
            </h2>
            <ol className="border-t border-line">
              {sessions.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <Gallery
        slots={imagesFor("catalyst-connect")}
        eyebrow="Catalyst Connect"
        headline={["From the", "meet-ups."]}
        pending="Photographs from Catalyst Connect will appear here."
      />

      {/* Awaiting source material: speakers and facilitators, agenda, venue and
          past-edition recaps. Not rendered until supplied. */}

      <FinalCTA showBelief={false} />
    </>
  );
}
