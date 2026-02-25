import { TECH_STACK_CATEGORIES } from "@/content/portfolio-content";

export default function TechSection() {
  return (
    <section id="tech" className="tech_section">
      <div className="tech_section__container">
        <h2 className="tech_section__heading">Skills</h2>
        <p className="tech_section__introduction">
          프로젝트에 필요한 기술을 상황에 맞게 조합하고, 서비스 운영까지
          이어지는 흐름을 파악하며 개발합니다.
        </p>
        <div className="tech_section__grid">
          {TECH_STACK_CATEGORIES.map((category) => (
            <article key={category.title} className="tech_section__card">
              <h3 className="tech_section__card_title">{category.title}</h3>
              <p className="tech_section__card_description">
                {category.description}
              </p>
              <ul className="tech_section__list">
                {category.items.map((item) => (
                  <li key={item} className="tech_section__list_item">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
