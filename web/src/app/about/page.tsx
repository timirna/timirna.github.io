import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { Expertise } from "@/components/sections/Expertise";
import { Process } from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "About",
  description: "Timir is an independent motion designer with a computer-science background, focused on Lottie, Rive and 2D motion.",
  alternates: { canonical: "/about/" },
};

const focus = ["Rive characters & state machines", "Lottie for web & apps", "UI / UX motion", "2D explainers & brand animation"];
const tools = ["After Effects", "Illustrator", "Figma", "Rive", "Lottie / Bodymovin", "Premiere Pro", "Blender", "Photoshop"];
const workflow = [
  ["Plan the rig before animating", "State machines and layer structure are mapped first, so adding a state later doesn't mean starting over."],
  ["Build for the runtime", "Files are checked in the actual player — Lottie on web and mobile, Rive in its runtime — before delivery."],
  ["Hand off cleanly", "Named inputs, documented states and organised files your developers can wire up without guessing."],
];
// TODO: confirm these entries before relying on them elsewhere (taken from the previous site).
const experience = [
  ["2023 — Now", "Freelance Motion Designer", "Fiverr"],
  ["2016 — 2023", "Creative Designer", "G Technologies — motion graphics, explainer videos, UI/UX prototypes"],
  ["2014 — 2017", "Executive (Design)", "Daffodil Japan IT — branding and image editing"],
];

export default function AboutPage() {
  return (
    <div className="container-page pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-6">About</p>
      <h1 className="display max-w-6xl text-[clamp(3rem,8vw,7rem)]">
        Making digital products feel <span className="text-violet">alive.</span>
      </h1>

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/d4449f9244fc2d18ac1524cd2a39594a-1777942378776/9a0e990d-23e8-4a41-8db5-ca2a1efc336a.jpg"
            alt="Portrait of Timir"
            className="aspect-[4/5] w-full max-w-sm rounded-lg object-cover"
          />
        </div>
        <Reveal className="space-y-6 text-xl leading-relaxed md:text-2xl">
          <p>
            I&apos;m Timir, an independent motion designer. I animate characters, interfaces and stories for products and brands — mostly as Lottie
            and Rive files that run live inside apps and websites.
          </p>
          <p className="text-muted">
            I studied computer science, so I think about how animation ships as much as how it looks: file size, runtime support, and how a
            developer will hook it up. That&apos;s why most of my work is delivered as interactive files rather than flat video.
          </p>
        </Reveal>
      </div>

      <section aria-labelledby="focus" className="mt-24 grid gap-8 border-t border-line pt-6 md:grid-cols-[1fr_2fr]">
        <h2 id="focus" className="eyebrow">
          Specialisation
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {focus.map((f) => (
            <li key={f} className="rounded-md bg-surface p-5 text-lg font-medium">
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="workflow" className="mt-20 grid gap-8 border-t border-line pt-6 md:grid-cols-[1fr_2fr]">
        <h2 id="workflow" className="eyebrow">
          How I work
        </h2>
        <ol className="space-y-8">
          {workflow.map(([t, d], i) => (
            <li key={t} className="grid gap-2 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-violet">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-1 text-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tools" className="mt-20 grid gap-8 border-t border-line pt-6 md:grid-cols-[1fr_2fr]">
        <h2 id="tools" className="eyebrow">
          Toolset
        </h2>
        <ul className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <li key={t} className="chip px-4 py-2 text-sm text-ink">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="experience" className="mt-20 grid gap-8 border-t border-line pt-6 md:grid-cols-[1fr_2fr]">
        <h2 id="experience" className="eyebrow">
          Experience
        </h2>
        <ol className="divide-y divide-line">
          {experience.map(([y, r, o]) => (
            <li key={y} className="grid gap-1 py-5 first:pt-0 sm:grid-cols-[10rem_1fr]">
              <span className="font-mono text-sm text-muted">{y}</span>
              <div>
                <p className="text-lg font-medium">{r}</p>
                <p className="text-muted">{o}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Expertise />
      <div id="process" className="scroll-mt-24">
        <Process />
      </div>

      <div className="mt-20 flex flex-wrap gap-3">
        <Button href="/contact/">Start a project</Button>
        <Button href={site.socials[0].href} variant="secondary">
          LinkedIn
        </Button>
      </div>
    </div>
  );
}
