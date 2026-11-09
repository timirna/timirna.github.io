import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects, sohopayFilms } from "@/data/projects";
import type { Project } from "@/types/project";
import { RivePlayer } from "@/components/media/RivePlayer";
import { LottiePlayer } from "@/components/media/LottiePlayer";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { MediaPlaceholder } from "@/components/project/ProjectMedia";
import { PlayButton } from "@/components/netflix/PlayButton";
import { EpisodeList } from "@/components/netflix/EpisodeList";
import { Row } from "@/components/netflix/Row";
import { TitleCard } from "@/components/netflix/TitleCard";
import { JoinCTA } from "@/components/netflix/JoinCTA";
import { riveHintsFor } from "@/data/rive-hints";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const img = p.backdrop ?? (p.cover && !p.cover.endsWith(".gif") ? p.cover : undefined);
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { title: p.title, description: p.summary, images: img ? [img] : undefined },
  };
}

function moreLikeThis(p: Project) {
  return projects
    .filter((o) => o.slug !== p.slug && o.status !== "in-progress")
    .map((o) => ({ o, score: o.categories.filter((c) => p.categories.includes(c)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((x) => x.o);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const backdrop = p.backdrop ?? p.cover;
  const live = !!p.riveFile || !!p.lottieFiles?.length;
  const isSoho = p.slug === "sohopay-launch-films";
  const similar = moreLikeThis(p);

  const facts = [
    p.client && ["Client", p.client],
    p.role && ["Role", p.role],
    p.services?.length && ["Formats", p.services.join(", ")],
    p.tools?.length && ["Tools", p.tools.join(", ")],
    p.deliverables?.length && ["Deliverables", p.deliverables.join(" · ")],
    ["Genres", p.categories.join(", ")],
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
      {/* Title page */}
      <header className="relative min-h-[78svh] w-full overflow-hidden md:min-h-[86vh]">
        {backdrop ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={backdrop} alt={p.coverAlt} className="absolute inset-0 h-full w-full object-cover" />
        ) : p.riveFile ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,#3a3a3a_0%,#1a1a1a_45%,#141414_75%)]">
            <RivePlayer
              src={p.riveFile}
              stateMachine={p.riveStateMachine}
              artboard={p.riveArtboard}
              label={p.coverAlt}
              hints={riveHintsFor(p.riveStateMachine)}
              className="absolute inset-y-[10%] right-0 w-full md:w-[60%]"
              canvasClassName="h-full"
              fallbackHref={p.externalDemo}
            />
          </div>
        ) : p.lottieFiles?.length ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,#3a3a3a_0%,#1a1a1a_45%,#141414_75%)]">
            <div className="absolute inset-y-[14%] right-[4%] w-full rounded-lg bg-[#efece4] p-[3%] md:w-[46%]">
              <LottiePlayer files={p.lottieFiles.slice(0, 1)} label={p.coverAlt} className="h-full" stageClassName="h-full" />
            </div>
          </div>
        ) : (
          <MediaPlaceholder title={p.title} className="absolute inset-0" />
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(77deg,rgba(0,0,0,.8)_0%,rgba(0,0,0,.35)_45%,transparent_80%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />

        <div className="relative flex min-h-[78svh] flex-col justify-end px-4 pb-14 pt-28 md:min-h-[86vh] md:max-w-[52%] md:px-12 md:pb-20">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#b3b3b3]">
            <Link href="/work/" className="hover:text-white">
              ← Browse
            </Link>
          </nav>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-[#ddd]">
            <span className="font-brand text-[34px] leading-none tracking-normal text-red">T</span>
            {p.riveFile ? "Live Rive" : p.lottieFiles?.length ? "Live Lottie" : isSoho ? "Films" : "Project"}
          </p>
          <h1 className="mt-2 text-[clamp(2.5rem,6vw,5.25rem)] font-extrabold leading-[0.95] tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,.5)]">
            {p.title}
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-[#ddd]">
            {p.status === "in-progress" ? (
              <span className="font-semibold text-[#bcbcbc]">Coming soon</span>
            ) : (
              <span className="font-semibold text-green">{p.year ? "New" : "Featured"}</span>
            )}
            {p.year && <span>{p.year}</span>}
            {p.client && <span className="rounded-sm border border-white/50 px-1.5 text-xs">{p.client}</span>}
            <span>{p.categories.join(" • ")}</span>
          </p>
          <p className="mt-4 max-w-xl text-lg leading-snug [text-shadow:0_1px_6px_rgba(0,0,0,.6)]">{p.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {p.heroVideo ? (
              <PlayButton src={p.heroVideo} poster={p.cover && !p.cover.endsWith(".gif") ? p.cover : undefined} title={p.title} />
            ) : live ? (
              <a href="#breakdown" className="flex min-h-11 items-center gap-2 rounded bg-white px-6 text-lg font-bold text-black hover:bg-white/75 md:px-8">
                <span aria-hidden>▶</span> Try it live
              </a>
            ) : null}
            {p.externalDemo && (
              <a
                href={p.externalDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 rounded bg-[rgba(109,109,110,.7)] px-6 text-lg font-bold text-white hover:bg-[rgba(109,109,110,.4)]"
              >
                Full demo ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About this title */}
      <div className="grid gap-10 px-4 pb-10 md:grid-cols-[2fr_1fr] md:gap-16 md:px-12">
        <div className="space-y-10">
          {p.challenge && (
            <section aria-labelledby="challenge">
              <h2 id="challenge" className="text-2xl font-semibold">
                The brief
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-[#d2d2d2]">{p.challenge}</p>
            </section>
          )}
          {p.approach?.length ? (
            <section aria-labelledby="approach">
              <h2 id="approach" className="text-2xl font-semibold">
                How it was made
              </h2>
              <div className="mt-3 space-y-4 text-lg leading-relaxed text-[#d2d2d2]">
                {p.approach.map((a) => (
                  <p key={a.slice(0, 32)}>{a}</p>
                ))}
              </div>
            </section>
          ) : null}
          {p.process?.length ? (
            <section aria-labelledby="process">
              <h2 id="process" className="text-2xl font-semibold">
                Process
              </h2>
              <ol className="mt-6 grid gap-6 sm:grid-cols-2">
                {p.process.map((step, i) => (
                  <li key={step.title} className="rounded-md border border-white/10 bg-[#1a1a1a] p-5">
                    <p className="text-xs font-bold tracking-[0.2em] text-red">
                      {String(i + 1).padStart(2, "0")} · {step.title}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-[#d2d2d2]">{step.text}</p>
                    {step.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={step.image} alt="" className="mt-4 w-full rounded object-cover" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          {p.status === "in-progress" && (
            <p className="rounded border border-dashed border-[#404040] p-6 text-[#d2d2d2]">
              Media and details for this project are being prepared.{" "}
              <a href={`mailto:${site.email}`} className="text-white underline underline-offset-4">
                Ask me about it
              </a>
              .
            </p>
          )}
        </div>
        <dl className="space-y-3 text-sm">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="inline text-[#777]">{k}: </dt>
              <dd className="inline text-[#ddd]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {isSoho && (
        <section aria-labelledby="episodes" className="px-4 pb-14 md:px-12">
          <div className="mb-4 flex items-end justify-between">
            <h2 id="episodes" className="text-2xl font-semibold">
              Films
            </h2>
            <span className="text-lg text-[#d2d2d2]">{sohopayFilms.length} films</span>
          </div>
          <EpisodeList films={sohopayFilms} />
        </section>
      )}

      {live && (
        <section id="breakdown" aria-labelledby="breakdown-title" className="scroll-mt-24 px-4 pb-14 md:px-12">
          <h2 id="breakdown-title" className="text-2xl font-semibold">
            Try it live
          </h2>
          <p className="mt-1 text-[#a3a3a3]">Every control below is read from the file itself.</p>
          <div className="mt-6 max-w-4xl rounded-md bg-surface p-4 md:p-8">
            {p.riveFile ? (
              <RivePlayer
                src={p.riveFile}
                stateMachine={p.riveStateMachine}
                artboard={p.riveArtboard}
                label={p.coverAlt}
                showControls
                hints={riveHintsFor(p.riveStateMachine)}
                canvasClassName="aspect-square md:aspect-[4/3] rounded bg-[radial-gradient(circle_at_50%_45%,#3a3a3a_0%,#1c1c1c_65%)]"
                fallbackHref={p.externalDemo}
              />
            ) : (
              <LottiePlayer files={p.lottieFiles!} label={p.coverAlt} showControls stageClassName="aspect-[4/3] rounded bg-[#efece4] p-6" />
            )}
          </div>
        </section>
      )}

      {p.gallery?.length ? (
        <section aria-labelledby="gallery" className="px-4 pb-14 md:px-12">
          <h2 id="gallery" className="mb-6 text-2xl font-semibold">
            Trailers &amp; more
          </h2>
          <ProjectGallery items={p.gallery} />
        </section>
      ) : null}

      {similar.length > 0 && (
        <Row title="More like this" id="similar">
          {similar.map((o) => (
            <TitleCard key={o.slug} project={o} />
          ))}
        </Row>
      )}
      <JoinCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkLd) }} />
    </article>
  );
}
