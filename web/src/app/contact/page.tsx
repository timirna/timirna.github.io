import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a motion project with Timir — Lottie, Rive, UI motion or explainers.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="container-page pb-24 pt-28 md:pt-32">
      <p className="eyebrow mb-6">Contact</p>
      <h1 className="display max-w-5xl text-[clamp(3rem,8vw,7rem)]">Let&apos;s make it move.</h1>
      <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-10">
          <div>
            <p className="eyebrow mb-3">Email</p>
            <a href={`mailto:${site.email}`} className="text-2xl font-medium underline decoration-line underline-offset-8 hover:decoration-violet md:text-3xl">
              {site.email}
            </a>
          </div>
          <div>
            <p className="eyebrow mb-3">Elsewhere</p>
            <ul className="space-y-2 text-lg">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-violet">
                    {s.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-sm text-muted">Tell me what you&apos;re making, where the motion will live and your timing. I usually reply within a working day.</p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
