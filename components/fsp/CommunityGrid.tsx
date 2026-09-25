import { community } from "@/data/community";
import { cn } from "@/lib/cn";

/** Community benefits as a large typographic run of words. */
export function CommunityBenefits({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1 md:gap-x-5", className)}>
      {community.benefits.map((benefit, i) => (
        <li
          key={benefit}
          data-reveal="fade"
          style={{ ["--reveal-i" as string]: i }}
          className="flex items-baseline gap-3 md:gap-5"
        >
          <span
            className={cn(
              "font-display text-[clamp(2rem,5.6vw,5.25rem)]",
              i % 3 === 1 ? (tone === "dark" ? "text-on-dark-muted" : "text-muted") : "",
            )}
          >
            {benefit}
          </span>
          {i < community.benefits.length - 1 && (
            <span aria-hidden="true" className="text-[clamp(1rem,2vw,1.75rem)] text-orange">
              ✦
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
