import type { Metadata } from "next";
import { demos } from "@/data/playground";
import { RivePlayer } from "@/components/media/RivePlayer";
import { LottiePlayer } from "@/components/media/LottiePlayer";

export const metadata: Metadata = {
  title: "Playground",
  description: "Interactive Rive and Lottie experiments by Timir — play with the real state machines.",
  alternates: { canonical: "/playground/" },
};

export default function PlaygroundPage() {
  return (
    <div className="container-page pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-6">Playground</p>
      <h1 className="display max-w-5xl text-[clamp(3rem,8vw,7rem)]">Poke the characters.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Live Rive and Lottie files. Every control is read from the file itself — if a rig exposes an input or data-bound property, you can drive it
        here.
      </p>
      <ul className="mt-16 grid gap-6 md:grid-cols-2">
        {demos.map((d) => (
          <li key={d.id} id={d.id} className="scroll-mt-28 rounded-lg bg-surface p-5 md:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{d.title}</h2>
                <p className="mt-1 text-sm text-muted">{d.blurb}</p>
              </div>
              <span className="chip shrink-0">{d.kind === "rive" ? "Rive" : "Lottie"}</span>
            </div>
            {d.kind === "rive" ? (
              <>
                <RivePlayer
                  src={d.src}
                  stateMachine={d.stateMachine}
                  artboard={d.artboard}
                  label={d.title}
                  showControls
                  hints={d.hints}
                  canvasClassName="aspect-square rounded-md bg-bg"
                  fallbackHref={d.demo}
                />
                <a href={d.demo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-violet">
                  Standalone demo ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </>
            ) : (
              <LottiePlayer files={d.files} label={d.title} showControls stageClassName="aspect-square rounded-md bg-bg p-6" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
