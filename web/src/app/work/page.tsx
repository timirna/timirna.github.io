import type { Metadata } from "next";
import { WorkIndex } from "./WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description: "Rive characters, Lottie animation, UI motion, 2D explainers and video by Timir.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <div className="container-page pb-24 pt-12 md:pt-20">
      <p className="eyebrow mb-6">Work</p>
      <h1 className="display max-w-5xl text-[clamp(3rem,8vw,7rem)]">Every project, every format.</h1>
      <WorkIndex />
    </div>
  );
}
