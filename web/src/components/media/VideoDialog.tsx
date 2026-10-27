"use client";

import { useEffect, useRef } from "react";

/** Modal video player built on <dialog>: focus is trapped, Esc closes, focus returns to the opener, playback stops on close. */
export function VideoDialog({
  open,
  onClose,
  src,
  poster,
  title,
  captions,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  title: string;
  captions?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      video.current?.play().catch(() => {});
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label={title}
      onClose={() => {
        video.current?.pause();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
      className="m-auto w-[min(92vw,1280px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="absolute -top-14 right-0 flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm text-white hover:bg-white/20"
        >
          Close <span aria-hidden>✕</span>
        </button>
        <video ref={video} controls playsInline preload="none" poster={poster} className="aspect-video w-full rounded-md bg-black">
          <source src={src} />
          {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
        </video>
      </div>
    </dialog>
  );
}
