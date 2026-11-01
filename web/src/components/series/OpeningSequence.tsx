"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/series";
import { Portrait } from "./Portrait";

/**
 * Netflix-style cold open: black screen, red TIMIR mark, THE SERIES tagline,
 * portrait under the title with a slow 1→1.08 zoom, then ▶ Play → profile gate.
 */
export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const playRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    playRef.current?.focus();
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
  }, []);

  function finish() {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onDone, reduce ? 0 : 600);
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${profile.name} — ${profile.tagline}`}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-black pb-28 pt-16"
      initial={false}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="relative flex flex-col items-center px-6"
        initial={reduce ? false : { scale: 1 }}
        animate={reduce || leaving ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 3, ease: "linear" }}
      >
        <motion.h2
          className="font-brand text-[min(28vw,14rem)] leading-none text-[#E50914]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {profile.name}
        </motion.h2>
        <motion.p
          className="mt-1 text-sm font-bold tracking-[0.55em] text-white md:text-base"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {profile.tagline}
        </motion.p>
        <motion.div
          className="relative mt-6 h-[min(38vh,22rem)] w-[min(58vw,18rem)]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          <Portrait className="absolute inset-0 rounded-t-[45%]" />
        </motion.div>
      </motion.div>

      <button
        ref={playRef}
        type="button"
        onClick={finish}
        className="absolute bottom-[7vh] flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-black shadow-[0_0_24px_rgba(255,255,255,.35)] transition-transform hover:scale-105"
      >
        <span aria-hidden>▶</span> Play
      </button>
      <button
        type="button"
        onClick={finish}
        className="absolute right-5 top-5 min-h-11 rounded px-3 text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline md:right-10 md:top-8"
      >
        Skip
      </button>
    </motion.div>
  );
}
