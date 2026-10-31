"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Season } from "@/data/series";
import type { Project } from "@/types/project";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { cn } from "@/lib/utils";

const epColors = [
  "linear-gradient(135deg,#e50914,#7a0a12)",
  "linear-gradient(135deg,#f2a516,#7a4a06)",
  "linear-gradient(135deg,#1aa6a0,#0b4a48)",
  "linear-gradient(135deg,#6d4bd8,#2c1a66)",
];

export function Journey({ seasons }: { seasons: (Season & { projects: Project[] })[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(seasons.length - 1);
  const s = seasons[active];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_20%_0%,#2a1520_0%,#141119_45%,#141414_100%)] px-4 pb-24 pt-28 md:px-12 md:pt-32">
      <p className="text-sm font-bold tracking-[0.4em] text-red">— {seasons.length} SEASONS</p>
      <h1 className="mt-2 font-brand text-[clamp(4rem,9vw,7.5rem)] leading-[0.9]">My Journey</h1>

      <div role="tablist" aria-label="Seasons" className="row-scroller mt-8 flex gap-3 overflow-x-auto md:gap-8">
        {seasons.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={i === active}
            aria-controls="season-panel"
            onClick={() => setActive(i)}
            className={cn(
              "min-h-11 shrink-0 rounded-xl px-4 py-2 text-left text-xs tracking-[0.12em] transition-colors",
              i === active ? "bg-[#f2f2f2] text-[#555] shadow-[0_0_0_3px_rgba(255,255,255,.12)]" : "text-[#8a8a8a] hover:text-white",
            )}
          >
            SEASON {String(x.number).padStart(2, "0")}
            <b className={cn("block text-[15px] tracking-normal", i === active ? "text-black" : "text-[#ddd]")}>{x.title}</b>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={s.id}
          id="season-panel"
          role="tabpanel"
          aria-labelledby={`tab-${s.id}`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10"
        >
          <h2 className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-brand text-[clamp(2.75rem,6vw,4.5rem)] leading-none">
            <span className="text-transparent [-webkit-text-stroke:2px_#777]">S{String(s.number).padStart(2, "0")}</span>
            {s.title}
            <span className="font-sans text-base font-normal text-[#aaa]">
              {s.role} · {s.org} · {s.years}
            </span>
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-[#d2d2d2]">{s.summary}</p>

          {s.projects.length > 0 ? (
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {s.projects.map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}/`} className="group block overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-1">
                    <span className="relative block aspect-video overflow-hidden">
                      <ProjectMedia project={p} active={false} className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute left-2.5 top-2 text-xs font-bold tracking-[0.15em] text-white/85 [text-shadow:0_1px_4px_#000]">EP {i + 1}</span>
                    </span>
                    <span className="block px-3.5 pb-4 pt-3" style={{ background: epColors[i % epColors.length] }}>
                      <b className="block">{p.title}</b>
                      <span className="mt-1 line-clamp-2 block text-[13px] text-white/80">{p.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-8 rounded-lg border border-dashed border-[#404040] p-6 text-[#a3a3a3]">
              Episodes from this season aren&apos;t online yet.
            </p>
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
