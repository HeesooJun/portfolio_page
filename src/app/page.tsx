// src/app/page.tsx
import Header from "./section/Header";
import HeroSection from "./section/HeroSection";
import ProjectSection from "./section/ProjectSection";
import AboutSection from "./section/AboutSection";
import TechSection from "./section/TechSection";
import Footer from "./section/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <HeroSection />
      <main className="mx-auto max-w-5xl space-y-24 px-4 pb-24 pt-12">
        <ProjectSection />
        <AboutSection />
        <TechSection />
      </main>
      <Footer />
    </>
  );
}
