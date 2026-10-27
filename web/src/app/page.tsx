import { Hero } from "@/components/sections/Hero";
import { Showreel } from "@/components/sections/Showreel";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Expertise } from "@/components/sections/Expertise";
import { PlaygroundPreview } from "@/components/sections/PlaygroundPreview";
import { Process } from "@/components/sections/Process";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Showreel />
      <SelectedWork />
      <Expertise />
      <PlaygroundPreview />
      <Process />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
