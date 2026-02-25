// src/app/section/AboutSection.tsx
import { ABOUT_PRINCIPLES } from "@/content/portfolio-content";

export default function AboutSection() {
  return (
    <section id="about" className="about_section">
      <div className="about_section__container">
        <h2 className="about_section__heading">About</h2>
        <p className="about_section__introduction">
          웹 환경에서 보이는 결과물을 만드는 일을 좋아합니다. React와 TypeScript를 중심으로 작업하며,
          기획자와 디자이너와 함께 사용자 경험을 완성하는 과정을 즐깁니다.
        </p>
        <ul className="about_section__list">
          {ABOUT_PRINCIPLES.map((item) => (
            <li key={item} className="about_section__item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
