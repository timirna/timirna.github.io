"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { RivePlayer, type RiveHandle } from "@/components/media/RivePlayer";

const words = ["Motion", "makes", "it", "matter."];

export function Hero() {
  const reduce = useReducedMotion();
  const aria = useRef<RiveHandle>(null);

  const greet = (on: boolean) => {
    aria.current?.setNumber("Expression", on ? 1 : 0);
    aria.current?.setBoolean("Speaking", on);
  };

  return (
    <section aria-labelledby="hero-title" className="container-page pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-8 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-block h-2 w-2 rounded-full bg-lime ring-4 ring-lime/30" aria-hidden />
            Independent motion designer <span aria-hidden>/</span> Lottie <span aria-hidden>/</span> Rive
          </p>
          <h1 id="hero-title" className="display text-[clamp(3.5rem,11vw,9.5rem)]" aria-label="Motion makes it matter.">
            {words.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
                <motion.span
                  className={i === 3 ? "inline-block text-violet" : "inline-block"}
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              I design and animate expressive experiences for products, brands, and the web — from lightweight Lottie interactions to
              character-driven Rive systems.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/work/">Explore work</Button>
              <Button href="/contact/" variant="secondary">
                Let&apos;s talk
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.figure
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            tabIndex={0}
            onPointerEnter={() => greet(true)}
            onPointerLeave={() => greet(false)}
            onFocus={() => greet(true)}
            onBlur={() => greet(false)}
            className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface shadow-[0_1px_0_var(--line),0_30px_60px_-30px_rgba(23,23,23,0.25)] sm:aspect-square lg:aspect-[4/5]"
            aria-label="Aria, a live Rive character. Hover or focus to make Aria smile and talk."
          >
            <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lime/60 blur-2xl" />
            <div aria-hidden className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
            <RivePlayer
              handleRef={aria}
              src="/animations/rive/aria.riv"
              stateMachine="Aria"
              label="Aria, an animated teacher character"
              className="absolute inset-0"
              canvasClassName="h-full"
              fallbackHref="/aria-preview/"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
            <span>
              <span className="font-mono text-xs uppercase tracking-wider text-ink">Live Rive</span> · Aria teacher rig
            </span>
            <span className="hidden sm:inline">Hover to say hi</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
