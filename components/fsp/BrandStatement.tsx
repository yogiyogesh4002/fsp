"use client";

import { useRef } from "react";
import { journey } from "@/data/fsp";
import { ANY_MOTION, DESKTOP_MOTION, useScrollScene } from "@/components/motion/useScrollScene";

/**
 * The signature brand moment: the six journey stages converge into
 * LEARN. LEAD. IMPACT. Scroll-scrubbed with GSAP; static without it.
 */
export function BrandStatement() {
  const ref = useRef<HTMLElement>(null);

  useScrollScene(ref, (mm, { gsap }, root) => {
    const stages = root.querySelectorAll<HTMLElement>("[data-brand-stage]");
    const words = root.querySelectorAll<HTMLElement>("[data-brand-word]");

    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%", end: "center 45%", scrub: 0.6 },
      });
      tl.fromTo(stages, { x: 40, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, ease: "power2.out" }, 0)
        .fromTo(words, { yPercent: 60, opacity: 0, scale: 0.92 }, { yPercent: 0, opacity: 1, scale: 1, stagger: 0.18, ease: "power3.out" }, 0.15);
    });

    mm.add(`${ANY_MOTION} and (max-width: 1023px)`, () => {
      gsap.fromTo(
        words,
        { xPercent: -8, opacity: 0 },
        { xPercent: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root, start: "top 70%" } },
      );
    });
  });

  return (
    <section ref={ref} aria-labelledby="brand-title" className="tone-navy relative overflow-hidden">
      {/* query container for text-home-display */}
      <div className="container-fsp relative py-24 md:py-36 [container-type:inline-size]">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 md:gap-x-5" aria-label="The FSP journey">
          {journey.map((stage, i) => (
            <li key={stage.key} data-brand-stage className="eyebrow flex items-center gap-3 text-on-dark-muted md:gap-5">
              {stage.title}
              {i < journey.length - 1 && <span aria-hidden="true" className="text-orange">→</span>}
            </li>
          ))}
        </ol>

        {/* Hero size. Single words, so the fit bound never binds. */}
        <h2
          id="brand-title"
          className="font-display mt-12 text-home-display leading-[0.82] md:mt-16"
          style={{ ["--display-fit" as string]: 25 }}
        >
          <span data-brand-word className="block origin-left">Learn<span className="text-orange">.</span></span>
          <span data-brand-word className="block origin-left md:pl-[18%]">Lead<span className="text-orange">.</span></span>
          <span data-brand-word className="block origin-left md:pl-[8%]">Impact<span className="text-orange">.</span></span>
        </h2>

        <p className="mt-12 max-w-md text-lede text-on-dark-muted md:ml-auto md:mt-4 md:text-right">
          FSP is not just a course for trainers. It is a growth ecosystem for facilitators.
        </p>
      </div>
    </section>
  );
}
