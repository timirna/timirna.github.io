import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

// Rhythm: full-width feature, two halves, repeat.
const sizeAt = (i: number) => (i % 3 === 0 ? "feature" : "half");

export function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="container-page py-20 md:py-28">
      <SectionHeading
        id="work-title"
        index="01"
        eyebrow="Selected work"
        title="Characters, interfaces and stories, in motion."
        action={
          <Button href="/work/" variant="secondary">
            All projects
          </Button>
        }
      />
      <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-20">
        {featuredProjects.map((p, i) => {
          const size = sizeAt(i);
          return (
            <Reveal key={p.slug} className={size === "feature" ? "md:col-span-2" : ""} delay={size === "half" && i % 3 === 2 ? 0.08 : 0}>
              <ProjectCard project={p} size={size} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
