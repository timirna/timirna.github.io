import type { Metadata } from "next";
import { Journey } from "./Journey";
import { projectsBySlugs } from "@/data/projects";
import { seasons } from "@/data/series";

export const metadata: Metadata = {
  title: "My Journey",
  description: "Timir's story as a series: three seasons, from design studio work to independent motion design.",
  alternates: { canonical: "/journey/" },
};

export default function JourneyPage() {
  const data = seasons.map((s) => ({ ...s, projects: projectsBySlugs(s.episodes) }));
  return <Journey seasons={data} />;
}
