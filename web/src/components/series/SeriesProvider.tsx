"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useLenis } from "lenis/react";
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
const VIEWER_KEY = "timir.viewer";
const SESSION_KEY = "timir.series.session";

function readViewer(): ViewerId | null {
  try {
    const v = localStorage.getItem(VIEWER_KEY);
    return viewers.some((x) => x.id === v) ? (v as ViewerId) : null;
  } catch {
    return null;
  }
}

function sessionDone(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "done";
  } catch {
    return false;
  }
}

/**
 * First visit in a browser session: opening sequence → "Who's watching?".
 * Completing the gate marks the session done (sessionStorage). The chosen
 * profile is remembered in localStorage and only reorders the homepage.
 */
export function SeriesProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [viewerId, setViewerId] = useState<ViewerId | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = readViewer();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate after mount
    setViewerId(saved);
    if (!sessionDone() && pathname === "/") setStage("opening");
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chooseViewer = useCallback(
    (id: ViewerId) => {
      setViewerId(id);
      try {
        localStorage.setItem(VIEWER_KEY, id);
        sessionStorage.setItem(SESSION_KEY, "done");
      } catch {}
      setStage("idle");
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    },
    [lenis],
  );

  const value: SeriesState = {
    viewer: viewers.find((v) => v.id === viewerId) ?? null,
    chooseViewer,
    openProfiles: () => setStage("profiles"),
    replayOpening: () => {
      try {
        sessionStorage.removeItem(SESSION_KEY);
      } catch {}
      setStage("opening");
    },
  };

  return (
    <SeriesContext.Provider value={value}>
      {children}
      {ready && stage === "opening" && <OpeningSequence onDone={() => setStage("profiles")} />}
      {ready && stage === "profiles" && (
        <ProfileSelector current={viewerId} onChoose={chooseViewer} onClose={viewerId ? () => setStage("idle") : undefined} />
      )}
    </SeriesContext.Provider>
  );
}

export function useSeries() {
  const ctx = useContext(SeriesContext);
  if (!ctx) throw new Error("useSeries must be used inside SeriesProvider");
  return ctx;
}
