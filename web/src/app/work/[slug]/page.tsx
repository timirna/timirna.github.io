import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, nextProject, projects } from "@/data/projects";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { RivePlayer } from "@/components/media/RivePlayer";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { MediaPlaceholder } from "@/components/project/ProjectMedia";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ariaHints, catHints } from "@/data/rive-hints";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { title: p.title, description: p.summary, images: p.cover && !p.cover.endsWith(".gif") ? [p.cover] : undefined },
  };
}

const hintsFor = (sm?: string) => (sm === "Aria" ? ariaHints : sm === "Cat_SM" ? catHints : undefined);

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = nextProject(slug);

  const meta = [
    p.client && ["Client", p.client],
    p.year && ["Year", String(p.year)],
    p.role && ["Role", p.role],
    p.services?.length && ["Services", p.services.join(", ")],
    p.tools?.length && ["Tools", p.tools.join(", ")],
    p.deliverables?.length && ["Deliverables", p.deliverables.join(", ")],
  ].filter(Boolean) as [string, string][];

  const creativeWorkLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    creator: { "@type": "Person", name: site.name },
    url: `${site.url}/work/${p.slug}/`,
  };

  return (
    <article>
      <div className="container-page pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex gap-2">
            <li>
              <Link href="/work/" className="hover:text-ink">
                ← Work
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {p.title}
            </li>
          </ol>
        </nav>
        <header className="mt-10 grid gap-8 md:mt-16 lg:grid-cols-[2fr_1fr] lg:items-end">
          <div>
            <ul className="mb-6 flex flex-wrap gap-2" aria-label="Categories">
              {p.status === "in-progress" && <li className="chip border-ink/30 text-ink">In progress</li>}
              {p.categories.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
            <h1 className="display text-[clamp(2.75rem,7vw,6.5rem)]">{p.title}</h1>
          </div>
          <p className="text-lg leading-relaxed text-muted">{p.summary}</p>
        </header>
      </div>

      <div className="container-page mt-12 md:mt-16">
        <Hero project={p} />
      </div>

      <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_2fr]">
        <aside>
          {meta.length > 0 && (
            <dl className="space-y-5 lg:sticky lg:top-28">
              {meta.map(([k, v]) => (
                <div key={k} className="border-t border-line pt-3">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </aside>
        <div className="space-y-14">
          {p.challenge && (
            <section aria-labelledby="challenge">
              <h2 id="challenge" className="text-3xl font-semibold tracking-tight">
                Challenge
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{p.challenge}</p>
            </section>
          )}
          {p.approach?.length ? (
            <section aria-labelledby="approach">
              <h2 id="approach" className="text-3xl font-semibold tracking-tight">
                Approach
              </h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
                {p.approach.map((a) => (
                  <p key={a.slice(0, 24)}>{a}</p>
                ))}
              </div>
            </section>
          ) : null}

          {(p.riveFile || (p.lottieFiles && p.lottieFiles.length > 0)) && (
            <section aria-labelledby="breakdown">
              <h2 id="breakdown" className="text-3xl font-semibold tracking-tight">
                Animation breakdown
              </h2>
              <p className="mt-2 text-muted">Live and interactive — the controls below come straight from the file.</p>
              <div className="mt-6 rounded-lg bg-surface p-5 md:p-8">
                {p.riveFile ? (
                  <RivePlayer
                    src={p.riveFile}
                    stateMachine={p.riveStateMachine}
                    artboard={p.riveArtboard}
                    label={p.coverAlt}
                    showControls
                    hints={hintsFor(p.riveStateMachine)}
                    canvasClassName="aspect-square md:aspect-[4/3]"
                    fallbackHref={p.externalDemo}
                  />
                ) : (
                  <LottiePlayer files={p.lottieFiles!} label={p.coverAlt} showControls stageClassName="aspect-[4/3]" />
                )}
              </div>
              {p.externalDemo && (
                <a href={p.externalDemo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-violet">
                  Open the full standalone demo ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </section>
          )}

          {p.status === "in-progress" && (
            <p className="rounded-md border border-dashed border-line p-6 text-muted">
              Media and details for this project are being prepared. Want to see it sooner?{" "}
              <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                Ask me directly
              </a>
              .
            </p>
          )}
        </div>
      </div>

      {p.gallery?.length ? (
        <section aria-labelledby="gallery" className="container-page pb-16 md:pb-24">
          <h2 id="gallery" className="mb-8 text-3xl font-semibold tracking-tight">
            Gallery
          </h2>
          <ProjectGallery items={p.gallery} />
        </section>
      ) : null}

      {next && next.slug !== p.slug && (
        <nav aria-label="Next project" className="container-page pb-16 md:pb-24">
          <Link href={`/work/${next.slug}/`} className="group block border-t border-line pt-6">
            <span className="eyebrow">Next project</span>
            <span className="display mt-3 flex items-center justify-between gap-6 text-[clamp(2.25rem,6vw,5rem)] transition-colors group-hover:text-violet">
              {next.title}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
        </nav>
      )}
      <ContactCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkLd) }} />
    </article>
  );
}

function Hero({ project: p }: { project: NonNullable<ReturnType<typeof getProject>> }) {
  const frame = "overflow-hidden rounded-lg bg-surface";
  if (p.heroVideo)
    return (
      <div className={`${frame} aspect-video bg-dark`}>
        <VideoPlayer src={p.heroVideo} poster={p.cover && !p.cover.endsWith(".gif") ? p.cover : undefined} label={`${p.title} video`} />
      </div>
    );
  if (p.cover)
    return (
      <div className={`${frame} aspect-[4/3] md:aspect-[21/9]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover} alt={p.coverAlt} className="h-full w-full object-contain" />
      </div>
    );
  if (p.riveFile || p.lottieFiles?.length) return null; // shown live in the breakdown
  return <MediaPlaceholder title={p.title} className={`${frame} aspect-[4/3] md:aspect-[21/9]`} />;
}
