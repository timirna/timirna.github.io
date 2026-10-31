"use client";

import { useState } from "react";
import type { Film } from "@/data/projects";
import { VideoDialog } from "@/components/media/VideoDialog";
import { VideoPreview } from "@/components/media/VideoPreview";
import { Row } from "./Row";

/** A row of films that play straight away in a dialog. */
export function FilmRow({ title, note, films }: { title: string; note?: string; films: Film[] }) {
  const [current, setCurrent] = useState<Film | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  return (
    <>
      <Row title={title} note={note} id="films">
        {films.map((f) => (
          <button
            key={f.src}
            type="button"
            data-card
            aria-haspopup="dialog"
            onClick={() => setCurrent(f)}
            onPointerEnter={() => setHover(f.src)}
            onPointerLeave={() => setHover(null)}
            className="group/film relative w-[62vw] shrink-0 snap-start text-left sm:w-[40vw] md:w-[calc((100vw-6rem-2.5rem)/5)] xl:w-[calc((100vw-6rem-3rem)/6)]"
          >
            <span className="relative block aspect-video overflow-hidden rounded transition-transform duration-300 group-hover/film:scale-105">
              <VideoPreview poster={f.poster} src={f.src} alt="" active={hover === f.src} className="absolute inset-0 h-full w-full" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/film:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-black/40 text-lg">▶</span>
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-1.5 pt-6 text-[13px] font-bold [text-shadow:0_1px_4px_#000]">
                {f.title} <span className="font-normal text-[#bcbcbc]">· {f.duration}</span>
              </span>
            </span>
          </button>
        ))}
      </Row>
      <VideoDialog open={!!current} onClose={() => setCurrent(null)} src={current?.src ?? ""} poster={current?.poster} title={current?.title ?? ""} />
    </>
  );
}
