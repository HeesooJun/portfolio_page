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
      <main className="w-full">
        <ProjectSection />
        <AboutSection />
        <TechSection />
      </main>
      <Footer />
    </>
  );
}
