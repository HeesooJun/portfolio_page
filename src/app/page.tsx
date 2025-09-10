// src/app/page.tsx
import About from "./section/AboutSection";
import Project from "./section/ProjectSection";
import Tech from "./section/TechSection";
import Header from "./section/Header";
import Hero from "./section/HeroSection";

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4">
      <Header />
      <Hero />
      <Project />
      <About />
      <Tech />
    </main>
  );
}
