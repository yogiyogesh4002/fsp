import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getExperience } from "@/data/community";
import { getProgram } from "@/data/programs";
import { JsonLd } from "@/components/ui/JsonLd";
import { ExperienceProgram } from "@/components/fsp/ExperienceProgram";

/**
 * FSP Wednesday Masterclass (FSP WM).
 *
 * Built entirely from the approved Wednesday Masterclass entry in
 * `data/community.ts`. The topic list is described there as topics that can be
 * covered — no schedule or session dates are claimed.
 */

const program = getProgram("fsp-wednesday-masterclass")!;
const experience = getExperience("wednesday-masterclass");

export const metadata: Metadata = pageMetadata({
  title: "FSP Wednesday Masterclass | Learn Something. Apply Something.",
  description: experience?.headline ?? program.summary,
  path: program.href,
});

export default function WednesdayMasterclassPage() {
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
        lines={["Wednesday", "Masterclass."]}
        galleryHeadline={["From the", "masterclasses."]}
        galleryPending="Photographs from the Wednesday Masterclass will appear here."
      />
    </>
  );
}
