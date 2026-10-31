import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const areas = [
  {
    title: "Rive characters & state machines",
    body: "Mascots and avatars rigged with bones and one clear state machine, so your app can drive moods, reactions and lip-sync in real time.",
    tag: ".riv",
  },
  {
    title: "Lottie for web & apps",
    body: "Splash screens, icons, onboarding and logo moments exported clean — small files that render crisply on iOS, Android and the web.",
    tag: ".json",
  },
  {
    title: "UI / UX motion",
    body: "Micro-interactions and transitions that explain what just happened, with timing and easing your developers can match.",
    tag: "UI",
  },
  {
    title: "2D explainers & brand animation",
    body: "Script-to-screen explainers and brand pieces that make a complex product feel simple in under two minutes.",
    tag: "MP4",
  },
];

export function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className="py-20 md:py-24">
      <SectionHeading id="expertise-title" eyebrow="Expertise" title="Four things I do, properly." />
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {areas.map((a, i) => (
          <li key={a.title} className="bg-bg">
            <Reveal delay={i * 0.06} className="group flex h-full flex-col justify-between gap-12 p-6 transition-colors duration-300 hover:bg-surface md:p-10">
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-sm text-muted">0{i + 1}</span>
                <span className="rounded-sm bg-red px-2 py-0.5 font-mono text-xs text-white transition-transform duration-300 group-hover:-rotate-6">{a.tag}</span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{a.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{a.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
