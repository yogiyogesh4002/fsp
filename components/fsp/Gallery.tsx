import type { ImageSlot as Slot } from "@/data/media";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type Props = {
  slots: Slot[];
  eyebrow: string;
  headline: string[];
  /** Shown when no image in the set has been supplied yet. */
  pending?: string;
  index?: string;
  className?: string;
  tone?: "light" | "dark";
};

/**
 * Editorial image gallery: one feature image with supporting images arranged
 * asymmetrically, rather than a uniform photo grid.
 *
 * Slots without an approved `src` render as placeholders, so the layout is
 * final before the photographs arrive and nothing shifts when they do.
 */
export function Gallery({ slots, eyebrow, headline, pending, index, className, tone = "light" }: Props) {
  if (slots.length === 0) return null;
  const [feature, ...rest] = slots;
  const anySupplied = slots.some((s) => s.src);
  const dark = tone === "dark";

  return (
    <section aria-labelledby="gallery-title" className={cn("section-pad", dark ? "tone-dark" : "bg-white", className)}>
      <div className="container-fsp">
        <SectionHeading
          id="gallery-title"
          eyebrow={eyebrow}
          index={index}
          lines={withStop(headline)}
          size="headline"
          className={cn(dark && "[&_.eyebrow]:text-on-dark-muted")}
        />

        {!anySupplied && pending && (
          <p className={cn("mt-8 max-w-xl text-lede", dark ? "text-on-dark-muted" : "text-muted")}>{pending}</p>
        )}

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          <ImageSlot
            slot={feature}
            tone={tone}
            priority={false}
            sizes="(min-width: 768px) 66vw, 100vw"
            className="md:col-span-8"
          />
          {rest[0] && (
            <ImageSlot
              slot={rest[0]}
              tone={tone}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="md:col-span-4"
            />
          )}
          {rest.slice(1).map((slot) => (
            <ImageSlot
              key={slot.id}
              slot={slot}
              tone={tone}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="md:col-span-4"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
