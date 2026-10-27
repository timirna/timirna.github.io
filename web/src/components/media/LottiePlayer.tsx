"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { AnimationItem } from "lottie-web";
import { cn } from "@/lib/utils";

type Props = {
  files: string[];
  label: string;
  className?: string;
  stageClassName?: string;
  showControls?: boolean;
};

const nameOf = (f: string) =>
  f
    .split("/")
    .pop()!
    .replace(/\.json$/, "")
    .replace(/-/g, " ");

export function LottiePlayer({ files, label, className, stageClassName, showControls = false }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const anim = useRef<AnimationItem | null>(null);
  const near = useInView(stage, { margin: "200px", once: true });
  const visible = useInView(stage);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduce);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState(false);
  const playingRef = useRef(playing);
  useEffect(() => {
    playingRef.current = playing;
  });

  useEffect(() => {
    if (!near || !stage.current) return;
    let cancelled = false;
    const el = stage.current;
    import("lottie-web").then(({ default: lottie }) => {
      if (cancelled) return;
      anim.current?.destroy();
      const a = lottie.loadAnimation({
        container: el,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: files[index],
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      a.addEventListener("data_failed", () => setError(true));
      a.addEventListener("DOMLoaded", () => {
        if (playingRef.current && !reduce) a.play();
        else a.goToAndStop(Math.floor(a.totalFrames / 2), true);
      });
      anim.current = a;
    });
    return () => {
      cancelled = true;
      anim.current?.destroy();
      anim.current = null;
    };
  }, [near, index, files, reduce]);

  useEffect(() => {
    const a = anim.current;
    if (!a) return;
    if (visible && playing) a.play();
    else a.pause();
  }, [visible, playing]);

  useEffect(() => {
    anim.current?.setSpeed(speed);
  }, [speed, index]);

  return (
    <div className={cn("flex flex-col", className)}>
      <div ref={stage} role="img" aria-label={`${label}: ${nameOf(files[index])}`} className={cn("relative min-h-0 flex-1 [&_svg]:!h-full", stageClassName)}>
        {error && <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">This animation couldn&apos;t load.</p>}
      </div>
      {showControls && (
        <div className="mt-4 space-y-3" role="group" aria-label={`${label} controls`}>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="chip min-h-11 px-4 hover:border-ink" aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
              {playing ? "❚❚ Pause" : "▶ Play"}
            </button>
            <button
              type="button"
              className="chip min-h-11 px-4 hover:border-ink"
              onClick={() => {
                anim.current?.goToAndPlay(0, true);
                setPlaying(true);
              }}
            >
              ↺ Replay
            </button>
            <label className="chip min-h-11 gap-2 px-4">
              Speed
              <select className="bg-transparent" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
                {[0.5, 1, 1.5, 2].map((s) => (
                  <option key={s} value={s}>
                    {s}×
                  </option>
                ))}
              </select>
            </label>
          </div>
          {files.length > 1 && (
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Animation">
              {files.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  role="radio"
                  aria-checked={i === index}
                  onClick={() => setIndex(i)}
                  className={cn("chip min-h-11 px-4 capitalize", i === index && "border-ink bg-ink text-bg")}
                >
                  {nameOf(f)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
