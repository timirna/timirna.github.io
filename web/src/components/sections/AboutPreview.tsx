import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutPreview() {
  return (
    <section aria-labelledby="about-title" className="container-page py-20 md:py-28">
      <div className="grid gap-10 border-t border-line pt-6 md:grid-cols-[1fr_2fr]">
        <p className="eyebrow">
          <span className="mr-3 text-ink">05</span>About
        </p>
        <Reveal>
          <h2 id="about-title" className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.1] tracking-tight">
            I&apos;m Timir, an independent motion designer focused on making digital products feel{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">alive.</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-lime md:h-4" />
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            A computer-science background means I think about how animation ships, not just how it looks — file size, runtime and how developers
            will hook it up.
          </p>
          <div className="mt-8">
            <Button href="/about/" variant="secondary">
              More about me
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
