import type { GalleryItem } from "@/types/project";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {items.map((g, i) => (
        <li key={g.src} className={items.length % 2 === 1 && i === 0 ? "md:col-span-2" : ""}>
          <Reveal delay={(i % 2) * 0.06}>
            <figure>
              <div className="overflow-hidden rounded-lg bg-surface">
                {g.type === "video" ? (
                  <div className="aspect-video">
                    <VideoPlayer src={g.src} poster={g.poster} label={g.alt} />
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                )}
              </div>
              <figcaption className="mt-3 text-sm text-muted">{g.alt}</figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
