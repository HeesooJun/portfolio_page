import AboutSection from "@/app/section/AboutSection";
import Footer from "@/app/section/Footer";
import Header from "@/app/section/Header";
import HeroSection from "@/app/section/HeroSection";
import ProjectSection from "@/app/section/ProjectSection";
import TechSection from "@/app/section/TechSection";

export default function App() {
  return (
    <>
      {/* 현재 포트폴리오는 단일 페이지 구성이므로 섹션 조합을 App에서 일괄 관리합니다. */}
      <Header />
      <HeroSection />
      <main className="w_full">
        <ProjectSection />
        <AboutSection />
        <TechSection />
      </main>
      <Footer />
    </>
  );
}
