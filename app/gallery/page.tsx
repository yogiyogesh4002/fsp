import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { galleryCategories } from "@/data/media";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Arrow } from "@/components/ui/Arrow";
import { FinalCTA } from "@/components/fsp/FinalCTA";

/**
 * FSP Gallery.
 *
 * Every category is rendered whether or not images have been supplied, so the
 * structure is complete and stable. Empty categories show marked placeholders
 * and say plainly that images are still to come — no stock photography stands
 * in for FSP, and no photo is ever described that does not exist.
 */

export const metadata: Metadata = pageMetadata({
  title: "FSP Gallery | Programs, Events & Community",
  description:
    "Images from across the FSP ecosystem — the 30 Days Challenge, FSP TTX, FSP GTX, Mastermind, Catalyst Connect, Wednesday Masterclass, Habit Circle and Fun Day.",
  path: "/gallery",
});

export default function GalleryPage() {
  const total = galleryCategories.reduce((n, c) => n + c.images.filter((i) => i.src).length, 0);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Gallery", path: "/gallery" }])} />

      <PageHero
        eyebrow="FSP Gallery"
        lines={["FSP in", <>pictures<span key="s" className="text-orange">.</span></>]}
        aside={
          <p className="text-lede">
            {total > 0
              ? "Images from across the FSP ecosystem."
              : "Images from across the FSP ecosystem will be published here as they are supplied."}
          </p>
        }
      >
        <nav aria-label="Gallery categories" className="flex flex-wrap gap-2 border-t border-line pt-6">
          {galleryCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="inline-flex min-h-11 items-center border border-line-strong px-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              {category.label}
            </a>
          ))}
        </nav>
      </PageHero>

      {galleryCategories.map((category, index) => {
        const supplied = category.images.filter((image) => image.src);
        const shown = supplied.length > 0 ? supplied : category.images;
        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-title`}
            className={index % 2 === 0 ? "section-pad bg-paper" : "section-pad bg-white"}
          >
            <div className="container-fsp">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow mb-4 flex items-center gap-3 text-muted">
                    <span className="font-display text-4xl text-navy">{String(index + 1).padStart(2, "0")}</span>
                    <span>{supplied.length > 0 ? `${supplied.length} image${supplied.length > 1 ? "s" : ""}` : "Awaiting images"}</span>
                  </p>
                  <h2 id={`${category.id}-title`} className="font-display text-[clamp(2rem,4.4vw,3.5rem)]">
                    {category.label}
                  </h2>
                </div>
                {category.href && (
                  <Link
                    href={category.href}
                    className="group/link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy"
                  >
                    Visit page
                    <Arrow className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                )}
              </div>

              {supplied.length === 0 && (
                <p className="mt-6 max-w-xl text-muted">
                  Photographs for {category.label} will appear here once they are supplied.
                </p>
              )}

              {/* Flyers are tall 2:3 artwork, so they sit four-up rather than
                  taking the wide feature position a photograph would. */}
              <div className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-12 md:gap-5">
                {shown.map((image, i) => (
                  <ImageSlot
                    key={image.id}
                    slot={image}
                    sizes={
                      image.ratio === "flyer"
                        ? "(min-width: 768px) 23vw, 50vw"
                        : i === 0
                          ? "(min-width: 768px) 66vw, 100vw"
                          : "(min-width: 768px) 33vw, 100vw"
                    }
                    className={
                      image.ratio === "flyer"
                        ? "col-span-1 md:col-span-3"
                        : i === 0
                          ? "col-span-2 md:col-span-8"
                          : "col-span-2 md:col-span-4"
                    }
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <FinalCTA showBelief={false} />
    </>
  );
}
