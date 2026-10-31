"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Row } from "@/components/netflix/Row";
import { readProgress } from "./WatchProgress";

const tiles = [
  { href: "/journey/", kicker: "Episode 1", title: "The Full Story", bg: "linear-gradient(135deg,#e50914,#5c0a0d)" },
  { href: "/work/countly-character/", kicker: "Live", title: "My Characters", bg: "linear-gradient(135deg,#7a3cff,#2a0f5c)" },
  { href: "/work/sohopay-launch-films/", kicker: "8 films", title: "SohoPay", bg: "linear-gradient(135deg,#0f9b8e,#073b37)" },
  { href: "/about/", kicker: "Tools", title: "My Skills", bg: "linear-gradient(135deg,#f2a516,#6b4206)" },
  { href: "/playground/", kicker: "Behind the scenes", title: "Playground", bg: "linear-gradient(135deg,#2b6cb0,#0d2647)" },
];

/** Category tiles with real "watched" bars from how far the visitor has scrolled each page. */
export function ContinueExploring() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read localStorage after mount
    setProgress(readProgress());
  }, []);
  return (
    <Row title="Continue Exploring" id="continue">
      {tiles.map((t) => {
        const pct = progress[t.href] ?? 0;
        return (
          <Link
            key={t.href}
            href={t.href}
            data-card
            className="group relative flex aspect-video w-[62vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded p-3 transition-transform duration-300 hover:scale-105 sm:w-[40vw] md:w-[calc((100vw-6rem-2.5rem)/5)] xl:w-[calc((100vw-6rem-3rem)/6)]"
            style={{ background: t.bg }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">{t.kicker}</span>
            <span className="font-brand text-[clamp(1.75rem,2.6vw,2.75rem)] leading-[0.9]">{t.title}</span>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-white/25" aria-hidden>
              <span className="block h-full bg-red" style={{ width: `${pct}%` }} />
            </span>
            <span className="sr-only">{pct ? `${pct}% explored` : "Not started"}</span>
          </Link>
        );
      })}
    </Row>
  );
}
