import type { CSSProperties } from "react";
import { finalCta } from "@/data/fsp";
import { cn } from "@/lib/cn";
import { joinHref, talkHref } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { TrajectoryLines } from "./TrajectoryLines";

type Props = {
  headline?: string[];
  showBelief?: boolean;
  /**
   * Set the closing headline at the homepage's hero display size. Opt-in, so
   * the twelve other pages that use this component keep their current size.
   */
  display?: boolean;
};

export function FinalCTA({ headline = finalCta.headline, showBelief = true, display = false }: Props) {
  const last = headline[headline.length - 1];
  const punct = /[.?!]$/.test(last) ? last.slice(-1) : "";
  const lines = [...headline.slice(0, -1), <>{punct ? last.slice(0, -1) : last}<span className="text-orange">{punct}</span></>];

  return (
    <section aria-labelledby="cta-title" className="tone-dark relative overflow-hidden">
      <TrajectoryLines className="pointer-events-none absolute -bottom-[10%] -left-[10%] h-[120%] w-[90%] text-white/10" />
      <div
        className={cn("container-fsp section-pad relative", display && "[container-type:inline-size]")}
        // "Ready to become" is a longer line than the hero's, so below lg the
        // fit bound takes over and the heading scales only as far as the
        // narrower container actually requires.
        style={display ? ({ ["--display-fit" as string]: 12.4 } as CSSProperties) : undefined}
      >
        <TextReveal
          id="cta-title"
          lines={lines}
          className={cn("font-display", display ? "text-home-display" : "text-display max-w-6xl")}
        />

        <div className="grid-fsp mt-14 gap-y-10 md:mt-20">
          <div className="col-span-4 space-y-3 text-lede text-on-dark-muted md:col-span-5 lg:col-span-5">
            {finalCta.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            {showBelief && <p className="pt-4 text-base">{finalCta.belief}</p>}
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="eyebrow mb-6 text-orange">{finalCta.close}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={joinHref} variant="accent" size="lg">
                {finalCta.cta.primary}
              </Button>
              <Button href={talkHref} variant="outline-light" size="lg" arrow={false}>
                {finalCta.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
