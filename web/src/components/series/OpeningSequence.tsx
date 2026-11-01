"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/series";

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
 * Reference cold-open (Sushmita reel):
 * 0.0s  — TIMIR huge (~4.2×) + heavy blur, letters cropped at edges (CSS keyframes)
 * 0.4–0.7s — shrinks/sharpens to ~50% frame width; red glow + THE SERIES
 * 1.0s  — large portrait (~50% frame height) rises under/overlapping title
 * 1.6s  — white PLAY pill (stable — outside Ken Burns)
 * PLAY/SKIP — fade/blur leave → Who's watching
 */
export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [showPortrait, setShowPortrait] = useState(!!reduce);
  const [showPlay, setShowPlay] = useState(!!reduce);
  const [leaving, setLeaving] = useState(false);
  const playRef = useRef<HTMLButtonElement>(null);
  const finishing = useRef(false);
  const particles = useMemo(() => PARTICLES, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        finish();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDone]);

  useEffect(() => {
    if (reduce) return;
    const tPortrait = window.setTimeout(() => setShowPortrait(true), 1000);
    const tPlay = window.setTimeout(() => setShowPlay(true), 1600);
    return () => {
      clearTimeout(tPortrait);
      clearTimeout(tPlay);
    };
  }, [reduce]);

  useEffect(() => {
    if (showPlay) playRef.current?.focus();
  }, [showPlay]);

  function finish() {
    if (finishing.current) return;
    finishing.current = true;
    if (reduce) {
      onDone();
      return;
    }
    setLeaving(true);
    window.setTimeout(() => onDone(), 450);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.name} — ${profile.tagline}`}
      className="fixed inset-0 z-[90] overflow-hidden bg-black"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={reduce ? false : { opacity: 0.15 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: reduce ? 0 : 0.75, delay: reduce ? 0 : 0.15 }}
        style={{
          background:
            "radial-gradient(ellipse 62% 50% at 50% 40%, rgba(170,14,30,0.7) 0%, rgba(90,8,16,0.35) 42%, rgba(0,0,0,0) 72%)",
        }}
      />

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
        onClick={finish}
        className="absolute right-4 top-4 z-30 min-h-9 rounded-full border border-white/70 px-3.5 text-[11px] font-semibold tracking-[0.18em] text-white/90 transition-colors hover:bg-white/10 md:right-8 md:top-7"
      >
        SKIP INTRO
      </button>

      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden px-0"
        animate={
          leaving
            ? { opacity: 0, scale: 0.88, filter: "blur(12px)", x: -28 }
            : { opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative z-20 flex flex-col items-center">
          {/* CSS keyframes: first painted frame is giant+blur, then zooms to ~50% width */}
          <h2
            className={`relative whitespace-nowrap font-brand leading-[0.82] text-white ${reduce ? "" : "intro-title-zoom"}`}
            style={{
              fontSize: "clamp(5.5rem, 28vw, 26rem)",
              letterSpacing: "0.02em",
              textShadow: "0 0 48px rgba(255,255,255,0.14)",
              animation: reduce ? undefined : "intro-title-zoom 0.9s cubic-bezier(0.4, 0, 0.2, 1) both",
            }}
          >
            {profile.name}
            {!reduce && (
              <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <span
                  className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/65 to-transparent opacity-90"
                  style={{ animation: "intro-shine 0.9s ease-out 0.2s both" }}
                />
              </span>
            )}
          </h2>

          <motion.p
            className="relative z-20 mt-1 text-sm font-bold tracking-[0.62em] text-[#E50914] md:text-base"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.3 }}
          >
            {profile.tagline}
          </motion.p>
        </div>

        <div className="relative z-10 -mt-20 flex w-full flex-col items-center md:-mt-32">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[6%] h-[65%] w-[min(98vw,42rem)] -translate-x-1/2 rounded-full bg-[#E50914]/5 blur-3xl"
          />

          <motion.div
            className="relative flex w-full flex-col items-center"
            initial={false}
            animate={showPortrait || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 140 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative h-[min(56vh,42rem)] w-[min(100vw,48rem)] md:h-[min(62vh,48rem)]"
              animate={reduce || !showPortrait ? { scale: 1 } : { scale: 1.05 }}
              transition={{ duration: 10, ease: "linear" }}
              style={{
                WebkitMaskImage: "linear-gradient(#000 52%, transparent 100%)",
                maskImage: "linear-gradient(#000 52%, transparent 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.portraitCutout}
                alt="Portrait of Timir"
                className="h-full w-full object-contain object-bottom"
                draggable={false}
              />
            </motion.div>

            <p className="relative z-10 -mt-2 text-center text-[11px] font-semibold tracking-[0.28em] text-white md:text-xs">
              MOTION DESIGNER • RIVE • LOTTIE
            </p>
          </motion.div>

          <motion.div
            className="relative z-20 mt-3"
            initial={false}
            animate={
              showPlay
                ? { opacity: 1, y: 0, pointerEvents: "auto" as const }
                : { opacity: 0, y: 16, pointerEvents: "none" as const }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={playRef}
              type="button"
              onClick={finish}
              tabIndex={showPlay ? 0 : -1}
              className="flex min-h-11 items-center gap-2 rounded-full bg-white px-8 text-sm font-bold tracking-[0.14em] text-black shadow-[0_0_28px_rgba(229,9,20,.4)] transition-transform hover:scale-105 hover:bg-white/90"
            >
              <span aria-hidden className="text-[#E50914]">
                ▶
              </span>{" "}
              PLAY
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
