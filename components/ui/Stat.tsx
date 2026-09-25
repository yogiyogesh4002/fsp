"use client";

import { useEffect, useRef, useState } from "react";
import type { StatItem } from "@/data/fsp";
import { cn } from "@/lib/cn";

/**
 * Large typographic statistic. Server HTML carries the final value; numeric
 * values count up once when scrolled into view (skipped for reduced motion).
 */
export function Stat({ item, className }: { item: StatItem; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || item.value === null || item.value < 10) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = item.value;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setCurrent(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
          else setCurrent(null);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [item.value]);

  const text = current === null ? item.display : `${item.prefix ?? ""}${current}${item.suffix ?? ""}`;
  const isWords = item.value === null;

  return (
    <div className={cn("flex flex-col", className)}>
      <p
        ref={ref}
        // Word statistics ("India + International") sit in a third of the grid,
        // so they scale more slowly than numeric ones to stay inside the cell.
        className={cn("font-display tabular-nums", isWords ? "text-[clamp(1.75rem,3.4vw,3.5rem)]" : "whitespace-nowrap text-[clamp(3.5rem,7.4vw,7.5rem)]")}
      >
        <span className="sr-only">{item.display}</span>
        <span aria-hidden="true">{text}</span>
      </p>
      <p className="mt-4 max-w-[18rem] text-sm leading-snug text-muted md:text-base">{item.label}</p>
    </div>
  );
}
