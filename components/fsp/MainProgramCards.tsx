import Link from "next/link";
import { featuredPrograms, type FspProgram } from "@/data/programs";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";

const statusTone: Record<FspProgram["status"], string> = {
  practical: "bg-navy text-white",
  residential: "bg-orange text-ink",
  recurring: "bg-stone text-ink",
  upcoming: "border border-line-strong text-muted",
  pending: "border border-line-strong text-muted",
};

type Props = {
  tone?: "light" | "dark";
  /** Defaults to the homepage's featured three; the programs hub passes all eight. */
  items?: FspProgram[];
  columns?: 2 | 3 | 4;
};

/**
 * FSP programs as preview cards.
 *
 * Cards carry a one-line summary and link to the dedicated program page — the
 * full program content lives there, not here.
 */
export function MainProgramCards({ tone = "light", items = featuredPrograms, columns = 3 }: Props) {
  const dark = tone === "dark";
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={cn("grid gap-px", cols, dark ? "bg-line-dark" : "bg-line")}>
      {items.map((program, i) => (
        <li
          key={program.id}
          data-reveal="cell"
          style={{ ["--reveal-i" as string]: i }}
          className={dark ? "bg-ink" : "bg-paper"}
        >
          <Link
            href={program.href}
            className={cn(
              "group flex h-full min-h-72 flex-col justify-between gap-10 p-6 transition-colors duration-500 md:p-8",
              dark ? "hover:bg-white/[0.04]" : "hover:bg-white",
            )}
          >
            <span className="flex items-start justify-between gap-4">
              <span className={cn("text-xs font-semibold tabular-nums", dark ? "text-on-dark-muted" : "text-muted")}>
                {program.number}
              </span>
              <span
                className={cn(
                  "px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em]",
                  statusTone[program.status],
                )}
              >
                {program.statusLabel}
              </span>
            </span>

            <span>
              {/* Four-up cells are ~190px wide at lg, which long names such as
                  "FSP Wednesday Masterclass" overflow at the 3-up size. */}
              <span
                className={cn(
                  "font-display block [overflow-wrap:anywhere]",
                  columns === 4
                    ? "text-[clamp(1.5rem,2.2vw,2rem)]"
                    : "text-[clamp(1.875rem,3.4vw,2.75rem)]",
                )}
              >
                {program.name}
              </span>
              <span className={cn("mt-4 block text-[0.975rem] leading-relaxed", dark ? "text-on-dark-muted" : "text-muted")}>
                {program.summary}
              </span>
              <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                Explore
                <Arrow className="text-orange transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
