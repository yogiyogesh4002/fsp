"use client";

import { useRef } from "react";
import { thirtyDays } from "@/data/programs";
import { cn } from "@/lib/cn";
import { ANY_MOTION, useScrollScene } from "@/components/motion/useScrollScene";

type Props = { variant?: "home" | "page"; className?: string };

/**
 * 30 DAYS / 30 TASKS / 1 BETTER FACILITATOR with a 30-cell journey grid.
 * With motion: the big number counts up and the cells fill as you scroll.
 * Cells are day markers only — individual tasks are intentionally not named.
 */
export function ChallengeCounter({ variant = "home", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const days = Array.from({ length: thirtyDays.totalDays }, (_, i) => i + 1);

  useScrollScene(ref, (mm, { gsap }, root) => {
    mm.add(ANY_MOTION, () => {
      const num = root.querySelector<HTMLElement>("[data-count]");
      const cells = gsap.utils.toArray<HTMLElement>("[data-day]", root);
      const grid = root.querySelector<HTMLElement>("[data-day-grid]");
      if (!num || !grid) return;
      const counter = { v: 0 };
      gsap.set(cells, { backgroundColor: "rgba(255,255,255,0.06)", color: "#a9afbe" });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: grid, start: "top 80%", end: variant === "page" ? "bottom 40%" : "bottom 55%", scrub: 0.5 },
      });
      tl.to(counter, {
        v: 30,
        ease: "none",
        duration: 1,
        onUpdate: () => {
          num.textContent = String(Math.round(counter.v)).padStart(2, "0");
        },
      }, 0).to(
        cells,
        { backgroundColor: "#fba81c", color: "#10131c", stagger: 1 / cells.length, duration: 1 / cells.length, ease: "none" },
        0,
      );
    });
  });

  return (
    <div ref={ref} className={cn("grid-fsp gap-y-14", className)}>
      <div className="col-span-4 md:col-span-8 lg:col-span-6">
        <p className="font-display text-[clamp(10rem,42vw,26rem)] leading-[0.74] text-orange" aria-hidden="true">
          <span data-count>30</span>
        </p>
        <dl className="mt-10 grid grid-cols-3 border-t border-line-dark">
          {[
            ["30", "Days"],
            ["30", "Tasks"],
            ["1", "Better facilitator"],
          ].map(([n, label]) => (
            <div key={label} className="border-r border-line-dark py-5 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4">
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="font-display block text-[clamp(2.5rem,6vw,4.5rem)]">{n}</span>
                <span className="eyebrow mt-2 block text-[0.625rem] tracking-[0.08em] text-on-dark-muted [overflow-wrap:anywhere] sm:text-xs sm:tracking-[0.16em]">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:self-end">
        <p className="eyebrow mb-5 text-on-dark-muted">{thirtyDays.daily.label}</p>
        <ul className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold tracking-tight">
          {thirtyDays.daily.items.map((item, i) => (
            <li key={item} className="flex items-center gap-4">
              {item}
              {i < thirtyDays.daily.items.length - 1 && <span aria-hidden="true" className="h-6 w-px bg-line-dark" />}
            </li>
          ))}
        </ul>
        <ol data-day-grid aria-label="30-day journey" className="grid grid-cols-6 gap-1.5 sm:grid-cols-10 lg:grid-cols-6">
          {days.map((d) => (
            <li
              key={d}
              data-day
              className="flex aspect-square flex-col justify-between bg-orange p-1.5 text-ink md:p-2"
            >
              <span className="sr-only">Day {d}</span>
              <span aria-hidden="true" className="text-[0.5625rem] font-semibold uppercase tracking-wider opacity-70">Day</span>
              <span aria-hidden="true" className="self-end text-sm font-semibold tabular-nums md:text-base">
                {String(d).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
