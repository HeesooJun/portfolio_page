import type { PortfolioProject } from '@/entities/project/model/project-types'
import { navigateTo } from '@/shared/lib/portfolio-routing'

import ProjectIntroReveal from './blocks/ProjectIntroReveal'

interface ProjectDetailPageProps {
  project: PortfolioProject
  nextProject: PortfolioProject
}

export default function ProjectDetailPage({ project, nextProject }: ProjectDetailPageProps) {
  const [leadEvidence, ...supportingEvidence] = project.evidence

  return (
    <main
      className="portfolio_shell__scroll portfolio_detail"
      aria-label={`${project.title} detail`}
    >
      <ProjectIntroReveal
        title={project.title}
        summary={project.summary}
        role={project.role}
        date={project.date}
        repository={project.repository}
        image={project.heroImage}
        imageAlt={`${project.title} 대표 화면`}
        imagePosition={project.heroPosition}
      />
      {leadEvidence ? (
        <section
          className="portfolio_detail__lead_media"
          aria-label={`${project.title} lead media`}
        >
          <figure className="portfolio_detail__evidence_item portfolio_detail__evidence_item--scene-1">
            <img
              src={leadEvidence.src}
              alt={leadEvidence.alt}
              style={{ objectPosition: leadEvidence.objectPosition }}
            />
            <figcaption>{leadEvidence.caption}</figcaption>
          </figure>
        </section>
      ) : null}
      <section className="portfolio_detail__statement">
        <p>{project.subtitle}</p>
        <h2>{project.contribution}</h2>
      </section>
      <section className="portfolio_detail__evidence" aria-label={`${project.title} evidence`}>
        {supportingEvidence.map((asset, index) => (
          <figure
            key={`${asset.caption}-${asset.src}`}
            className={`portfolio_detail__evidence_item portfolio_detail__evidence_item--${asset.kind} portfolio_detail__evidence_item--scene-${((index + 1) % 4) + 1}`}
          >
            <img src={asset.src} alt={asset.alt} style={{ objectPosition: asset.objectPosition }} />
            <figcaption>{asset.caption}</figcaption>
          </figure>
        ))}
      </section>
      <section className="portfolio_detail__narrative">
        <p>Concept</p>
        <h2>
          실제 프로젝트 화면을 크게 통과하면서 역할, 기능, 판단 근거가 하나의 장면처럼 이어지게
          구성했습니다.
        </h2>
      </section>
      <section className="portfolio_detail__case_grid">
        {project.caseStudy.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <section className="portfolio_detail__metrics">
        {project.meta.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>
      <button
        type="button"
        className="portfolio_detail__next"
        onClick={() => navigateTo(`project/${nextProject.slug}`)}
      >
        <span>Next Project</span>
        <strong>{nextProject.title}</strong>
      </button>
    </main>
  )
}
