import type { CSSProperties, ReactNode } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  index?: string;
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  size?: "mega" | "home" | "display" | "headline";
  className?: string;
  headingClassName?: string;
  id?: string;
  /** Sets --display-fit for the "home" size. */
  style?: CSSProperties;
};

/** "home" is the homepage step that matches the hero headline's size. */
const sizes = {
  mega: "text-mega",
  home: "text-home-display",
  display: "text-display",
  headline: "text-headline",
};

/** Eyebrow + oversized condensed display headline. */
export function SectionHeading({ eyebrow, index, lines, as = "h2", size = "display", className, headingClassName, id, style }: Props) {
  return (
    // text-home-display sizes itself against this box, so it becomes the
    // query container. No effect on layout or on the other sizes.
    <div className={cn(className, size === "home" && "[container-type:inline-size]")} style={style}>
      {eyebrow && <Eyebrow index={index} className="mb-6 md:mb-8">{eyebrow}</Eyebrow>}
      <TextReveal id={id} as={as} lines={lines} className={cn("font-display", sizes[size], headingClassName)} />
    </div>
  );
}

/** Adds an orange full stop to the last line of a headline. */
export function withStop(lines: string[]): ReactNode[] {
  return lines.map((line, i) => {
    if (i !== lines.length - 1) return line;
    const match = line.match(/^(.*?)([.?!])$/);
    if (!match) return line;
    return (
      <>
        {match[1]}
        <span className="text-orange">{match[2]}</span>
      </>
    );
  });
}
