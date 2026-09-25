import Image from "next/image";
import { team, teamCopy } from "@/data/media";
import { SectionHeading, withStop } from "@/components/ui/SectionHeading";

/**
 * Our Team.
 *
 * Renders only members present in `data/media.ts`. No names, roles, biographies
 * or photographs are invented: while the list is empty the section states that
 * details are still to be confirmed rather than showing placeholder people.
 */
export function TeamSection({ index }: { index?: string }) {
  return (
    <section aria-labelledby="team-title" className="section-pad bg-paper">
      <div className="container-fsp">
        <SectionHeading
          id="team-title"
          eyebrow={teamCopy.eyebrow}
          index={index}
          lines={withStop(teamCopy.headline)}
          size="headline"
        />

        {team.length === 0 ? (
          <p className="mt-8 max-w-xl text-lede text-muted">{teamCopy.pending}</p>
        ) : (
          <ul className="mt-14 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
            {team.map((member, i) => (
              <li key={member.id} data-reveal="cell" style={{ ["--reveal-i" as string]: i % 3 }} className="bg-paper p-6 md:p-8">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name ?? ""}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-end border border-dashed border-line-strong p-4"
                    >
                      <span className="eyebrow text-muted">Portrait</span>
                    </span>
                  )}
                </div>
                {member.name && <h3 className="mt-6 text-2xl font-semibold tracking-tight">{member.name}</h3>}
                {member.role && <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-navy">{member.role}</p>}
                {member.bio && <p className="mt-3 text-muted">{member.bio}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
