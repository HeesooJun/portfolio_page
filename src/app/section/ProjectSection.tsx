import { PROJECT_ITEMS, PROJECTS_INTRODUCTION } from '@/content/portfolio-content'

export default function ProjectSection() {
  return (
    <section id="projects" className="projects_section">
      <div className="projects_section__container">
        <div className="projects_section__intro_panel">
          <p className="projects_section__eyebrow">Archive 04</p>
          <h2 className="projects_section__heading">Projects</h2>
          <p className="projects_section__introduction">{PROJECTS_INTRODUCTION}</p>
        </div>
        <div className="projects_section__stage">
          {PROJECT_ITEMS.map((project, index) => (
            <article
              key={project.title}
              className={`projects_section__card ${
                index === 0
                  ? 'projects_section__card--featured'
                  : index % 2 === 1
                    ? 'projects_section__card--left'
                    : 'projects_section__card--right'
              }`}
            >
              {/* 프로젝트는 일반 카드보다 아카이브 패널처럼 보여야 해서 구조 프레임과 정보층을 분리합니다. */}
              <div className="projects_section__panel">
                <div className="projects_section__panel_chrome" aria-hidden="true">
                  <span className="projects_section__panel_glint" />
                </div>
                <div className="projects_section__panel_body">
                  <div className="projects_section__media_shell">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="projects_section__image"
                    />
                  </div>
                  <div className="projects_section__details">
                    <p className="projects_section__details_index">{`0${index + 1}`}</p>
                    <h3 className="projects_section__details_title">{project.title}</h3>
                    <p className="projects_section__details_description">{project.description}</p>
                    <span className="projects_section__details_tags">
                      {project.tags.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
