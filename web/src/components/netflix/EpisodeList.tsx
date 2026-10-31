"use client";

import { useState } from "react";
import type { Film } from "@/data/projects";
import { VideoDialog } from "@/components/media/VideoDialog";

/** Netflix "Episodes" list: number, thumbnail, title, duration and synopsis. */
export function EpisodeList({ films }: { films: Film[] }) {
  const [current, setCurrent] = useState<Film | null>(null);
  return (
    <>
      <ol className="divide-y divide-[#404040] border-y border-[#404040]">
        {films.map((f, i) => (
          <li key={f.src}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setCurrent(f)}
              className="group grid w-full grid-cols-[2rem_8.5rem_1fr] items-center gap-4 rounded-md px-2 py-5 text-left transition-colors hover:bg-[#333] md:grid-cols-[3rem_10rem_1fr_auto] md:px-6 md:py-6"
            >
              <span className="text-center text-2xl text-[#d2d2d2]">{i + 1}</span>
              <span className="relative block aspect-video overflow-hidden rounded">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black/50 text-sm">▶</span>
                </span>
              </span>
              <span>
                <span className="flex justify-between gap-4 font-semibold">
                  {f.title}
                  <span className="font-normal text-[#d2d2d2] md:hidden">{f.duration}</span>
                </span>
                <span className="mt-1 hidden text-sm leading-relaxed text-[#d2d2d2] sm:block">{f.blurb}</span>
                <span className="mt-1 block text-xs uppercase tracking-wider text-[#808080]">{f.kind}</span>
              </span>
              <span className="hidden self-start pt-0.5 font-semibold md:block">{f.duration}</span>
            </button>
          </li>
        ))}
      </ol>
      <VideoDialog open={!!current} onClose={() => setCurrent(null)} src={current?.src ?? ""} poster={current?.poster} title={current?.title ?? ""} />
    </>
  );
}
