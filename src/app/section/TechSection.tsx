import { TECH_INTRODUCTION, TECH_STACK_CATEGORIES } from '@/content/portfolio-content'

export default function TechSection() {
  return (
    <section id="tech" className="tech_section">
      <div className="tech_section__container">
        <div className="tech_section__header">
          <p className="tech_section__eyebrow">Archive 03</p>
          <h2 className="tech_section__heading">Skills</h2>
          <p className="tech_section__introduction">{TECH_INTRODUCTION}</p>
        </div>
        <div className="tech_section__grid">
          {TECH_STACK_CATEGORIES.map((category, index) => (
            <article key={category.title} className="tech_section__card">
              <p className="tech_section__card_index">{`0${index + 1}`}</p>
              <h3 className="tech_section__card_title">{category.title}</h3>
              <p className="tech_section__card_description">{category.description}</p>
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
  )
}
