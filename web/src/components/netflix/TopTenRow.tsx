import Link from "next/link";
import type { Project } from "@/types/project";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { Row } from "./Row";

/** "Top 10"-style row: big outlined numerals beside portrait posters. */
export function TopTenRow({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <Row title={title} id="top">
      {projects.map((p, i) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}/`}
          data-card
          aria-label={`${i + 1}. ${p.title}`}
          className="group/top flex h-[150px] shrink-0 snap-start items-end md:h-[16vw] md:max-h-[260px]"
        >
          <span aria-hidden className="rank-numeral -mr-[0.12em] select-none text-[150px] md:text-[16vw] xl:text-[260px]">
            {i + 1}
          </span>
          <span className="relative z-10 block aspect-[2/3] h-full overflow-hidden rounded transition-transform duration-300 group-hover/top:scale-105">
            <ProjectMedia project={p.backdrop ? { ...p, cover: p.backdrop } : p} active={false} className="absolute inset-0 h-full w-full" />
          </span>
        </Link>
      ))}
    </Row>
  );
}
