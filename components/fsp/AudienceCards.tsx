import { audiences } from "@/data/fsp";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * "Who is FSP for?" as oversized editorial rows rather than cards.
 * Rows alternate alignment to build an asymmetric rhythm on desktop.
 */
export function AudienceCards() {
  return (
    <ul className="border-t border-line">
      {audiences.map((audience, i) => (
        <ScrollReveal
          as="li"
          key={audience.title}
          index={0}
          className="group relative border-b border-line"
        >
          <div className="grid-fsp items-baseline gap-y-3 py-7 md:py-10">
            <span className="col-span-1 text-sm font-semibold tabular-nums text-muted md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              // 1.75rem floor: 2.25rem no longer fits "Professionals" inside the
              // 3-column track on a 320px screen.
              className={`font-display col-span-3 text-[clamp(1.75rem,7.4vw,6.5rem)] transition-colors duration-500 group-hover:text-navy md:col-span-7 lg:col-span-7 ${i % 2 ? "lg:col-start-3" : "lg:col-start-2"}`}
            >
              {audience.title}
            </h3>
            <p className={`col-span-3 col-start-2 max-w-sm text-muted md:col-span-5 md:col-start-2 lg:col-span-3 lg:self-center ${i % 2 ? "lg:col-start-10" : "lg:col-start-10"}`}>
              {audience.description}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100"
          />
        </ScrollReveal>
      ))}
    </ul>
  );
}
