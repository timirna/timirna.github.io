"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/series";
import { cn } from "@/lib/utils";

/** Timir's portrait with a soft fade at the bottom; falls back to a monogram if the image can't load. */
export function Portrait({ className, fade = true, alt = "Portrait of Timir" }: { className?: string; fade?: boolean; alt?: string }) {
  const [failed, setFailed] = useState(false);
  const mask = fade ? { WebkitMaskImage: "linear-gradient(#000 60%, transparent 98%)", maskImage: "linear-gradient(#000 60%, transparent 98%)" } : undefined;
  const img = useRef<HTMLImageElement>(null);
  // The image may fail before hydration attaches onError, so check once on mount too.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#3a1520] to-[#1a1016] font-brand text-[min(30vw,12rem)] text-white/15" role="img" aria-label={alt} style={mask}>
          T
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={img}
          src={profile.portrait}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
          style={mask}
        />
      )}
    </div>
  );
}
