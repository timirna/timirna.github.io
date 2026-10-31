"use client";

import { useRef, type ReactNode } from "react";

/**
 * A horizontally scrolling Netflix-style row. Extra padding inside the scroller
 * gives hovered cards room to grow; the row lifts above its neighbours while a
 * card in it is hovered or focused. The padded scroller ignores the pointer
 * (its cards don't), so its empty padding never blocks the row below.
 */
export function Row({ title, note, children, id }: { title: string; note?: string; children: ReactNode; id?: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const page = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      aria-labelledby={headingId}
      className="group/row relative z-0 mb-4 focus-within:z-20 hover:z-20 md:mb-8"
    >
      <h2 id={headingId} className="flex items-baseline gap-3 px-4 text-lg font-semibold text-[#e5e5e5] md:px-12 md:text-[1.4vw]">
        {title}
        {note && <span className="text-xs font-semibold text-[#54b9c5] md:text-sm">{note}</span>}
      </h2>
      <div className="relative">
        <div
          ref={scroller}
          className="row-scroller [@media(hover:hover)]:pointer-events-none -mb-40 -mt-6 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 pb-44 pt-8 md:scroll-px-12 md:px-12 [&>*]:pointer-events-auto"
        >
          {children}
        </div>
        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => page(-1)}
          className="absolute bottom-36 left-0 top-2 z-30 hidden w-12 items-center justify-center bg-black/50 text-4xl opacity-0 transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover/row:opacity-100 md:flex"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => page(1)}
          className="absolute bottom-36 right-0 top-2 z-30 hidden w-12 items-center justify-center bg-black/50 text-4xl opacity-0 transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover/row:opacity-100 md:flex"
        >
          ›
        </button>
      </div>
    </section>
  );
}
