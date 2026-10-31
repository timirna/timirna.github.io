"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/series";
import { Portrait } from "./Portrait";

type Phase = "black" | "studio" | "name" | "card";

/**
 * Black → studio mark → name zooms in with a glow → "The Series" title card with the portrait and ▶ Play.
 * Skip Intro (or Enter / Esc) jumps ahead. Reduced motion starts on the final frame.
 */
export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "card" : "black");
  const playRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (reduce) return;
    const t = [
      window.setTimeout(() => setPhase("studio"), 400),
      window.setTimeout(() => setPhase("name"), 1900),
      window.setTimeout(() => setPhase("card"), 4300),
    ];
    return () => t.forEach(clearTimeout);
  }, [reduce]);

  useEffect(() => {
    if (phase === "card") playRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.key === "Enter" && phase !== "card")) {
        e.preventDefault();
        onDone();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onDone, phase]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.name} — ${profile.tagline}`}
      className="fixed inset-0 z-[90] overflow-hidden bg-[radial-gradient(ellipse_at_50%_85%,#3a0d16_0%,#1d1826_35%,#141119_60%,#0a090d_100%)]"
    >
      <AnimatePresence mode="wait">
        {phase === "studio" && (
          <motion.p
            key="studio"
            className="absolute inset-0 flex items-center justify-center gap-3 text-sm font-semibold tracking-[0.5em] text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-brand text-5xl tracking-normal text-red">T</span> AN ORIGINAL SERIES
          </motion.p>
        )}
        {phase === "name" && (
          <motion.div key="name" className="absolute inset-0 flex items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <motion.h2
              className="font-brand text-[min(34vw,22rem)] leading-none text-[#f5f5f5] [text-shadow:0_0_28px_rgba(255,255,255,.35),0_0_80px_rgba(255,255,255,.15)]"
              initial={{ scale: 1.6, opacity: 0, filter: "blur(12px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            >
              {profile.name}
            </motion.h2>
            <span className="absolute bottom-[18%] h-2.5 w-2.5 animate-pulse rounded-full bg-white shadow-[0_0_14px_#fff]" aria-hidden />
          </motion.div>
        )}
        {phase === "card" && (
          <motion.div
            key="card"
            className="absolute inset-0 flex flex-col items-center bg-[radial-gradient(circle_at_50%_62%,#6a0f1c_0%,#2a0a14_22%,#17131d_48%,#0b0a0f_100%)] pt-[6vh]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-brand text-[min(26vw,15rem)] leading-[0.85] [text-shadow:0_0_30px_rgba(255,255,255,.2)]">{profile.name}</h2>
            <p className="mt-2 text-sm font-bold tracking-[0.6em] text-red">{profile.tagline}</p>
            <motion.div
              className="relative mt-[3vh] w-[min(70vw,24rem)] flex-1"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Portrait className="absolute inset-x-0 bottom-0 top-0 rounded-t-[45%]" />
            </motion.div>
            <p className="absolute bottom-[13vh] px-4 text-center text-xs font-semibold tracking-[0.35em] text-white/85 md:text-sm">
              {profile.role.toUpperCase()}
            </p>
            <button
              ref={playRef}
              type="button"
              onClick={onDone}
              className="absolute bottom-[5vh] flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-black shadow-[0_0_24px_rgba(255,255,255,.35)] transition-transform hover:scale-105"
            >
              <span aria-hidden>▶</span> PLAY
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {phase !== "card" && (
        <button
          type="button"
          onClick={onDone}
          className="absolute bottom-8 right-6 min-h-11 rounded border border-white/60 bg-black/40 px-5 text-sm font-semibold hover:bg-white/10 md:right-12"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
}
