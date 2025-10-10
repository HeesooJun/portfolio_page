// src/app/section/AboutSection.tsx
const PRINCIPLES = [
  "사용자의 문제를 이해하고 해결책을 빠르게 제시합니다.",
  "협업 과정에서 열린 소통과 기록을 중요하게 생각합니다.",
  "마감을 지키면서도 완성도를 높이는 방법을 찾아갑니다.",
];

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <h2 className="about-section__heading">About</h2>
      <p className="about-section__intro">
        웹 환경에서 보이는 결과물을 만드는 일을 좋아합니다. React와 TypeScript를 중심으로 작업하며,
        기획자와 디자이너와 함께 사용자 경험을 완성하는 과정을 즐깁니다.
      </p>
      <ul className="about-section__list">
        {PRINCIPLES.map((item) => (
          <li key={item} className="about-section__item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
