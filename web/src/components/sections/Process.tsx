import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { t: "Understand", d: "A short brief or call to pin down the goal, where the motion will live and any technical limits (platform, file size, runtime).", o: "Scope, timeline and quote" },
  { t: "Design", d: "Style frames or a character sheet so we agree on the look before anything moves.", o: "Style frames / character sheet" },
  { t: "Animate", d: "Animation in After Effects or Rive, shared as previews at agreed checkpoints for feedback.", o: "Preview links at each round" },
  { t: "Deliver", d: "Production files tested in the target runtime, organised and named for your developers.", o: ".riv, Lottie .json, MP4 or GIF" },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="container-page py-20 md:py-28">
      <SectionHeading id="process-title" index="04" eyebrow="Process" title="Clear steps, no surprises." />
      <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => (
          <li key={s.t}>
            <Reveal delay={i * 0.08} className="flex h-full flex-col border-t-2 border-ink pt-5">
              <span className="font-mono text-sm text-violet">Step {i + 1}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{s.d}</p>
              <p className="mt-6 text-sm">
                <span className="eyebrow mr-2">Output</span>
                {s.o}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
