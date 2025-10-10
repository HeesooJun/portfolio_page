// src/app/section/TechSection.tsx
interface TechCategory {
  title: string;
  description: string;
  items: string[];
}

const TECH_STACK: TechCategory[] = [
  {
    title: "Front-End",
    description: "UI와 사용자 흐름을 고려한 클라이언트 개발 경험입니다.",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML/CSS"],
  },
  {
    title: "Back-End & Data",
    description: "필요한 기능을 빠르게 연동하기 위한 서버/데이터 처리 경험입니다.",
    items: ["Node.js", "Express", "PHP", "MySQL", "Firebase"],
  },
  {
    title: "Collaboration & Tools",
    description: "원활한 협업과 운영을 돕는 도구들입니다.",
    items: ["Git", "Figma", "Contentful", "Storybook", "Notion"],
  },
];

export default function TechSection() {
  return (
    <section id="tech" className="tech-section">
      <h2 className="tech-section__heading">Skills</h2>
      <p className="tech-section__intro">
        프로젝트에 필요한 기술을 상황에 맞게 조합하고, 서비스 운영까지 이어지는 흐름을 파악하며 개발합니다.
      </p>
      <div className="tech-section__grid">
        {TECH_STACK.map((category) => (
          <article key={category.title} className="tech-section__card">
            <h3 className="tech-section__card-title">{category.title}</h3>
            <p className="tech-section__card-desc">{category.description}</p>
            <ul className="tech-section__list">
              {category.items.map((item) => (
                <li key={item} className="tech-section__list-item">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
