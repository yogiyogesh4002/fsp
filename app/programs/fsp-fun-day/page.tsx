import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getProgram } from "@/data/programs";
import { JsonLd } from "@/components/ui/JsonLd";
import { PendingProgram } from "@/components/fsp/PendingProgram";

/**
 * FSP Fun Day (FSP FD).
 *
 * No approved material for Fun Day exists anywhere in the project — not in the
 * data files and not in the approved content source. Populate this page only
 * from material the FSP team supplies.
 */

const program = getProgram("fsp-fun-day")!;

export const metadata: Metadata = pageMetadata({
  title: "FSP Fun Day | Facilitator Support Program",
  description: program.summary,
  path: program.href,
});

export default function FunDayPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: program.name, path: program.href },
        ])}
      />
      <PendingProgram program={program} lines={["FSP Fun", "Day."]} />
    </>
  );
}
