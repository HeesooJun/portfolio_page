import type { PortfolioProject } from '@/entities/project/model/project-types'
import { navigateTo } from '@/shared/lib/portfolio-routing'

interface ProjectDetailPageProps {
  project: PortfolioProject
  nextProject: PortfolioProject
}

export default function ProjectDetailPage({ project, nextProject }: ProjectDetailPageProps) {
  return (
    <main
      className="portfolio_shell__scroll portfolio_detail"
      aria-label={`${project.title} detail`}
    >
      <section className="portfolio_detail__hero">
        <div>
          <p>{project.type}</p>
          <h1>{project.title}</h1>
        </div>
      </section>
      <section className="portfolio_detail__meta" aria-label="Project metadata">
        <dl>
          <div>
            <dt>Summary</dt>
            <dd>{project.summary}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{project.date}</dd>
          </div>
        </dl>
      </section>
      <section className="portfolio_detail__visual">
        <img
          src={project.heroImage}
          alt={`${project.title} 대표 화면`}
          style={{ objectPosition: project.heroPosition }}
        />
      </section>
      <section className="portfolio_detail__story">
        <p>{project.subtitle}</p>
        <h2>{project.contribution}</h2>
      </section>
      <section className="portfolio_detail__evidence" aria-label={`${project.title} evidence`}>
        {project.evidence.map((asset) => (
          <figure
            key={`${asset.caption}-${asset.src}`}
            className={`portfolio_detail__evidence_item portfolio_detail__evidence_item--${asset.kind}`}
          >
            <img src={asset.src} alt={asset.alt} style={{ objectPosition: asset.objectPosition }} />
            <figcaption>{asset.caption}</figcaption>
          </figure>
        ))}
      </section>
      <section className="portfolio_detail__narrative">
        <p>Process</p>
        <h2>
          대표 화면을 먼저 보여주고, 이어지는 구간에서는 실제 기능의 증거와 설계 판단을 천천히
          확인하도록 구성했습니다.
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
      <section className="portfolio_detail__wide_media">
        <img src={project.evidence[0]?.src ?? project.heroImage} alt="" />
      </section>
      <section className="portfolio_detail__metrics">
        {project.meta.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>
      <section className="portfolio_detail__repository">
        <p>Repository</p>
        <a href={`https://${project.repository}`} target="_blank" rel="noreferrer">
          {project.repository}
        </a>
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
