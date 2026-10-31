"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { VideoDialog } from "@/components/media/VideoDialog";

type Props = {
  title: string;
  label: string;
  meta: string[];
  summary: string;
  backdrop: string;
  /** Muted background loop. */
  teaser?: string;
  /** What ▶ Play opens. */
  film: { src: string; poster: string; title: string };
  moreHref: string;
};

/** Netflix-style hero: full-bleed backdrop that fades into a muted teaser, title, meta and Play / More Info. */
export function Billboard({ title, label, meta, summary, backdrop, teaser, film, moreHref }: Props) {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v || reduce || open) {
      v?.pause();
      return;
    }
    const t = window.setTimeout(() => v.play().catch(() => {}), 1200);
    return () => window.clearTimeout(t);
  }, [reduce, open]);

  return (
    <section aria-label={`Featured: ${title}`} className="relative h-[78svh] min-h-[520px] w-full overflow-hidden md:h-[56.25vw] md:max-h-[92vh]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={backdrop} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {teaser && !reduce && (
        <video
          ref={video}
          src={teaser}
          muted={muted}
          loop
          playsInline
          preload="none"
          aria-hidden
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(77deg,rgba(0,0,0,.65)_0%,rgba(0,0,0,.25)_45%,transparent_85%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-bg via-bg/60 to-transparent" />

      <div className="absolute inset-x-4 bottom-[18%] md:inset-x-12 md:bottom-[32%] md:max-w-[38%]">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.35em] text-[#ddd]">
          <span className="font-brand text-[34px] leading-none tracking-normal text-red">T</span>
          {label}
        </p>
        <h1 className="mt-2 text-[clamp(2.75rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,.45)]">
          {title}
        </h1>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-[#ddd]">
          <span className="font-semibold text-green">New</span>
          {meta.map((m, i) =>
            i === 1 ? (
              <span key={m} className="rounded-sm border border-white/50 px-1.5 text-xs">
                {m}
              </span>
            ) : (
              <span key={m}>{m}</span>
            ),
          )}
        </p>
        <p className="mt-4 line-clamp-3 text-[clamp(.95rem,1.25vw,1.2rem)] leading-snug [text-shadow:0_1px_6px_rgba(0,0,0,.6)]">{summary}</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className="flex min-h-11 items-center gap-2 rounded bg-white px-6 text-lg font-bold text-black transition-colors hover:bg-white/75 md:px-8"
          >
            <span aria-hidden>▶</span> Play
          </button>
          <Link
            href={moreHref}
            className="flex min-h-11 items-center gap-2 rounded bg-[rgba(109,109,110,.7)] px-6 text-lg font-bold text-white transition-colors hover:bg-[rgba(109,109,110,.4)]"
          >
            <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-sm">
              i
            </span>
            More Info
          </Link>
        </div>
      </div>

      <div className="absolute bottom-[32%] right-0 hidden items-center gap-3 md:flex">
        {teaser && !reduce && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute teaser" : "Mute teaser"}
            aria-pressed={!muted}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-lg hover:bg-white/10"
          >
            <span aria-hidden>{muted ? "🔇" : "🔊"}</span>
          </button>
        )}
        <span className="border-l-[3px] border-[#dcdcdc] bg-[rgba(51,51,51,.6)] py-1.5 pl-3 pr-14 text-[15px]">HD</span>
      </div>

      <VideoDialog open={open} onClose={() => setOpen(false)} src={film.src} poster={film.poster} title={film.title} />
    </section>
  );
}
