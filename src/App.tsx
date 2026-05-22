import AboutSection from '@/app/section/AboutSection'
import Footer from '@/app/section/Footer'
import Header from '@/app/section/Header'
import HeroSection from '@/app/section/HeroSection'
import ProjectSection from '@/app/section/ProjectSection'
import TechSection from '@/app/section/TechSection'

export default function App() {
  return (
    <>
      {/* 네비게이션은 화면 위에 얹히는 보조 컨트롤러 역할만 맡기고, 본문 흐름은 단일 컬럼으로 유지합니다. */}
      <Header />
      <HeroSection />
      <main className="page_archive">
        <AboutSection />
        <TechSection />
        <ProjectSection />
      </main>
      <Footer />
    </>
  )
}
