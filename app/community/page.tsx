import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { joinHref } from "@/data/site";
import Link from "next/link";
import { community, getExperience } from "@/data/community";
import { Arrow } from "@/components/ui/Arrow";
import { challenges, getProgram } from "@/data/programs";
import { numbers } from "@/data/fsp";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CommunityBenefits } from "@/components/fsp/CommunityGrid";
import { FinalCTA } from "@/components/fsp/FinalCTA";

export const metadata: Metadata = pageMetadata({
  title: "FSP Community | Learn, Connect & Grow",
  description: `${community.description} ${community.close}`,
  path: "/community",
});

/**
 * Every community experience now owns a dedicated program page, so this page
 * links to them rather than repeating their content.
 */
const linkedExperiences = [
  { experienceId: "wednesday-masterclass", programId: "fsp-wednesday-masterclass" },
  { experienceId: "mastermind", programId: "fsp-mastermind" },
  { experienceId: "catalyst-connect", programId: "catalyst-connect" },
  { experienceId: "ttx", programId: "fsp-ttx" },
]
  .map(({ experienceId, programId }) => {
    const exp = getExperience(experienceId);
    const program = getProgram(programId);
    return exp && program
      ? { id: programId, href: program.href, eyebrow: program.statusLabel, name: exp.name, summary: exp.summary ?? exp.headline }
      : null;
  })
  .filter((x): x is NonNullable<typeof x> => x !== null);

export default function CommunityPage() {
  const members = numbers[0];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Community", path: "/community" }])} />
      <PageHero
        eyebrow="FSP Community"
        size="mega"
        lines={[community.headline[0], <>{community.headline[1].slice(0, -1)}<span key="s" className="text-orange">.</span></>]}
        aside={
          <>
            <p className="text-lede">{community.description}</p>
            <p className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-5xl text-navy">{members.display}</span>
              <span className="eyebrow text-muted">{members.label}</span>
            </p>
          </>
        }
      >
        <nav aria-label="Community experiences" className="flex flex-wrap gap-2 border-t border-line pt-6">
          {linkedExperiences.map((e) => (
            <a
              key={e.id}
              href={e.href}
              className="inline-flex min-h-11 items-center border border-line-strong px-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              {e.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <section aria-labelledby="inside-title" className="tone-navy section-pad">
        <div className="container-fsp">
          <SectionHeading
            id="inside-title"
            eyebrow="Inside the community"
            lines={["Learn from others.", "Share what you know.", <>Grow together<span key="s" className="text-orange">.</span></>]}
            size="headline"
            className="[&_.eyebrow]:text-on-dark-muted"
          />
          <CommunityBenefits className="mt-16 md:mt-24" />
        </div>
      </section>

      {/* Each experience owns a page — previewed here, not repeated. */}
      <section aria-labelledby="more-experiences-title" className="section-pad bg-white">
        <div className="container-fsp">
          <SectionHeading
            id="more-experiences-title"
            eyebrow="Community experiences"
            lines={["Where the", <>community meets<span key="s" className="text-orange">.</span></>]}
            size="headline"
          />
          <ul className="mt-14 grid gap-px bg-line md:mt-20 md:grid-cols-2">
            {linkedExperiences.map((exp) => (
              <li key={exp.id} data-reveal="cell" className="bg-white">
                <Link
                  href={exp.href}
                  className="group flex h-full min-h-60 flex-col justify-between gap-8 p-6 transition-colors duration-500 hover:bg-paper md:p-8"
                >
                  <span className="eyebrow text-muted">{exp.eyebrow}</span>
                  <span>
                    <span className="font-display block text-[clamp(2rem,4vw,3rem)]">{exp.name}</span>
                    <span className="mt-3 block text-muted">{exp.summary}</span>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                      Explore
                      <Arrow className="text-orange transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="challenges-title" className="section-pad bg-stone">
        <div className="container-fsp">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="challenges-title" eyebrow="FSP Challenges" lines={[challenges.headline]} size="headline" />
            <p className="eyebrow text-navy">{challenges.close}</p>
          </div>
          <ul className="mt-14 grid gap-px bg-line-strong md:grid-cols-3">
            {challenges.items.map((c, i) => (
              <li key={c.title} data-reveal="cell" style={{ ["--reveal-i" as string]: i }} className="flex flex-col bg-stone p-6 md:p-8">
                <span className="text-xs font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 text-muted">{c.description}</p>
                {c.href && (
                  <Button href={c.href} variant="text" className="mt-6 self-start">
                    Explore
                  </Button>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <Button href={joinHref} size="lg">Join FSP</Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
