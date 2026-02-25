import AboutSection from "./section/AboutSection";
import Footer from "./section/Footer";
import Header from "./section/Header";
import HeroSection from "./section/HeroSection";
import ProjectSection from "./section/ProjectSection";
import TechSection from "./section/TechSection";

export const dynamic = "force-static";
export const revalidate = false;

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
