import { ecosystem } from "@/data/programs";
import { cn } from "@/lib/cn";

/** The core ecosystem progression, from Core Program to Continuous Growth. */
export function EcosystemFlow({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <ol
      className={cn(
        "grid gap-px sm:grid-cols-2 lg:grid-cols-7 sm:[&>li:last-child]:col-span-2 lg:[&>li:last-child]:col-span-1",
        dark ? "bg-line-dark" : "bg-line",
        className,
      )}
    >
      {ecosystem.flow.map((step, i) => {
        const last = i === ecosystem.flow.length - 1;
        return (
          <li
            key={step}
            data-reveal="cell"
            style={{ ["--reveal-i" as string]: i }}
            className={cn(
              "relative flex items-baseline gap-4 px-5 py-4 sm:min-h-36 sm:flex-col sm:items-stretch sm:justify-between sm:gap-6 sm:p-5 md:p-6 lg:p-4",
              dark ? "bg-ink" : "bg-paper",
              last && (dark ? "bg-orange! text-ink" : "bg-navy! text-white"),
            )}
          >
            <span className={cn("text-xs font-semibold tabular-nums", last ? "" : dark ? "text-on-dark-muted" : "text-muted")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* Seven tracks at lg leave ~100px per cell, which "Masterclasses"
                overflows at text-lg; the smaller step plus break-anywhere keeps
                every label inside its cell. */}
            <span className="text-lg font-semibold leading-tight tracking-tight [overflow-wrap:anywhere] lg:text-sm xl:text-base">{step}</span>
            {!last && (
              <span aria-hidden="true" className="absolute right-4 top-4 rotate-90 text-orange sm:top-5 sm:rotate-0">
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
