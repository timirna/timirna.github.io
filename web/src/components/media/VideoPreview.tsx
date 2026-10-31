"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  poster: string;
  src?: string;
  alt: string;
  /** Start playing (after a short delay) when true — e.g. while the card is hovered or focused. */
  active: boolean;
  className?: string;
};

/** Poster image that swaps to a muted, looping clip while active. */
export function VideoPreview({ poster, src, alt, active, className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const visible = useInView(box);
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src || reduce || !active || !visible) {
      video.current?.pause();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mirrors the media element
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => {
      setArmed(true);
      requestAnimationFrame(() => {
        const v = video.current;
        if (!v) return;
        v.currentTime = 0;
        v.play().then(() => setPlaying(true)).catch(() => {});
      });
    }, 180);
    return () => window.clearTimeout(t);
  }, [active, visible, src, reduce]);

  return (
    <div ref={box} className={cn("relative overflow-hidden bg-line/60", className)}>
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export; posters include animated GIFs
        <img src={poster} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      {src && armed && (
        <video
          ref={video}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-300", playing ? "opacity-100" : "opacity-0")}
        />
      )}
    </div>
  );
}
