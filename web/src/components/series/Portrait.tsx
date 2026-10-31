"use client";

import { useState } from "react";
import { profile } from "@/data/series";
import { cn } from "@/lib/utils";

/** Timir's portrait with a soft fade at the bottom; falls back to a monogram if the image can't load. */
export function Portrait({ className, fade = true, alt = "Portrait of Timir" }: { className?: string; fade?: boolean; alt?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#3a1520] to-[#1a1016] font-brand text-[min(30vw,12rem)] text-white/15" role="img" aria-label={alt}>
          T
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={profile.portrait}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
          style={fade ? { WebkitMaskImage: "linear-gradient(#000 60%, transparent 98%)", maskImage: "linear-gradient(#000 60%, transparent 98%)" } : undefined}
        />
      )}
    </div>
  );
}
