import type { Module } from "@/data/programs";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { cn } from "@/lib/cn";

const tones = [
  "bg-white text-ink",
  "bg-navy text-white",
  "bg-ink text-white",
];

/**
 * Home page module overview: three panels offset upward like a rising path
 * (echoing the logo's trajectory). Stacks on smaller screens.
 */
export function ProgramCards({ modules }: { modules: Module[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-3 md:items-end md:gap-5">
      {modules.map((mod, i) => (
        <ScrollReveal
          as="li"
          key={mod.number}
          index={i}
          className={cn("flex flex-col p-6 md:p-8", tones[i % tones.length])}
          style={{ ["--lift" as string]: `${i * 5}rem` }}
        >
          <div className="md:mb-[var(--lift)] md:min-h-[30rem] flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-4">
              <p className={cn("eyebrow", i === 0 ? "text-muted" : "text-on-dark-muted")}>{mod.label}</p>
              <p className={cn("font-display text-[clamp(4rem,8vw,7.5rem)] leading-[0.75]", i === 0 ? "text-navy" : "text-orange")}>
                {mod.number}
              </p>
            </div>
            {/* break-anywhere is the backstop for long single words such as
                "Opportunities", which overflowed the card at tablet width. */}
            <h3 className="mt-10 text-[clamp(1.625rem,2.6vw,2.375rem)] font-semibold leading-[1.02] tracking-tight [overflow-wrap:anywhere] md:mt-auto md:pt-16">
              {mod.title}
            </h3>
            <ul className={cn("mt-6 flex flex-wrap gap-x-1 text-sm leading-relaxed", i === 0 ? "text-muted" : "text-on-dark-muted")}>
              {mod.topics.map((topic, t) => (
                <li key={topic}>
                  {topic}
                  {t < mod.topics.length - 1 && <span aria-hidden="true" className="px-1.5 text-orange">/</span>}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </ol>
  );
}
