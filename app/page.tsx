import type { Metadata } from "next";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import { site } from "@/data/site";
import { founder, whatIsFsp } from "@/data/fsp";
import { community } from "@/data/community";
import { resourcesCopy } from "@/data/resources";
import { Hero } from "@/components/fsp/Hero";
import { BrandStatement } from "@/components/fsp/BrandStatement";
import { FspJourneyMarquee } from "@/components/fsp/FspJourneyMarquee";
import { Journey } from "@/components/fsp/Journey";
import { Ecosystem } from "@/components/fsp/Ecosystem";
import { MainProgramCards } from "@/components/fsp/MainProgramCards";
import { PreviewSection } from "@/components/fsp/PreviewSection";
import { FounderPreview } from "@/components/fsp/FounderPreview";
import { NumbersSection } from "@/components/fsp/NumbersSection";
import { FinalCTA } from "@/components/fsp/FinalCTA";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";

/**
 * Homepage.
 *
 * A concise introduction to FSP, not a copy of the whole site. Each block is a
 * short preview that links to the page which owns that content — About FSP,
 * the three program pages, Community, Catalyst Connect and Resources.
 *
 * Two blocks are not previews: the six-stage journey, which is what makes FSP
 * "more than a course", and the ecosystem map, which shows how the parts
 * connect and closes on Continuous Growth. The audience list, the numbers
 * detail and the transformation examples all live on /about-fsp.
 */

export const metadata: Metadata = pageMetadata({
  title: "Facilitator Support Program | Learn. Lead. Impact.",
  description: site.description,
  path: "/",
});

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  description: site.description,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/brand/fsp-logo.png"),
  founder: { "@type": "Person", name: founder.name, jobTitle: founder.roles.join(", ") },
};

/**
 * Homepage line breaks for the major headings.
 *
 * Same wording as the shared copy — these only control where the lines break.
 * At hero size a line can hold roughly the width of "facilitator.", so the
 * longer headings are set over three short lines instead of two long ones.
 * That keeps them at the hero's size rather than shrinking them to fit, and it
 * leaves the copy in `data/` untouched for the pages that also use it.
 */
const resourcesHeadline = resourcesCopy.headline.split(" ");
const communityHeadline = ["You don't", "have to", "grow alone."];
const ecosystemEyebrow = "The FSP ecosystem";
const ecosystemHeadline = ["One ecosystem.", "Multiple growth", "experiences."];
const catalystHeadline = ["Connect.", "Learn.", "Collaborate."];
const finalCtaHeadline = ["Ready to become", "a better", "facilitator?"];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd} />

      <Hero />

      {/* 01 — What FSP is, in short, and the six-stage journey it describes.
          The journey belongs to this section rather than standing alone: it is
          what makes FSP "more than a course". Full story on /about-fsp. */}
      <PreviewSection
        id="what-is-fsp"
        eyebrow={whatIsFsp.eyebrow}
        index="01"
        headline={whatIsFsp.headline}
        body={whatIsFsp.body}
        href="/about-fsp"
        cta="About FSP"
        tone="paper"
      >
        <p className="eyebrow mb-10 text-muted md:mb-14">The FSP journey</p>
        <Journey />
      </PreviewSection>

      <BrandStatement />

      <FspJourneyMarquee />

      {/* 02 — The three main programs. */}
      <section aria-labelledby="programs-title" className="section-pad bg-paper">
        <div className="container-fsp">
          <div className="grid-fsp items-end gap-y-8">
            <SectionHeading
              id="programs-title"
              eyebrow="FSP Programs"
              index="02"
              lines={withStop(["Three ways", "to grow."])}
              size="home"
              className="col-span-4 md:col-span-8 lg:col-span-8"
              style={{ ["--display-fit" as string]: 16 }}
            />
            <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
              <p className="text-lede text-muted">
                Each program is a different way to build your facilitation practice.
              </p>
              <Button href="/programs" className="mt-8" variant="text">
                All programs
              </Button>
            </div>
          </div>
          <div className="mt-14 md:mt-20">
            <MainProgramCards />
          </div>
        </div>
      </section>

      <FspJourneyMarquee />

      {/* 03 — The ecosystem, as an explorable map rather than a card grid.
          Ends on Continuous Growth, the closing idea of the FSP progression. */}
      <section aria-labelledby="ecosystem-title" className="section-pad bg-white">
        <div className="container-fsp">
          <SectionHeading
            id="ecosystem-title"
            eyebrow={ecosystemEyebrow}
            index="03"
            lines={withStop(ecosystemHeadline)}
            size="home"
            style={{ ["--display-fit" as string]: 16 }}
          />
          <div className="mt-14 md:mt-20">
            <Ecosystem />
          </div>
        </div>
      </section>

      <FspJourneyMarquee />

      {/* 04 — Community preview. Full content on /community. */}
      <PreviewSection
        id="community-preview"
        eyebrow="FSP Community"
        index="04"
        headline={communityHeadline}
        body={community.description}
        points={community.benefits.slice(0, 6)}
        href="/community"
        cta="Explore the community"
        tone="navy"
      />

      <FspJourneyMarquee />

      {/* 05 — Catalyst Connect preview. Full content on /events/catalyst-connect. */}
      <PreviewSection
        id="catalyst-preview"
        eyebrow="FSP Catalyst Connect"
        index="05"
        headline={catalystHeadline}
        body="A community experience designed to bring FSP members together beyond the virtual environment."
        href="/events/catalyst-connect"
        cta="Catalyst Connect"
        tone="white"
      />

      <FspJourneyMarquee />

      {/* 06 — Resources preview. Full library on /resources. */}
      <PreviewSection
        id="resources-preview"
        eyebrow="FSP Resources"
        index="06"
        headline={resourcesHeadline}
        body={resourcesCopy.intro}
        href="/resources"
        cta="Browse resources"
        tone="stone"
      />

      <FspJourneyMarquee />

      {/* 07 — Founder preview. Full bio, credentials and vision on /about-fsp. */}
      <FounderPreview index="07" />

      <FspJourneyMarquee />

      <NumbersSection index="08" />

      <FinalCTA headline={finalCtaHeadline} display />
    </>
  );
}
