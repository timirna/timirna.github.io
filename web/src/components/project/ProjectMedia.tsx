"use client";

import type { Project } from "@/types/project";
import { VideoPreview } from "@/components/media/VideoPreview";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { RivePlayer } from "@/components/media/RivePlayer";
import { cn } from "@/lib/utils";

/** The visual for a project card: poster/clip, live Lottie, live Rive, or an honest placeholder. */
export function ProjectMedia({ project, active, className }: { project: Project; active: boolean; className?: string }) {
  if (project.cover) {
    return <VideoPreview poster={project.cover} src={project.previewVideo} alt={project.coverAlt} active={active} className={className} />;
  }
  if (project.lottieFiles?.length) {
    return (
      <div className={cn("bg-surface p-[8%]", className)}>
        <LottiePlayer files={project.lottieFiles.slice(0, 1)} label={project.coverAlt} className="h-full" stageClassName="h-full" />
      </div>
    );
  }
  if (project.riveFile) {
    return (
      <div className={cn("bg-[#ecebe5]", className)}>
        <RivePlayer
          src={project.riveFile}
          stateMachine={project.riveStateMachine}
          artboard={project.riveArtboard}
          label={project.coverAlt}
          className="h-full"
          canvasClassName="h-full"
        />
      </div>
    );
  }
  return <MediaPlaceholder title={project.title} className={className} />;
}

export function MediaPlaceholder({ title, className }: { title: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden bg-[repeating-linear-gradient(135deg,#efeee9_0_12px,#f4f3ef_12px_24px)] p-5",
        className,
      )}
    >
      <span className="chip w-fit">Media in progress</span>
      <span aria-hidden className="display select-none text-[clamp(3rem,8vw,6rem)] text-ink/10">
        {title
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")}
      </span>
    </div>
  );
}
