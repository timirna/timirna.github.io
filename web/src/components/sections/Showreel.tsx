"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { VideoDialog } from "@/components/media/VideoDialog";

// Shown until a real showreel is added in src/data/site.ts.
const stand_in = {
  src: "/assets/aura-explainer.mp4",
  poster: "/assets/aura-explainer.jpg",
  title: "Aura — SaaS explainer",
};
const stills = ["/assets/gora-explainer.jpg", "/assets/trace.jpg", "/assets/stage-3.jpg", "/assets/bfour-promo.jpg"];

export function Showreel() {
  const [open, setOpen] = useState(false);
  const reel = site.showreel;
  const video = reel ? { src: reel.src, poster: reel.poster, title: "Showreel", captions: reel.captions } : stand_in;

  return (
    <section aria-labelledby="showreel-title" className="bg-dark text-bg">
      <div className="container-page py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3 !text-bg/60">{reel ? "Showreel" : "Showreel — in production"}</p>
            <h2 id="showreel-title" className="display text-[clamp(2.25rem,5vw,4.5rem)]">
              {reel ? "A minute of motion." : "Reel's in the edit."}
            </h2>
          </div>
          {!reel && <p className="max-w-sm text-bg/60">The new showreel isn&apos;t cut yet. Meanwhile, here&apos;s a full explainer from start to finish.</p>}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg text-left md:aspect-[21/9]"
          aria-haspopup="dialog"
        >
          <span className="absolute inset-0 grid grid-cols-1 gap-1 md:grid-cols-[2fr_1fr_1fr]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.poster} alt="" className="h-full w-full object-cover md:row-span-2" />
            {stills.map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s} src={s} alt="" loading="lazy" className="h-full w-full object-cover opacity-70 max-md:hidden" />
            ))}
          </span>
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute bottom-5 left-5 right-5 flex items-center gap-4 md:bottom-8 md:left-8">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-lime text-xl text-ink transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
              <span aria-hidden className="ml-1">▶</span>
            </span>
            <span>
              <span className="block text-lg font-medium md:text-2xl">Play {video.title}</span>
              {!reel && <span className="block text-sm text-bg/60">Stand-in until the reel is ready</span>}
            </span>
          </span>
        </button>
      </div>
      <VideoDialog open={open} onClose={() => setOpen(false)} src={video.src} poster={video.poster} title={video.title} captions={"captions" in video ? video.captions : undefined} />
    </section>
  );
}
