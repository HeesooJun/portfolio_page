// src/app/section/HeroSection.tsx
import Image from "next/image";
import heroBackground from "@/assets/HeroSection.png";

export default function HeroSection() {
  return (
    <section id="home" className="hero_section">
      <Image
        src={heroBackground}
        alt="City skyline illustration"
        fill
        priority
        sizes="100vw"
        className="hero_section__background"
      />
      <div className="hero_section__overlay" aria-hidden="true" />
      <div className="hero_section__container">
        <div className="hero_section__content">
          <p className="hero_section__introduction">Hi, I&apos;m</p>
          <h1 className="hero_section__title">Heesoo Jun</h1>
          <p className="hero_section__subtitle">
            A developer who enjoys crafting visible results on the web
          </p>
          <p className="hero_section__description">
            React와 TypeScript로 사용자 경험을 설계하고 구현하는 일을 좋아합니다.
          </p>
          <div className="hero_section__links">
            <span className="hero_section__details">
              <span className="hero_section__dot" />
              1998.12.15
            </span>
            <a className="hero_section__link" href="mailto:acesk123@gmail.com">
              acesk123@gmail.com
            </a>
            <a
              className="hero_section__link"
              href="https://github.com/HeesooJun"
              target="_blank"
              rel="noreferrer"
            >
              GitHub 링크
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
