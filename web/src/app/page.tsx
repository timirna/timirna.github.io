import { getProject, homeRows, projectsBySlugs, sohopayFilms, topPicks } from "@/data/projects";
import { Billboard } from "@/components/netflix/Billboard";
import { Row } from "@/components/netflix/Row";
import { TitleCard } from "@/components/netflix/TitleCard";
import { TopTenRow } from "@/components/netflix/TopTenRow";
import { FilmRow } from "@/components/netflix/FilmRow";
import { JoinCTA } from "@/components/netflix/JoinCTA";

export default function Home() {
  const soho = getProject("sohopay-launch-films")!;
  const [first, ...rest] = homeRows;
  return (
    <>
      <Billboard
        title="SohoPay"
        label="FILMS"
        meta={["2026", "8 films", "0:22 – 1:20", "SaaS • Explainer • Brand"]}
        summary={soho.summary}
        backdrop="/assets/sohopay-link-film.jpg"
        teaser="/inovetix-reel/videos/SohoPay_Film_Link_Reference_v06h.mp4"
        film={{ src: "/assets/sohopay-launch.mp4", poster: "/assets/sohopay-launch.jpg", title: "SohoPay — Launch Film" }}
        moreHref="/work/sohopay-launch-films/"
      />
      <div className="relative z-10 -mt-[12vw] md:-mt-[9vw]">
        <Row title={first.title} note={first.note} id="row-0">
          {projectsBySlugs(first.slugs).map((p) => (
            <TitleCard key={p.slug} project={p} />
          ))}
        </Row>
        <TopTenRow title="Top 10 picks" projects={projectsBySlugs(topPicks)} />
        <FilmRow title="SohoPay — the eight films" note="Click to play" films={sohopayFilms} />
        {rest.map((r, i) => (
          <Row key={r.title} title={r.title} note={r.note} id={`row-${i + 1}`}>
            {projectsBySlugs(r.slugs).map((p) => (
              <TitleCard key={p.slug} project={p} />
            ))}
          </Row>
        ))}
        <JoinCTA />
      </div>
    </>
  );
}
