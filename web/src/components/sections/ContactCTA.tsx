import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="container-page pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-lg bg-violet px-6 py-16 text-white md:px-14 md:py-24">
        <div aria-hidden className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-lime/90 blur-[2px] md:h-[28rem] md:w-[28rem]" />
        <div className="relative">
          <p className="eyebrow mb-6 !text-white/70">Contact</p>
          <h2 id="cta-title" className="display max-w-4xl text-[clamp(2.75rem,8vw,7rem)]">
            Have something in mind? Let&apos;s make it move.
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`} variant="lime">
              {site.email}
            </Button>
            <Button href="/contact/" variant="on-dark">
              Project form
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
