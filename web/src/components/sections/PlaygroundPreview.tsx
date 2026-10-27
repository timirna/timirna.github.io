import Link from "next/link";
import { demos } from "@/data/playground";
import { RivePlayer } from "@/components/media/RivePlayer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const picks = ["cat", "bird", "countly"];

export function PlaygroundPreview() {
  const items = demos.filter((d) => picks.includes(d.id));
  return (
    <section aria-labelledby="playground-title" className="container-page py-20 md:py-28">
      <SectionHeading
        id="playground-title"
        index="03"
        eyebrow="Playground"
        title="Experiments that react back."
        action={
          <Button href="/playground/" variant="secondary">
            Open the playground
          </Button>
        }
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((d, i) =>
          d.kind === "rive" ? (
            <li key={d.id}>
              <Reveal delay={i * 0.08}>
                <div className="relative aspect-square overflow-hidden rounded-lg bg-surface">
                  <RivePlayer src={d.src} stateMachine={d.stateMachine} artboard={d.artboard} label={d.title} className="absolute inset-0" canvasClassName="h-full" fallbackHref={d.demo} />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{d.title}</h3>
                    <p className="mt-1 text-sm text-muted">{d.blurb}</p>
                  </div>
                  <Link href={`/playground/#${d.id}`} className="chip min-h-11 shrink-0 px-4 hover:border-ink" aria-label={`Play with ${d.title}`}>
                    Play
                  </Link>
                </div>
              </Reveal>
            </li>
          ) : null,
        )}
      </ul>
    </section>
  );
}
