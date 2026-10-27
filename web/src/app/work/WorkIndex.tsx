"use client";

import { useState } from "react";
import { categories, projects } from "@/data/projects";
import type { Category } from "@/types/project";
import { ProjectCard } from "@/components/project/ProjectCard";
import { cn } from "@/lib/utils";

export function WorkIndex() {
  const [filter, setFilter] = useState<Category | "All">("All");
  // Published work first; seeded projects awaiting media go last.
  const ordered = [...projects].sort((a, b) => Number(a.status === "in-progress") - Number(b.status === "in-progress"));
  const list = filter === "All" ? ordered : ordered.filter((p) => p.categories.includes(filter));

  return (
    <>
      <div className="sticky top-16 z-10 -mx-5 mb-12 mt-12 bg-bg/90 px-5 py-3 backdrop-blur md:top-20 md:mx-0 md:px-0">
        <div role="group" aria-label="Filter projects by category" className="flex gap-2 overflow-x-auto pb-1">
          {(["All", ...categories] as const).map((c) => {
            const count = c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={cn(
                  "chip min-h-11 shrink-0 px-4 text-sm transition-colors",
                  filter === c ? "border-ink bg-ink text-bg" : "hover:border-ink hover:text-ink",
                )}
              >
                {c} <span className={filter === c ? "text-bg/60" : "text-muted/70"}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {list.length} projects{filter !== "All" ? ` in ${filter}` : ""}.
      </p>
      <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </>
  );
}
