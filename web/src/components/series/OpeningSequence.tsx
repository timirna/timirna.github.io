"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/series";

type Phase = "title" | "portrait";

const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 1 + (i % 3),
  dur: 14 + (i % 9),
  delay: -(i % 11),
  opacity: 0.15 + (i % 5) * 0.06,
}));

/**
 * Reference-matched cold open:
 * Phase 1 — white TIMIR + red THE SERIES (fade/zoom/fade ~1.2s)
 * Phase 2 — cutout portrait with red backlight, role line, red PLAY pill
 * SKIP INTRO always visible; Play hard-cuts to the profile gate.
 */
export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "portrait" : "title");
  const playRef = useRef<HTMLButtonElement>(null);
  const particles = useMemo(() => PARTICLES, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onDone();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setPhase("portrait"), 1200);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (phase === "portrait") playRef.current?.focus();
  }, [phase]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.name} — ${profile.tagline}`}
      className="fixed inset-0 z-[90] overflow-hidden bg-black"
    >
      {/* Soft deep-red radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 48%, rgba(120,10,22,0.55) 0%, rgba(60,4,12,0.28) 38%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Faint drifting white particles */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animation: `intro-drift ${p.dur}s linear ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onDone}
        className="absolute right-4 top-4 z-20 min-h-9 rounded-full border border-white/70 px-3.5 text-[11px] font-semibold tracking-[0.18em] text-white/90 transition-colors hover:bg-white/10 md:right-8 md:top-7"
      >
        SKIP INTRO
      </button>

      <AnimatePresence mode="wait">
        {phase === "title" && (
          <motion.div
            key="title"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.35, ease: "easeOut" },
              scale: { duration: 1.2, ease: "linear" },
            }}
          >
            <h2 className="font-brand text-[min(30vw,15rem)] leading-none text-white">{profile.name}</h2>
            <p className="mt-2 text-sm font-bold tracking-[0.62em] text-[#E50914] md:text-base">{profile.tagline}</p>
          </motion.div>
        )}

        {phase === "portrait" && (
          <motion.div
            key="portrait"
            className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-10 pt-16"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative flex w-full max-w-md flex-col items-center"
              initial={reduce ? false : { scale: 1 }}
              animate={reduce ? { scale: 1 } : { scale: 1.06 }}
              transition={{ duration: 8, ease: "linear" }}
            >
              {/* Red backlight behind head/shoulders */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[18%] h-[55%] w-[70%] -translate-x-1/2 rounded-full bg-[#E50914]/35 blur-3xl"
              />
              <div
                className="relative h-[min(58vh,28rem)] w-[min(78vw,22rem)]"
                style={{
                  WebkitMaskImage: "linear-gradient(#000 58%, transparent 100%)",
                  maskImage: "linear-gradient(#000 58%, transparent 100%)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.portraitCutout}
                  alt="Portrait of Timir"
                  className="h-full w-full object-contain object-bottom"
                  draggable={false}
                />
              </div>
              <p className="relative z-10 -mt-6 text-center text-[11px] font-semibold tracking-[0.28em] text-white md:text-xs">
                MOTION DESIGNER • RIVE • LOTTIE
              </p>
              <button
                ref={playRef}
                type="button"
                onClick={onDone}
                className="relative z-10 mt-5 flex min-h-11 items-center gap-2 rounded-full bg-[#E50914] px-8 text-sm font-bold tracking-[0.14em] text-white shadow-[0_0_28px_rgba(229,9,20,.45)] transition-transform hover:scale-105 hover:bg-[var(--red-hover)]"
              >
                <span aria-hidden>▶</span> PLAY
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
