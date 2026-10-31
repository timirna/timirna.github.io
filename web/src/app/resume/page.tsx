import type { Metadata } from "next";
import Link from "next/link";
import { cv } from "@/data/cv";
import { site } from "@/data/site";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${cv.name} — ${cv.title}. ${cv.focus}.`,
  alternates: { canonical: "/resume/" },
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_80%_0%,#2a1520_0%,#141119_40%,#141414_100%)] px-4 pb-24 pt-24 md:px-12 md:pt-28 print:bg-white print:p-0 print:text-black">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/" className="text-sm text-[#b3b3b3] hover:text-white">
          ← Back to the series
        </Link>
        <div className="flex flex-wrap gap-2">
          {cv.pdf && (
            <a href={cv.pdf} download className="flex min-h-11 items-center gap-2 rounded bg-white px-5 font-bold text-black hover:bg-white/80">
              ⤓ Download PDF
            </a>
          )}
          <PrintButton />
        </div>
      </div>

      <article className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#181818] shadow-[0_30px_80px_rgba(0,0,0,.5)] print:border-0 print:bg-white print:shadow-none">
        <header className="relative border-b border-white/10 bg-[linear-gradient(120deg,#3a0a14,#181818_60%)] px-6 py-10 md:px-12 print:bg-none">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.35em] text-[#ddd] print:text-black">
            <span className="font-brand text-3xl tracking-normal text-red">T</span>RÉSUMÉ
          </p>
          <h1 className="mt-2 font-brand text-[clamp(3rem,8vw,5.5rem)] leading-[0.9]">{cv.name}</h1>
          <p className="mt-2 text-xl font-semibold">{cv.title}</p>
          <p className="mt-1 text-[#bcbcbc] print:text-black">{cv.focus}</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#ddd] print:text-black">
            <li>{cv.location}</li>
            <li>
              <a href={`mailto:${site.email}`} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.url} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                timirna.github.io
              </a>
            </li>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </header>

        <div className="grid gap-10 px-6 py-10 md:grid-cols-[2fr_1fr] md:px-12">
          <div className="space-y-10">
            <section aria-labelledby="cv-profile">
              <h2 id="cv-profile" className="text-xs font-bold tracking-[0.3em] text-red">PROFILE</h2>
              <p className="mt-3 text-lg leading-relaxed text-[#e5e5e5] print:text-black">{cv.profile}</p>
            </section>

            <section aria-labelledby="cv-exp">
              <h2 id="cv-exp" className="text-xs font-bold tracking-[0.3em] text-red">EXPERIENCE</h2>
              <ol className="mt-4 space-y-7">
                {cv.experience.map((e) => (
                  <li key={e.role + e.dates} className="border-l-2 border-red/70 pl-4">
                    <p className="flex flex-wrap justify-between gap-x-4 font-semibold">
                      <span>{e.role}</span>
                      <span className="text-sm font-normal text-[#a3a3a3] print:text-black">{e.dates}</span>
                    </p>
                    <p className="text-sm text-[#bcbcbc] print:text-black">{e.org}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-[#d2d2d2] marker:text-red print:text-black">
                      {e.points.map((pt) => (
                        <li key={pt.slice(0, 30)}>{pt}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="cv-projects">
              <h2 id="cv-projects" className="text-xs font-bold tracking-[0.3em] text-red">SELECTED PROJECTS</h2>
              <ul className="mt-4 divide-y divide-white/10">
                {cv.projects.map((p) => (
                  <li key={p.name} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]">
                    <span className="font-semibold">
                      {p.href ? (
                        <Link href={p.href} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                          {p.name}
                        </Link>
                      ) : (
                        p.name
                      )}
                    </span>
                    <span className="text-[15px] text-[#d2d2d2] print:text-black">
                      {p.what} <span className="text-[#808080]">· {p.tools}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-10">
            <section aria-labelledby="cv-skills">
              <h2 id="cv-skills" className="text-xs font-bold tracking-[0.3em] text-red">SKILLS</h2>
              <dl className="mt-4 space-y-4">
                {cv.skills.map((s) => (
                  <div key={s.area}>
                    <dt className="font-semibold">{s.area}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-[#bcbcbc] print:text-black">{s.items}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section aria-labelledby="cv-edu">
              <h2 id="cv-edu" className="text-xs font-bold tracking-[0.3em] text-red">EDUCATION</h2>
              <ul className="mt-4 space-y-4">
                {cv.education.map((e) => (
                  <li key={e.what}>
                    <p className="font-semibold">{e.what}</p>
                    <p className="text-sm text-[#bcbcbc] print:text-black">{e.where}</p>
                    <p className="text-xs text-[#808080]">{e.dates}</p>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </div>
  );
}
