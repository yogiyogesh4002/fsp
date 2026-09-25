"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { ecosystem } from "@/data/programs";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";

const items = ecosystem.items;
const RADIUS = 40; // % of the diagram box

function nodePosition(i: number) {
  const angle = (-90 + (360 / items.length) * i) * (Math.PI / 180);
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
}

/**
 * Explorable ecosystem map. Implemented as an accessible tab list: arrow keys
 * move between experiences, the panel shows the selected one. The orbital
 * diagram visualises how every experience connects back to FSP.
 */
export function Ecosystem() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = active;
    if (e.key in keys) next = (active + keys[e.key] + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="grid-fsp gap-y-12">
        {/* Diagram */}
        <div className="relative col-span-4 md:col-span-8 lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[36rem]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true" fill="none">
              <circle cx="50" cy="50" r={RADIUS} stroke="var(--fsp-border)" strokeWidth="0.25" />
              <circle cx="50" cy="50" r={RADIUS - 14} stroke="var(--fsp-border)" strokeWidth="0.2" strokeDasharray="0.6 1.2" />
              {items.map((item, i) => {
                const p = nodePosition(i);
                const on = i === active;
                return (
                  <line
                    key={item.id}
                    x1="50"
                    y1="50"
                    x2={p.x}
                    y2={p.y}
                    stroke={on ? "var(--fsp-orange)" : "var(--fsp-border)"}
                    strokeWidth={on ? 0.5 : 0.25}
                    className="transition-all duration-500"
                  />
                );
              })}
              {/* Arc from the previous to the active node shows the flow of the journey */}
              {items.map((item, i) => {
                const a = nodePosition(i);
                const b = nodePosition((i + 1) % items.length);
                return (
                  <path
                    key={`arc-${item.id}`}
                    d={`M ${a.x} ${a.y} A ${RADIUS} ${RADIUS} 0 0 1 ${b.x} ${b.y}`}
                    stroke={i < active ? "var(--fsp-navy)" : "transparent"}
                    strokeWidth="0.5"
                    className="transition-all duration-700"
                  />
                );
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 flex size-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-navy text-white">
              <span className="font-display text-[clamp(1.5rem,5vw,2.75rem)]">FSP</span>
              <span className="mt-1 hidden text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-orange sm:block">Ecosystem</span>
            </div>

            <div role="tablist" aria-label="FSP ecosystem" aria-orientation="horizontal" className="absolute inset-0">
              {items.map((item, i) => {
                const p = nodePosition(i);
                const on = i === active;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`${baseId}-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKeyDown}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    className={cn(
                      "group absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-semibold tabular-nums transition-all duration-500 ease-[var(--ease-out)] md:size-16 md:text-sm",
                      on
                        ? "scale-110 border-orange bg-orange text-ink"
                        : "border-line-strong bg-paper text-ink hover:border-navy",
                    )}
                  >
                    <span aria-hidden="true">{item.number}</span>
                    <span className="sr-only">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Panel */}
        <div className="col-span-4 flex flex-col justify-center md:col-span-8 lg:col-span-5 lg:col-start-8">
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className="relative min-h-[17rem] md:min-h-[19rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-[clamp(4.5rem,12vw,9rem)] text-navy">{current.number}</p>
                <h3 className="mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight">{current.title}</h3>
                <p className="mt-5 max-w-md text-lede text-muted">{current.description}</p>
                {/* The closing node is a concept rather than a page, so it
                    carries no link. */}
                {current.href && (
                  <Link
                    href={current.href}
                    className="group/l mt-8 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] underline-offset-[6px] hover:underline"
                  >
                    Explore {current.title}
                    <Arrow className="transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
                  </Link>
                )}
              </m.div>
            </AnimatePresence>
          </div>

          {/* Compact index for quick scanning (also a visual legend) */}
          <ol className="mt-10 grid grid-cols-2 gap-x-6 border-t border-line pt-6 sm:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex min-h-11 w-full items-baseline gap-2 py-1 text-left text-sm transition-colors",
                    i === active ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span className="text-[0.6875rem] font-semibold tabular-nums">{item.number}</span>
                  <span className="leading-snug">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </LazyMotion>
  );
}
