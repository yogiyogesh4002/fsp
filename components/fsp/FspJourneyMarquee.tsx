import { hero, journey } from "@/data/fsp";
import { Marquee } from "@/components/ui/Marquee";

/** LEARN, PRACTICE, CREATE, BUILD, CONNECT, GROW — the stages, from `data/fsp.ts`. */
const stages = journey.map((stage) => stage.title.toUpperCase());

/**
 * The FSP journey strip, used as a separator between major homepage sections.
 *
 * Same band the hero closes on: ink ground, the tagline in orange, then the six
 * journey stages scrolling past with orange sparks between them. Repeating it
 * down the page threads the FSP philosophy through the whole homepage.
 *
 * It is a visual transition, not content — the stages are stated properly in
 * the journey section — so the whole band is hidden from assistive technology
 * rather than announced once per separator. It holds nothing focusable, so
 * that cannot strand keyboard users.
 *
 * Motion is the shared CSS marquee: a duplicated track translated -50%, which
 * loops with no seam and stops under `prefers-reduced-motion` with the stages
 * still on screen. No JavaScript, no animation library.
 */
export function FspJourneyMarquee() {
  return (
    <div aria-hidden="true" className="tone-dark">
      {/* Padding is set against the measured band height: ~57px on mobile and
          ~76px from md, which keeps it a transition rather than a section. */}
      {/* pr-0 lets the moving track run to the viewport edge instead of
          stopping at the gutter, so the sequence reads as continuous. The
          tagline still starts on the normal content edge. */}
      <div className="container-fsp flex items-center gap-6 py-[1.125rem] pr-0! md:py-[1.375rem]">
        <p className="eyebrow hidden shrink-0 border-r border-line-dark pr-6 text-orange sm:block">
          {hero.tagline.join(" ")}
        </p>
        <Marquee
          items={stages}
          duration={38}
          className="font-display text-[1.5rem] text-on-dark sm:text-[1.75rem] md:text-[2.25rem]"
        />
      </div>
    </div>
  );
}
