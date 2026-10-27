import { cn } from "@/lib/utils";

/** Native, accessible video with controls. Never autoplays with sound. */
export function VideoPlayer({
  src,
  poster,
  label,
  captions,
  className,
}: {
  src: string;
  poster?: string;
  label: string;
  captions?: string;
  className?: string;
}) {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={poster || undefined}
      aria-label={label}
      className={cn("h-full w-full bg-dark object-contain", className)}
    >
      <source src={src} />
      {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
    </video>
  );
}
