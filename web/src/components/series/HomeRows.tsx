"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useSeries } from "./SeriesProvider";
import { viewers } from "@/data/series";

/** Orders the homepage rows for the current "Who's watching?" profile. */
export function HomeRows({ rows }: { rows: Record<string, ReactNode> }) {
  const { viewer } = useSeries();
  const order = (viewer ?? viewers[0]).rows;
  const keys = [...order.filter((k) => k in rows), ...Object.keys(rows).filter((k) => !order.includes(k))];
  return (
    <>
      {keys.map((k, i) => (
        <Reveal key={k} delay={Math.min(i * 0.04, 0.2)}>
          {rows[k]}
        </Reveal>
      ))}
    </>
  );
}
