"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const KEY = "timir.progress";

export function readProgress(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Remembers how far down each page the visitor has scrolled (0–100), for the "Continue Exploring" bars. */
export function WatchProgress() {
  const pathname = usePathname();
  useEffect(() => {
    let frame = 0;
    const save = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const pct = max > 0 ? Math.round((scrollY / max) * 100) : 100;
      const all = readProgress();
      if ((all[pathname] ?? 0) >= pct) return;
      all[pathname] = pct;
      try {
        localStorage.setItem(KEY, JSON.stringify(all));
      } catch {}
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(save);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return null;
}
