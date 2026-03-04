import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Highlights from "@/components/sections/Highlights";
import Education from "@/components/sections/Education";
import Footer from "@/components/footer";
import { highlights } from "@/lib/constants";

const hasHighlights = highlights.some((h) => h.images.length > 0);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        {hasHighlights && (
          <>
            <div className="section-divider" />
            <Highlights />
          </>
        )}
        <div className="section-divider" />
        <Education />
      </main>
      <Footer />
    </>
  );
}
