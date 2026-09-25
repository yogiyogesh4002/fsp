import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getExperience } from "@/data/community";
import { getProgram } from "@/data/programs";
import { imagesFor } from "@/data/media";
import { JsonLd } from "@/components/ui/JsonLd";
import { ExperienceProgram } from "@/components/fsp/ExperienceProgram";
import { MastermindSessions } from "@/components/fsp/MastermindSessions";

/**
 * FSP Mastermind (FSP MM).
 *
 * Built from the approved Mastermind entry in `data/community.ts` and the
 * session flyers supplied by the FSP team (`data/mastermind.ts`).
 *
 * The flyers have their own section, so the gallery below keeps only the
 * photograph slots — it is still waiting on session photographs.
 */

const program = getProgram("fsp-mastermind")!;
const experience = getExperience("mastermind");

export const metadata: Metadata = pageMetadata({
  title: "FSP Mastermind | Conversations That Make You Think Differently",
  description: experience?.summary ?? program.summary,
  path: program.href,
});

export default function MastermindPage() {
  if (!experience) return null;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: program.name, path: program.href },
        ])}
      />
      <ExperienceProgram
        program={program}
        experience={experience}
        lines={["FSP", "Mastermind."]}
        galleryHeadline={["From the", "sessions."]}
        galleryPending="Photographs from FSP Mastermind sessions will appear here."
        sessions={<MastermindSessions />}
        gallerySlots={imagesFor(program.id).filter((slot) => slot.ratio !== "flyer")}
      />
    </>
  );
}
