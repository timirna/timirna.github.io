"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { profile } from "@/data/series";
import { site } from "@/data/site";
import { Portrait } from "./Portrait";
import { PlayIntro } from "./PlayIntro";

/** Home billboard: "TIMIR — The Series", portrait with a red glow, floating stat chips, Play Intro. */
export function SeriesBillboard() {
  const reduce = useReducedMotion();
  const [intro, setIntro] = useState(false);
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 80]);
  const chipPos = ["left-[2%] top-[38%]", "right-[4%] top-[14%]", "right-[2%] top-[62%]"];

  return (
    <section aria-labelledby="bb-title" className="relative min-h-[92svh] w-full overflow-hidden bg-[radial-gradient(circle_at_74%_42%,#7a1424_0%,#3a0a14_22%,#18131c_50%,#141414_100%)]">
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute h-px w-[45vw] bg-gradient-to-r from-transparent via-red/70 to-transparent"
              style={{ top: `${28 + i * 22}%`, left: "-50vw", animation: `streak ${7 + i * 2}s linear ${i * 1.7}s infinite` }}
            />
          ))}
        </div>
      )}

      <motion.div style={{ y: portraitY }} className="absolute bottom-0 right-0 h-[44%] w-full md:right-[6%] md:h-[88%] md:w-[38%]">
        <div aria-hidden className="absolute inset-[10%] rounded-full bg-red/30 blur-3xl" />
        <Portrait className="absolute inset-x-[12%] bottom-0 top-0 rounded-t-[45%] md:inset-x-0" />
        {profile.stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={`absolute hidden rounded-lg border border-white/15 bg-[#1c1820]/90 px-3 py-2 text-xs text-[#ddd] shadow-[0_10px_24px_rgba(0,0,0,.5)] backdrop-blur md:block ${chipPos[i]}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0] }}
            transition={reduce ? undefined : { opacity: { delay: 0.6 + i * 0.2 }, y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" } }}
          >
            <b className="block text-[15px] text-white">{s.value}</b>
            {s.label}
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 flex min-h-[92svh] flex-col justify-start px-4 pb-[40svh] pt-24 md:max-w-[52%] md:justify-center md:px-12 md:pb-24 md:pt-28 max-md:bg-[linear-gradient(#0000_0%,#0000_60%,#141414cc_100%)]">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.35em] text-[#ddd]">
          <span className="font-brand text-[36px] leading-none tracking-normal text-red">T</span>S E R I E S
        </p>
        <h1 id="bb-title" className="font-brand text-[clamp(5rem,13vw,11rem)] leading-[0.82]">
          <span className="bg-[linear-gradient(#fff_35%,#ffb3c0_70%,#e5486a)] bg-clip-text text-transparent">{profile.name}</span>
        </h1>
        <p className="mt-1 text-sm font-bold tracking-[0.55em] text-red">{profile.tagline}</p>
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-[#ddd]">
          <span className="font-semibold text-green">3 seasons</span>
          {profile.meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
          <span className="rounded-sm border border-white/50 px-1.5 text-xs">{profile.stats[0].value} Fiverr</span>
        </p>
        <p className="mt-3 text-xs font-bold tracking-[0.25em] text-[#bbb]">MOTION DESIGNER · COMPUTER SCIENCE BACKGROUND</p>
        <p className="mt-4 max-w-xl text-[clamp(1rem,1.3vw,1.2rem)] leading-snug text-[#e5e5e5]">{profile.summary}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setIntro(true)}
            className="flex min-h-11 items-center gap-2 rounded bg-white px-6 text-lg font-bold text-black transition-colors hover:bg-white/75 md:px-8"
          >
            <span aria-hidden>▶</span> Play Intro
          </button>
          <Link
            href="/journey/"
            className="flex min-h-11 items-center gap-2 rounded bg-[rgba(109,109,110,.7)] px-6 text-lg font-bold text-white transition-colors hover:bg-[rgba(109,109,110,.4)]"
          >
            <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-sm">
              i
            </span>
            My Story
          </Link>
          <a
            href={site.dribbbleServices}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-2 rounded border border-white/40 bg-transparent px-6 text-lg font-bold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Hire me for a Rive mascot — from $300 ↗
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      {intro && <PlayIntro onClose={() => setIntro(false)} />}
    </section>
  );
}
