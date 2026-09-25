import Image from "next/image";
import { flyerAlt, mastermindSessions, mastermindSessionsCopy } from "@/data/mastermind";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";

/**
 * FSP Mastermind session flyers.
 *
 * Four supplied flyers shown as a four-up set, each with the details printed on
 * it repeated as real text — so the session title, date, timing and speakers are
 * readable, searchable and available to a screen reader, not locked inside an
 * image. Everything comes from `data/mastermind.ts`; nothing is written here.
 *
 * The flyer itself links to the full-size file for anyone who wants to read the
 * artwork.
 */
export function MastermindSessions() {
  const { eyebrow, headline, format, lead } = mastermindSessionsCopy;
  if (mastermindSessions.length === 0) return null;

  return (
    <section id="sessions" aria-labelledby="sessions-title" className="section-pad bg-paper">
      <div className="container-fsp">
        <div className="grid-fsp items-end gap-y-8">
          <SectionHeading
            id="sessions-title"
            eyebrow={eyebrow}
            lines={withStop(headline)}
            size="headline"
            className="col-span-4 md:col-span-8 lg:col-span-6"
          />
          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-orange">{format}</p>
            <p className="mt-4 text-lede text-muted">{lead}</p>
          </div>
        </div>

        {/* Subgrid keeps the seven bands of every card on the same lines, so the
            dates, speakers and hosts read straight across the four flyers. */}
        <ol className="mt-14 grid gap-x-5 gap-y-14 sm:grid-cols-2 sm:gap-y-0 md:mt-20 lg:grid-cols-4">
          {mastermindSessions.map((session, i) => (
            <li
              key={session.id}
              data-reveal=""
              style={{ ["--reveal-i" as string]: i % 4 }}
              className="sm:row-span-7 sm:grid sm:grid-rows-subgrid"
            >
              <a
                href={session.flyer}
                target="_blank"
                rel="noreferrer"
                className="group/flyer block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                <span className="relative block aspect-[2/3] w-full overflow-hidden border border-line bg-stone">
                  <Image
                    src={session.flyer}
                    alt={flyerAlt(session)}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover/flyer:scale-[1.03]"
                  />
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted transition-colors group-hover/flyer:text-navy">
                  View full flyer
                  <Arrow className="transition-transform duration-300 group-hover/flyer:-translate-y-0.5 group-hover/flyer:translate-x-0.5" />
                </span>
              </a>

              <p className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em]">
                <span className="bg-navy px-2 py-1 text-white">{session.badge}</span>
                {session.episode && (
                  <span className="border border-line-strong px-2 py-1 text-navy">{session.episode}</span>
                )}
              </p>

              <h3 className="mt-3 text-[clamp(1.0625rem,1.35vw,1.25rem)] font-semibold leading-snug tracking-tight">
                {session.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{session.subtitle}</p>

              <dl className="mt-5 border-t border-line text-sm">
                <div className="flex gap-3 border-b border-line py-2.5">
                  <dt className="w-14 shrink-0 text-muted">Date</dt>
                  <dd>
                    <time dateTime={session.date}>{session.dateLabel}</time>
                  </dd>
                </div>
                <div className="flex gap-3 border-b border-line py-2.5">
                  <dt className="w-14 shrink-0 text-muted">Time</dt>
                  <dd>{session.time}</dd>
                </div>
                <div className="flex gap-3 border-b border-line py-2.5">
                  <dt className="w-14 shrink-0 text-muted">Where</dt>
                  <dd>{session.platform}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <p className="eyebrow text-muted">In the hot seat</p>
                <ul className="mt-3 space-y-3">
                  {session.hotSeat.map((speaker) => (
                    <li key={speaker.name} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-orange" />
                      <span>
                        <span className="block text-sm font-semibold leading-snug">{speaker.name}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted">{speaker.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 sm:pb-14 lg:pb-0">
                <p className="eyebrow text-muted">Hosted by</p>
                <p className="mt-3 text-sm font-semibold leading-snug">{session.host.name}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{session.host.role}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
