"use client";

import type { Project } from "@/types/project";
import { VideoPreview } from "@/components/media/VideoPreview";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { RivePlayer } from "@/components/media/RivePlayer";
import { cn } from "@/lib/utils";
import { riveHintsFor } from "@/data/rive-hints";

/** The visual for a project card: poster/clip, live Lottie, live Rive, or an honest placeholder. */
export function ProjectMedia({ project, active, className }: { project: Project; active: boolean; className?: string }) {
  if (project.cover) {
    return <VideoPreview poster={project.cover} src={project.previewVideo} alt={project.coverAlt} active={active} className={className} />;
  }
  if (project.lottieFiles?.length) {
    return (
      <div className={cn("bg-[radial-gradient(circle_at_50%_45%,#f3f1ea_0%,#d9d6cc_100%)] p-[8%]", className)}>
        <LottiePlayer files={project.lottieFiles.slice(0, 1)} label={project.coverAlt} className="h-full" stageClassName="h-full" />
      </div>
    );
  }
  if (project.riveFile) {
    return (
      <div className={cn("bg-[radial-gradient(circle_at_50%_45%,#3a3a3a_0%,#1c1c1c_60%,#111_100%)]", className)}>
        <RivePlayer
          src={project.riveFile}
          stateMachine={project.riveStateMachine}
          artboard={project.riveArtboard}
          label={project.coverAlt}
          hints={riveHintsFor(project.riveStateMachine)}
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
        "relative flex flex-col justify-between overflow-hidden bg-[repeating-linear-gradient(135deg,#1d1d1d_0_12px,#222_12px_24px)] p-4",
        className,
      )}
    >
      <span className="w-fit rounded-sm bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-[#bcbcbc]">Coming soon</span>
      <span aria-hidden className="font-brand select-none text-[clamp(3rem,7vw,5.5rem)] leading-none text-white/10">
        {title
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")}
      </span>
    </div>
  );
}
