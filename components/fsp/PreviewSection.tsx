import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  eyebrow: string;
  index?: string;
  headline: string[];
  body: string;
  /** Short supporting points. Kept brief — the full content lives on the page linked below. */
  points?: string[];
  href: string;
  cta: string;
  tone?: "paper" | "white" | "stone" | "navy" | "dark";
  children?: ReactNode;
};

const tones = {
  paper: "bg-paper",
  white: "bg-white",
  stone: "bg-stone",
  navy: "tone-navy",
  dark: "tone-dark",
};

/**
 * A homepage preview of a dedicated page: headline, a short paragraph, a few
 * pointers and a link through. Deliberately summary-only — the canonical
 * content stays on the page it links to.
 */
export function PreviewSection({ id, eyebrow, index, headline, body, points, href, cta, tone = "paper", children }: Props) {
  const dark = tone === "navy" || tone === "dark";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("section-pad", tones[tone])}>
      <div className="container-fsp">
        <div className="grid-fsp items-end gap-y-8">
          <SectionHeading
            id={`${id}-title`}
            eyebrow={eyebrow}
            index={index}
            lines={withStop(headline)}
            size="home"
            // col-span-8 rather than 7: the body column already starts at 9, so
            // this only claims the empty track between them. The extra width is
            // what lets a long single word like "Collaborate." hold hero size.
            className={cn("col-span-4 md:col-span-8 lg:col-span-8", dark && "[&_.eyebrow]:text-on-dark-muted")}
            style={{ ["--display-fit" as string]: 16 }}
          />
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p className={cn("text-lede", dark ? "text-on-dark-muted" : "text-muted")}>{body}</p>
            <Button href={href} className="mt-8" variant={dark ? "outline-light" : "primary"}>
              {cta}
            </Button>
          </div>
        </div>

        {points && points.length > 0 && (
          <ul className={cn("mt-14 flex flex-wrap gap-2 md:mt-20")}>
            {points.map((point) => (
              <li
                key={point}
                className={cn(
                  "border px-3.5 py-2 text-sm",
                  dark ? "border-line-dark text-on-dark-muted" : "border-line-strong",
                )}
              >
                {point}
              </li>
            ))}
          </ul>
        )}

        {children && <div className="mt-14 md:mt-20">{children}</div>}
      </div>
    </section>
  );
}
