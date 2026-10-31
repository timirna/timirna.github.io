"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { viewers, type Viewer, type ViewerId } from "@/data/series";
import { OpeningSequence } from "./OpeningSequence";
import { ProfileSelector } from "./ProfileSelector";

type Stage = "idle" | "opening" | "profiles";

type SeriesState = {
  viewer: Viewer | null;
  chooseViewer: (id: ViewerId) => void;
  openProfiles: () => void;
  replayOpening: () => void;
};

const SeriesContext = createContext<SeriesState | null>(null);
const KEY = "timir.viewer";

function readViewer(): ViewerId | null {
  try {
    const v = localStorage.getItem(KEY);
    return viewers.some((x) => x.id === v) ? (v as ViewerId) : null;
  } catch {
    return null;
  }
}

/**
 * First visit to the homepage: opening sequence → "Who's watching?".
 * The chosen profile is remembered (localStorage) and only reorders the homepage.
 */
export function SeriesProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [viewerId, setViewerId] = useState<ViewerId | null>(null);
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    const saved = readViewer();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage after mount
    setViewerId(saved);
    if (!saved && pathname === "/") setStage("opening");
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chooseViewer = useCallback((id: ViewerId) => {
    setViewerId(id);
    try {
      localStorage.setItem(KEY, id);
    } catch {}
    setStage("idle");
    window.scrollTo(0, 0);
  }, []);

  const value: SeriesState = {
    viewer: viewers.find((v) => v.id === viewerId) ?? null,
    chooseViewer,
    openProfiles: () => setStage("profiles"),
    replayOpening: () => setStage("opening"),
  };

  return (
    <SeriesContext.Provider value={value}>
      {children}
      {stage === "opening" && <OpeningSequence onDone={() => setStage("profiles")} />}
      {stage === "profiles" && <ProfileSelector current={viewerId} onChoose={chooseViewer} onClose={viewerId ? () => setStage("idle") : undefined} />}
    </SeriesContext.Provider>
  );
}

export function useSeries() {
  const ctx = useContext(SeriesContext);
  if (!ctx) throw new Error("useSeries must be used inside SeriesProvider");
  return ctx;
}
