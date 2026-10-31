import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "work/", "playground/", "journey/", "resume/", "about/", "contact/"].map((p) => ({ url: `${site.url}/${p}` }));
  return [...pages, ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}/` }))];
}
