"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/series";

type Phase = "title" | "portrait" | "leaving";

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
 * Reference-matched cold open (Sushmita reel timing):
 * ~0.0–0.7s  — TIMIR with horizontal blur → sharp + light sweep; THE SERIES under
 * ~0.7s+     — name stays at top; portrait fades/scales in with red backlight;
 *              role line + white PLAY pill (portrait-only Ken Burns, not the button)
 * PLAY/SKIP  — brief leave, then hard-cut to the profile gate
 */
export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "portrait" : "title");
  const playRef = useRef<HTMLButtonElement>(null);
  const particles = useMemo(() => PARTICLES, []);
  const finishing = useRef(false);

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
    const t = window.setTimeout(() => setPhase("portrait"), 700);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (phase === "portrait") playRef.current?.focus();
  }, [phase]);

  function finish() {
    if (finishing.current) return;
    finishing.current = true;
    if (reduce) {
      onDone();
      return;
    }
    setPhase("leaving");
    window.setTimeout(() => onDone(), 380);
  }

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
            "radial-gradient(ellipse 55% 50% at 50% 42%, rgba(120,10,22,0.55) 0%, rgba(60,4,12,0.28) 38%, rgba(0,0,0,0) 70%)",
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
        onClick={finish}
        className="absolute right-4 top-4 z-30 min-h-9 rounded-full border border-white/70 px-3.5 text-[11px] font-semibold tracking-[0.18em] text-white/90 transition-colors hover:bg-white/10 md:right-8 md:top-7"
      >
        SKIP INTRO
      </button>

      <AnimatePresence mode="sync">
        {phase === "title" && (
          <motion.div
            key="title-only"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.25 }}
          >
            <motion.h2
              className="relative font-brand text-[min(30vw,15rem)] leading-none text-white"
              initial={reduce ? false : { opacity: 0.55, scale: 1.12, filter: "blur(18px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {profile.name}
              {/* Netflix-style light sweep */}
              {!reduce && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    WebkitMaskImage: "linear-gradient(#000, #000)",
                    maskImage: "linear-gradient(#000, #000)",
                  }}
                >
                  <span className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-80" style={{ animation: "intro-shine 0.85s ease-out 0.15s both" }} />
                </span>
              )}
            </motion.h2>
            <motion.p
              className="mt-2 text-sm font-bold tracking-[0.62em] text-[#E50914] md:text-base"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
            >
              {profile.tagline}
            </motion.p>
          </motion.div>
        )}

        {(phase === "portrait" || phase === "leaving") && (
          <motion.div
            key="portrait"
            className="absolute inset-0 z-10 flex flex-col items-center px-6 pb-10 pt-[max(4.5rem,8vh)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={
              phase === "leaving"
                ? { opacity: 0, scale: 0.92, x: -40, filter: "blur(6px)" }
                : { opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }
            }
            transition={{ duration: phase === "leaving" ? 0.35 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Name stays above portrait — matches reference */}
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="font-brand text-[clamp(3.5rem,12vw,7.5rem)] leading-none text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.18)]">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm font-bold tracking-[0.62em] text-[#E50914] md:text-base">{profile.tagline}</p>
            </div>

            <div className="relative mt-2 flex w-full max-w-md flex-col items-center">
              {/* Red backlight behind head/shoulders */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[12%] h-[55%] w-[72%] -translate-x-1/2 rounded-full bg-[#E50914]/40 blur-3xl"
              />

              {/* Ken Burns ONLY on the image — PLAY stays clickable/stable */}
              <motion.div
                className="relative h-[min(52vh,26rem)] w-[min(92vw,26rem)]"
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.06 }}
                transition={
                  reduce
                    ? { duration: 0.4 }
                    : { opacity: { duration: 0.55 }, scale: { duration: 9, ease: "linear" } }
                }
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
              </motion.div>

              <p className="relative z-10 -mt-4 text-center text-[11px] font-semibold tracking-[0.28em] text-white md:text-xs">
                MOTION DESIGNER • RIVE • LOTTIE
              </p>

              {/* White PLAY pill — matches reference; outside the scale transform */}
              <button
                ref={playRef}
                type="button"
                onClick={finish}
                className="relative z-20 mt-5 flex min-h-11 items-center gap-2 rounded-full bg-white px-8 text-sm font-bold tracking-[0.14em] text-black shadow-[0_0_28px_rgba(229,9,20,.35)] transition-transform hover:scale-105 hover:bg-white/90"
              >
                <span aria-hidden className="text-[#E50914]">
                  ▶
                </span>{" "}
                PLAY
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
