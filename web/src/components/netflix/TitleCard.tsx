"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types/project";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { cn } from "@/lib/utils";

/** Netflix-style card: a 16:9 tile that grows on hover into a preview with a details panel. */
export function TitleCard({ project: p, fluid = false }: { project: Project; fluid?: boolean }) {
  const [active, setActive] = useState(false);
  const href = `/work/${p.slug}/`;
  const live = !p.cover && (p.riveFile || p.lottieFiles?.length);
  const meta = [p.categories.join(" • ")];

  return (
    <div
      data-card
      className={cn(
        "relative has-[a:focus-visible]:z-10 hover:z-10",
        fluid ? "w-full" : "w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-[calc((100vw-6rem-2.5rem)/5)] xl:w-[calc((100vw-6rem-3rem)/6)]",
      )}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocusCapture={() => setActive(true)}
      onBlurCapture={() => setActive(false)}
    >
      <div
        className={cn(
          "relative origin-center rounded transition-[transform,box-shadow] delay-0 duration-300 ease-out",
          active && "z-10 md:scale-[1.35] md:shadow-[0_12px_40px_rgba(0,0,0,.8)] md:delay-300",
        )}
      >
        <Link href={href} className="block focus-visible:outline-offset-4" aria-label={p.title}>
          <div className={cn("relative aspect-video overflow-hidden rounded", active && "md:rounded-b-none")}>
            <ProjectMedia project={p} active={active} className="absolute inset-0 h-full w-full" />
            {live && (
              <span className="absolute bottom-7 left-0 rounded-r bg-red px-1.5 py-0.5 text-[10px] font-bold text-white">
                {p.riveFile ? "Live Rive" : "Live Lottie"}
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-1.5 pt-6 text-[13px] font-bold leading-tight [text-shadow:0_1px_4px_#000]">
              {p.title}
            </span>
          </div>
        </Link>
        <div
          className={cn(
            "absolute inset-x-0 top-full hidden rounded-b bg-surface px-3 pb-3 pt-2.5 text-[11px] shadow-[0_12px_30px_rgba(0,0,0,.7)]",
            active && "md:block",
          )}
        >
          <div className="mb-2 flex items-center gap-1.5">
            <Link href={href} tabIndex={-1} aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] text-black">
              ▶
            </Link>
            <Link
              href={href}
              tabIndex={-1}
              aria-hidden
              className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/50 text-[10px] hover:border-white"
            >
              ⌄
            </Link>
          </div>
          <p className="mb-1 font-semibold">
            {p.status === "in-progress" ? (
              <span className="text-[#bcbcbc]">Coming soon</span>
            ) : (
              <>
                <span className="text-green">{p.year ? "New" : "Featured"}</span>
                {p.year && <span className="ml-1.5 text-[#bcbcbc]">{p.year}</span>}
                {p.client && <span className="ml-1.5 rounded-sm border border-white/40 px-1 text-[#bcbcbc]">{p.client}</span>}
              </>
            )}
          </p>
          <p className="text-[#e5e5e5]">{meta}</p>
        </div>
      </div>
    </div>
  );
}
