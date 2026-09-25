import { founder } from "@/data/fsp";
import { founderImages } from "@/data/media";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Homepage founder section.
 *
 * Carries the full approved bio and the credentials list, rendered straight
 * from `founder` in `data/fsp.ts` — the same source the About FSP page reads,
 * so the two can never drift. Nothing here is written by hand.
 *
 * The portrait comes from `founder.photo`; the slot reserves the same space
 * and shows a marked placeholder if that is ever cleared.
 */
export function FounderPreview({ index }: { index?: string }) {
  const [portrait] = founderImages;
  const portraitSlot = {
    ...portrait,
    src: founder.photo ?? undefined,
    alt: founder.photo ? founder.name : undefined,
  };

  return (
    <section id="founder-preview" aria-labelledby="founder-preview-title" className="section-pad bg-white">
      <div className="container-fsp">
        <div className="grid-fsp items-end gap-y-8">
          <SectionHeading
            id="founder-preview-title"
            eyebrow="Meet the founder"
            index={index}
            lines={["Karunai", "Prakash"]}
            size="home"
            className="col-span-4 md:col-span-8 lg:col-span-8"
            style={{ ["--display-fit" as string]: 16 }}
          />
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <ul className="flex flex-wrap gap-2">
              {founder.roles.map((role) => (
                <li
                  key={role}
                  className="border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy"
                >
                  {role}
                </li>
              ))}
            </ul>
            <Button href="/about-fsp#founder" className="mt-8">
              More about the founder
            </Button>
          </div>
        </div>

        <div className="grid-fsp mt-14 items-start gap-y-12 md:mt-20">
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <ImageSlot slot={portraitSlot} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <div className="space-y-5 text-lede text-muted">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="eyebrow mb-4 text-muted">Credentials</h3>
              <ul className="border-t border-line">
                {founder.credentials.map((credential, i) => (
                  <li
                    key={credential}
                    data-reveal=""
                    style={{ ["--reveal-i" as string]: Math.min(i, 5) }}
                    className="flex gap-4 border-b border-line py-3.5 text-[0.95rem]"
                  >
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-orange" />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
