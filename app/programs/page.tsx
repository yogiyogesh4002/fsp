import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { programs } from "@/data/programs";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { MainProgramCards } from "@/components/fsp/MainProgramCards";
import { FinalCTA } from "@/components/fsp/FinalCTA";

export const metadata: Metadata = pageMetadata({
  title: "FSP Programs | The Full FSP Program Ecosystem",
  description:
    "All eight FSP programs: the 30 Days Challenge, FSP TTX, FSP GTX, FSP Mastermind, Wednesday Masterclass, Catalyst Connect, Habit Circle and Fun Day.",
  path: "/programs",
});

export default function ProgramsPage() {
  const pending = programs.filter((p) => !p.hasContent);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Programs", path: "/programs" }])} />
      <PageHero
        eyebrow="FSP Programs"
        lines={["The FSP", <>ecosystem<span key="s" className="text-orange">.</span></>]}
        aside={
          <p className="text-lede">
            Eight ways to build your facilitation practice — from a daily challenge to residential experiences and
            recurring community sessions.
          </p>
        }
      />

      <section aria-labelledby="all-programs-title" className="bg-paper pb-24 md:pb-36">
        <div className="container-fsp">
          <h2 id="all-programs-title" className="eyebrow mb-6 text-muted">
            All programs
          </h2>
          <MainProgramCards items={programs} columns={4} />

          {pending.length > 0 && (
            <p className="mt-10 max-w-2xl text-sm text-muted">
              Full details for {pending.map((p) => p.name).join(", ")} are shared directly by the FSP team.
            </p>
          )}
        </div>
      </section>

      <FinalCTA showBelief={false} />
    </>
  );
}
