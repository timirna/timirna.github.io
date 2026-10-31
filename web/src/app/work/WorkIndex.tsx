"use client";

import { useState } from "react";
import { categories, projects } from "@/data/projects";
import type { Category } from "@/types/project";
import { TitleCard } from "@/components/netflix/TitleCard";
import { cn } from "@/lib/utils";

export function WorkIndex() {
  const [filter, setFilter] = useState<Category | "All">("All");
  // Published work first; titles awaiting media go last.
  const ordered = [...projects].sort((a, b) => Number(a.status === "in-progress") - Number(b.status === "in-progress"));
  const list = filter === "All" ? ordered : ordered.filter((p) => p.categories.includes(filter));

  return (
    <>
      <div role="group" aria-label="Filter by genre" className="row-scroller mt-6 flex gap-2 overflow-x-auto pb-1">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              "min-h-11 shrink-0 rounded border px-4 text-sm font-semibold transition-colors",
              filter === c ? "border-white bg-white text-black" : "border-white/40 bg-black/40 hover:border-white",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {list.length} titles{filter !== "All" ? ` in ${filter}` : ""}.
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-x-2 gap-y-14 sm:grid-cols-2 md:grid-cols-3 md:gap-y-28 lg:grid-cols-4 xl:grid-cols-5">
        {list.map((p) => (
          <li key={p.slug} className="relative hover:z-10">
            <TitleCard project={p} fluid />
          </li>
        ))}
      </ul>
    </>
  );
}
