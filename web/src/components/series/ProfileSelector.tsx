"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { viewers, type ViewerId } from "@/data/series";
import { RivePlayer } from "@/components/media/RivePlayer";
import { Portrait } from "./Portrait";
import { cn } from "@/lib/utils";

/** "Who's watching?" — the profile only changes what the homepage plays first. */
export function ProfileSelector({ current, onChoose, onClose }: { current: ViewerId | null; onChoose: (id: ViewerId) => void; onClose?: () => void }) {
  const reduce = useReducedMotion();
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="who-title"
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-y-auto bg-[radial-gradient(ellipse_at_50%_30%,#221c2b_0%,#141119_60%,#0d0c10_100%)] px-4 py-16"
    >
      <span className="absolute left-4 top-4 font-brand text-[40px] leading-none text-red md:left-12">TIMIR</span>
      <motion.h2
        id="who-title"
        className="mb-10 text-[clamp(2rem,4vw,3.5rem)] font-medium"
        initial={reduce ? false : { opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Who&apos;s watching?
      </motion.h2>
      <ul className="grid grid-cols-2 gap-6 sm:flex sm:gap-7">
        {viewers.map((v, i) => (
          <motion.li
            key={v.id}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
          >
            <button
              ref={i === 0 ? first : undefined}
              type="button"
              onClick={() => onChoose(v.id)}
              className="group flex w-[38vw] max-w-[190px] flex-col items-center text-center focus-visible:outline-none sm:w-[clamp(120px,13vw,190px)]"
            >
              <span
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-2xl border-[3px] shadow-[0_14px_30px_rgba(0,0,0,.6)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105",
                  current === v.id ? "border-white" : "border-transparent group-hover:border-white group-focus-visible:border-white",
                )}
                style={{ background: v.tile }}
              >
                {v.avatar.kind === "portrait" ? (
                  <Portrait className="absolute inset-0" fade={false} alt="" />
                ) : (
                  <RivePlayer
                    src={v.avatar.src}
                    stateMachine={v.avatar.stateMachine}
                    artboard={v.avatar.artboard}
                    label=""
                    className="absolute inset-0"
                    canvasClassName="h-full"
                  />
                )}
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,.25)_0%,rgba(255,255,255,.06)_28%,transparent_45%)]" />
                {v.id === "timir" && (
                  <span className="absolute right-2 top-2 rounded-full bg-red px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider shadow-[0_0_12px_rgba(229,9,20,.6)]">
                    MAIN
                  </span>
                )}
              </span>
              <span className="mt-3 text-lg font-semibold text-[#ddd] group-hover:text-white md:text-xl">{v.name}</span>
              <span className="mt-1 text-xs leading-snug text-[#808080] md:text-[13px]">{v.blurb}</span>
            </button>
          </motion.li>
        ))}
      </ul>
      <p className="mt-10 max-w-md text-center text-sm text-[#808080]">Every profile watches the same true story — it only changes what plays first.</p>
      {onClose && (
        <button type="button" onClick={onClose} className="mt-6 min-h-11 border border-[#808080] px-6 text-sm tracking-[0.2em] text-[#808080] hover:border-white hover:text-white">
          DONE
        </button>
      )}
    </div>
  );
}
