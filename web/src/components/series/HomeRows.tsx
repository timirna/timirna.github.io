"use client";

import type { ReactNode } from "react";
import { useSeries } from "./SeriesProvider";
import { viewers } from "@/data/series";

/** Orders the homepage rows for the current "Who's watching?" profile. */
export function HomeRows({ rows }: { rows: Record<string, ReactNode> }) {
  const { viewer } = useSeries();
  const order = (viewer ?? viewers[0]).rows;
  const keys = [...order.filter((k) => k in rows), ...Object.keys(rows).filter((k) => !order.includes(k))];
  return <>{keys.map((k) => <div key={k}>{rows[k]}</div>)}</>;
}
