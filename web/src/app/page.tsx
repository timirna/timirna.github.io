import { homeRows, projectsBySlugs, sohopayFilms, topPicks } from "@/data/projects";
import { Row } from "@/components/netflix/Row";
import { TitleCard } from "@/components/netflix/TitleCard";
import { TopTenRow } from "@/components/netflix/TopTenRow";
import { FilmRow } from "@/components/netflix/FilmRow";
import { SeriesBillboard } from "@/components/series/SeriesBillboard";
import { ContinueExploring } from "@/components/series/ContinueExploring";
import { HomeRows } from "@/components/series/HomeRows";
import { FinalCTA } from "@/components/series/FinalCTA";

const rowIds = ["characters", "explainers", "lottie", "logos", "edits"];

export default function Home() {
  const rows: Record<string, React.ReactNode> = {
    continue: <ContinueExploring />,
    top: <TopTenRow title="Top 10 picks" projects={projectsBySlugs(topPicks)} />,
    films: <FilmRow title="SohoPay — the eight films" note="Click to play" films={sohopayFilms} />,
  };
  homeRows.forEach((r, i) => {
    rows[rowIds[i]] = (
      <Row title={r.title} note={r.note} id={`row-${rowIds[i]}`}>
        {projectsBySlugs(r.slugs).map((p) => (
          <TitleCard key={p.slug} project={p} />
        ))}
      </Row>
    );
  });

  return (
    <>
      <SeriesBillboard />
      <div className="relative z-10 -mt-24">
        <HomeRows rows={rows} />
      </div>
      <FinalCTA />
    </>
  );
}
