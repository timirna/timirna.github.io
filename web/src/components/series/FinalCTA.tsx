"use client";

import Link from "next/link";
import { profile } from "@/data/series";
import { site } from "@/data/site";
import { useSeries } from "./SeriesProvider";

/** "To Be Continued…" ending with contact links. */
export function FinalCTA() {
  const { replayOpening, openProfiles } = useSeries();
  const linkedin = site.socials.find((s) => s.label === "LinkedIn");
  const dribbble = site.socials.find((s) => s.label === "Dribbble");
  const pill = "flex min-h-11 items-center rounded-full border border-white/40 px-5 text-xs font-bold tracking-[0.12em] hover:border-white";
  return (
    <section aria-labelledby="tbc-title" className="mt-10 flex min-h-[80vh] flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_55%,#33070a_0%,#0e0303_50%,#000_85%)] px-4 py-24 text-center">
      <p className="text-xs font-bold tracking-[0.5em] text-red">THE NEXT EPISODE</p>
      <h2 id="tbc-title" className="mt-3 font-brand text-[clamp(4rem,13vw,12rem)] leading-[0.85]">
        <span className="bg-[linear-gradient(#fff_50%,#9a9a9a)] bg-clip-text text-transparent">To Be Continued...</span>
      </h2>
      <p className="mt-6 text-base font-bold tracking-[0.35em] md:text-lg">{profile.fullName.toUpperCase()}</p>
      <p className="mt-1 text-xs tracking-[0.3em] text-[#999]">MOTION DESIGNER</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2.5">
        <Link href="/contact/" className="flex min-h-11 items-center rounded-full bg-red px-6 text-xs font-bold tracking-[0.12em] shadow-[0_0_30px_rgba(229,9,20,.55)] hover:bg-[var(--red-hover)]">
          ▶ LET&apos;S BUILD
        </Link>
        {linkedin && (
          <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className={pill}>
            LINKEDIN ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {dribbble && (
          <a href={dribbble.href} target="_blank" rel="noopener noreferrer" className={pill}>
            DRIBBBLE ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        <a href={`mailto:${site.email}`} className={pill}>
          EMAIL ↗
        </a>
      </div>
      <div className="mt-8 flex gap-6 text-xs tracking-[0.15em] text-[#888]">
        <button type="button" onClick={replayOpening} className="min-h-11 hover:text-white">
          ↺ WATCH AGAIN
        </button>
        <button type="button" onClick={openProfiles} className="min-h-11 hover:text-white">
          ⇄ SWITCH PROFILE
        </button>
      </div>
    </section>
  );
}
