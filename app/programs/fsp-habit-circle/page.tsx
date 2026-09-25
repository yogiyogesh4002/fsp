import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getProgram } from "@/data/programs";
import { JsonLd } from "@/components/ui/JsonLd";
import { PendingProgram } from "@/components/fsp/PendingProgram";

/**
 * FSP Habit Circle (FSP HC).
 *
 * No approved material for Habit Circle exists anywhere in the project. Note
 * that the "21-Day Habit Challenge" listed under `challenges` in
 * `data/programs.ts` is a separate, differently named item — it has NOT been
 * treated as Habit Circle content. Populate this page only from material the
 * FSP team supplies.
 */

const program = getProgram("fsp-habit-circle")!;

export const metadata: Metadata = pageMetadata({
  title: "FSP Habit Circle | Facilitator Support Program",
  description: program.summary,
  path: program.href,
});

export default function HabitCirclePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Programs", path: "/programs" },
          { name: program.name, path: program.href },
        ])}
      />
      <PendingProgram program={program} lines={["FSP Habit", "Circle."]} />
    </>
  );
}
