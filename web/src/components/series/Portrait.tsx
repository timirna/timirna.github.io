"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/series";
import { cn } from "@/lib/utils";

type PortraitProps = {
  className?: string;
  /** Soft bottom fade (default). */
  fade?: boolean;
  /** Soft left fade into the page (hero cutout). Uses the hero cutout asset. */
  fadeLeft?: boolean;
  /** Use the background-removed cutout asset — no arch/frame. */
  cutout?: boolean;
  alt?: string;
};

/** Timir's portrait; cutout mode relies on alpha + soft fades, never a rounded frame. */
export function Portrait({ className, fade = true, fadeLeft = false, cutout = false, alt = "Portrait of Timir" }: PortraitProps) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const src = cutout ? (fadeLeft ? profile.portraitCutoutHero : profile.portraitCutout) : profile.portrait;

  // Bottom fade as a CSS mask only (no solid overlays — those create hard seams on the red hero glow).
  const bottomMask = fade
    ? ({
        WebkitMaskImage: "linear-gradient(#000 48%, transparent 100%)",
        maskImage: "linear-gradient(#000 48%, transparent 100%)",
      } as const)
    : undefined;

  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div className={cn("relative", cutout ? "overflow-visible" : "overflow-hidden", className)}>
      {failed ? (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#3a1520] to-[#1a1016] font-brand text-[min(30vw,12rem)] text-white/15"
          role="img"
          aria-label={alt}
          style={bottomMask}
        >
          T
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className={cn("h-full w-full", cutout ? "object-contain object-bottom" : "object-cover object-top")}
          style={bottomMask}
        />
      )}
    </div>
  );
}
