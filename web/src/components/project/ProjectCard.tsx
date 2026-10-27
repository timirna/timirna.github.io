"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types/project";
import { ProjectMedia } from "./ProjectMedia";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  size?: "feature" | "half" | "grid";
  headingLevel?: "h2" | "h3";
  className?: string;
};

const aspect = {
  feature: "aspect-[4/3] md:aspect-[21/9]",
  half: "aspect-[4/3]",
  grid: "aspect-[4/3]",
};

export function ProjectCard({ project, size = "grid", headingLevel: H = "h3", className }: Props) {
  const [active, setActive] = useState(false);
  const inProgress = project.status === "in-progress";
  return (
    <article
      className={cn("group relative", className)}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocusCapture={() => setActive(true)}
      onBlurCapture={() => setActive(false)}
    >
      <div className={cn("relative overflow-hidden rounded-md ring-violet ring-offset-4 ring-offset-bg group-has-[a:focus-visible]:ring-2 md:rounded-lg", aspect[size])}>
        <ProjectMedia
          project={project}
          active={active}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 flex h-11 w-11 translate-y-1 items-center justify-center rounded-full bg-lime text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          ↗
        </span>
      </div>
      <div className={cn("mt-5 flex flex-col gap-3", size === "feature" && "md:flex-row md:items-start md:justify-between md:gap-10")}>
        <div>
          <H className={cn("font-semibold tracking-tight", size === "feature" ? "text-2xl md:text-3xl" : "text-xl")}>
            <Link href={`/work/${project.slug}/`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {project.title}
            </Link>
          </H>
          <p className={cn("mt-2 max-w-xl text-[15px] leading-relaxed text-muted", size !== "feature" && "line-clamp-2")}>{project.summary}</p>
        </div>
        <ul className="flex flex-wrap gap-2 md:shrink-0" aria-label="Categories">
          {inProgress && <li className="chip border-ink/30 text-ink">In progress</li>}
          {project.categories.map((c) => (
            <li key={c} className="chip">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
