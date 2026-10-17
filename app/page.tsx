import { ArrowDown } from "lucide-react";
import { BioCard } from "@/components/portfolio/bio-card";
import { Experience } from "@/components/portfolio/experience";
import { Sections } from "@/components/portfolio/sections";

export default function Home() {
  return (
    <Experience>
      <a href="#content" className="skip-link">Lewati ke konten</a>
      <main id="content">
        <section id="top" data-section className="hero">
          <BioCard />
          <a href="#about" className="scroll-cue"><span>Kenalan lebih jauh</span><ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" /></a>
        </section>
        <Sections />
      </main>
    </Experience>
  );
}
