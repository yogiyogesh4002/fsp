import Image from "next/image";
import type { ImageSlot as Slot } from "@/data/media";
import { cn } from "@/lib/cn";

const ratios: Record<Slot["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
  flyer: "aspect-[2/3]",
};

type Props = {
  slot: Slot;
  className?: string;
  /** Passed to next/image so each slot requests an appropriately sized file. */
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
};

/**
 * One image position in an editorial layout.
 *
 * When the slot has an approved `src` it renders a responsive next/image.
 * Until then it reserves the same space and renders a clearly marked
 * placeholder, so an empty slot can never be mistaken for a real photograph
 * and the layout does not shift when the real image arrives.
 */
export function ImageSlot({ slot, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority, tone = "light" }: Props) {
  const dark = tone === "dark";

  if (slot.src) {
    return (
      <figure className={cn("relative", className)}>
        <div className={cn("relative w-full overflow-hidden bg-stone", ratios[slot.ratio])}>
          <Image
            src={slot.src}
            alt={slot.alt ?? ""}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </div>
        {slot.caption && (
          <figcaption className={cn("mt-3 text-sm", dark ? "text-on-dark-muted" : "text-muted")}>{slot.caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-end overflow-hidden border border-dashed p-5",
        ratios[slot.ratio],
        dark ? "border-line-dark bg-white/[0.03]" : "border-line-strong bg-stone",
        className,
      )}
      // Decorative until a real image is supplied; announcing "placeholder" to
      // screen readers adds nothing, so it is hidden from the accessibility tree.
      aria-hidden="true"
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.35]",
          dark ? "text-white" : "text-navy",
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 10px)",
          opacity: 0.06,
        }}
      />
      <span className="relative flex items-center gap-2.5">
        <span aria-hidden="true" className="inline-block size-1.5 shrink-0 bg-orange" />
        <span className={cn("eyebrow", dark ? "text-on-dark-muted" : "text-muted")}>{slot.label}</span>
      </span>
    </div>
  );
}
