import type { Metadata } from "next";
import { WorkIndex } from "./WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description: "Rive characters, Lottie animation, UI motion, 2D explainers and video by Timir.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <div className="px-4 pb-24 pt-24 md:px-12 md:pt-28">
      <h1 className="text-3xl font-bold md:text-[2.6rem]">Browse</h1>
      <p className="mt-2 text-[#a3a3a3]">Rive characters, Lottie, UI motion, explainers and edits.</p>
      <WorkIndex />
    </div>
  );
}
