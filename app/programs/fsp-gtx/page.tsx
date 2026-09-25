import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { imagesFor } from "@/data/media";
import { joinHref } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Gallery } from "@/components/fsp/Gallery";
import { FinalCTA } from "@/components/fsp/FinalCTA";

/**
 * FSP GTX — upcoming.
 *
 * No approved material exists for GTX anywhere in the project, so this page
 * states only that it is an upcoming FSP experience and invites visitors to
 * register interest. Dates, location, pricing, curriculum, duration, format
 * and outcomes are all absent by design. When the FSP team supplies the GTX
 * material, add it here and drop the "details to be announced" panel.
 */

export const metadata: Metadata = pageMetadata({
  title: "FSP GTX | Upcoming FSP Experience",
  description:
    "FSP GTX is an upcoming experience inside the Facilitator Support Program. Register your interest to hear the details first.",
  path: "/programs/fsp-gtx",
});

export default function GtxPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: "FSP GTX", path: "/programs/fsp-gtx" },
        ])}
      />

      <PageHero
        eyebrow="FSP GTX · Upcoming"
        lines={["FSP", <>GTX<span key="s" className="text-orange">.</span></>]}
        aside={
          <>
            <p className="text-lede">An upcoming experience inside the Facilitator Support Program.</p>
            <p className="mt-4 text-muted">
              Details are being finalised by the FSP team. Register your interest and they will share them with you
              directly.
            </p>
            <div className="mt-8">
              <Button href={joinHref} size="lg">
                Register your interest
              </Button>
            </div>
          </>
        }
      />

      {/* Honest status panel. Replaced by real content once GTX material arrives. */}
      <section aria-labelledby="gtx-status-title" className="tone-navy">
        <div className="container-fsp py-16 md:py-24">
          <div className="grid-fsp items-end gap-y-8">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <h2 id="gtx-status-title" className="eyebrow text-orange">
                Status
              </h2>
              <p className="mt-8 text-[clamp(1.75rem,3.6vw,3rem)] font-semibold leading-[1.1] tracking-tight">
                FSP GTX is being prepared
                <span className="text-orange">.</span>
              </p>
              <p className="mt-6 max-w-xl text-on-dark-muted">
                Dates, format and everything else will be announced by the FSP team. Nothing is confirmed yet, so
                nothing is listed here.
              </p>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-line-dark">
                {["Dates", "Format", "Location", "Investment"].map((label) => (
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
        slots={imagesFor("fsp-gtx")}
        eyebrow="FSP GTX"
        headline={["A first", "look."]}
        pending="Images for FSP GTX will appear here once they are supplied."
      />

      {/* Awaiting source material: overview, curriculum, schedule, outcomes,
          registration details. Do not populate without approved content. */}

      <FinalCTA showBelief={false} />
    </>
  );
}
