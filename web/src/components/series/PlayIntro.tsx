"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { introSlides } from "@/data/series";
import { RivePlayer } from "@/components/media/RivePlayer";
import { Portrait } from "./Portrait";

const SLIDE_MS = 4500;

/** ▶ Play Intro: a story-style highlight reel. Space pauses, ← → change slides, Esc closes. */
export function PlayIntro({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(!!reduce);
  const [elapsed, setElapsed] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const last = introSlides.length - 1;

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (paused) return;
    const start = performance.now() - elapsed;
    let raf = 0;
    const tick = (t: number) => {
      const e = t - start;
      if (e >= SLIDE_MS) {
        if (i < last) {
          setI(i + 1);
          setElapsed(0);
        } else onClose();
        return;
      }
      setElapsed(e);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused]);

  function go(d: number) {
    setElapsed(0);
    setI((x) => Math.min(last, Math.max(0, x + d)));
  }

  const s = introSlides[i];
  return (
    <div role="dialog" aria-modal="true" aria-label="Play Intro: highlight reel" className="fixed inset-0 z-[95] bg-black">
      <div className="absolute inset-x-4 top-4 z-20 flex gap-1.5 md:inset-x-12">
        {introSlides.map((_, k) => (
          <span key={k} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
            <span className="block h-full bg-white" style={{ width: k < i ? "100%" : k === i ? `${(elapsed / SLIDE_MS) * 100}%` : "0%" }} />
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,#5a0f1c_0%,#1a0d12_45%,#000_100%)]" />
          {s.media.kind === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={s.media.src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          )}
          {s.media.kind === "portrait" && <Portrait className="absolute bottom-0 right-[4%] h-[85%] w-[min(80vw,30rem)] rounded-t-[45%]" alt="" />}
          {s.media.kind === "rive" && (
            <RivePlayer
              src={s.media.src}
              stateMachine={s.media.stateMachine}
              artboard={"artboard" in s.media ? s.media.artboard : undefined}
              label={s.title}
              className="absolute inset-y-[12%] right-0 w-full md:w-[55%]"
              canvasClassName="h-full"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(77deg,rgba(0,0,0,.85)_0%,rgba(0,0,0,.3)_50%,transparent_80%)]" />
          <div className="absolute bottom-[14%] left-4 right-4 md:left-12 md:max-w-[45%]">
            <p className="text-sm font-bold tracking-[0.35em] text-red">{s.kicker.toUpperCase()}</p>
            <h2 className="mt-2 font-brand text-[clamp(4rem,10vw,9rem)] leading-[0.85]">{s.title}</h2>
            <p className="mt-4 text-xl text-[#e5e5e5]">{s.text}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* tap zones */}
      <button type="button" aria-label="Previous" onClick={() => go(-1)} className="absolute inset-y-16 left-0 z-10 w-1/3 cursor-w-resize focus-visible:outline-none" />
      <button type="button" aria-label="Next" onClick={() => go(1)} className="absolute inset-y-16 right-0 z-10 w-1/3 cursor-e-resize focus-visible:outline-none" />
      <div className="absolute bottom-6 right-4 z-20 flex gap-2 md:right-12">
        <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="min-h-11 rounded-full border border-white/50 px-4 text-sm font-semibold hover:bg-white/10">
          {paused ? "▶ Play" : "❚❚ Pause"}
        </button>
        <button ref={closeRef} type="button" onClick={onClose} className="min-h-11 rounded-full bg-white px-4 text-sm font-bold text-black">
          Close ✕
        </button>
      </div>
    </div>
  );
}
