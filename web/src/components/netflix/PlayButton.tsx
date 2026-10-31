"use client";

import { useState } from "react";
import { VideoDialog } from "@/components/media/VideoDialog";

export function PlayButton({ src, poster, title, label = "Play" }: { src: string; poster?: string; title: string; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex min-h-11 items-center gap-2 rounded bg-white px-6 text-lg font-bold text-black transition-colors hover:bg-white/75 md:px-8"
      >
        <span aria-hidden>▶</span> {label}
      </button>
      <VideoDialog open={open} onClose={() => setOpen(false)} src={src} poster={poster} title={title} />
    </>
  );
}
