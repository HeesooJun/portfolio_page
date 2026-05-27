import { useState } from 'react'

import { PROJECTS } from '@/entities/project/model/project-data'
import { resolveProjectHref } from '@/shared/lib/portfolio-routing'

interface ProjectIndexPageProps {
  activeProjectSlug: string
}

export default function ProjectIndexPage({ activeProjectSlug }: ProjectIndexPageProps) {
  const [previewSlug, setPreviewSlug] = useState(activeProjectSlug)
  const previewProject = PROJECTS.find((project) => project.slug === previewSlug) ?? PROJECTS[0]

  return (
    <main className="portfolio_shell__scroll portfolio_index" aria-label="Project index">
      <section className="portfolio_index__list" aria-label="Project list">
        {PROJECTS.map((project, index) => (
          <a
            key={project.slug}
            href={resolveProjectHref(project.slug)}
            className="portfolio_index__row"
            onMouseEnter={() => setPreviewSlug(project.slug)}
            onFocus={() => setPreviewSlug(project.slug)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{project.title}</strong>
            <span>{project.type}</span>
            <span>{project.year}</span>
          </a>
        ))}
      </section>
      <aside className="portfolio_index__preview" aria-hidden="true">
        {previewProject.homeVideo ? (
          <video
            key={previewProject.slug}
            src={previewProject.homeVideo}
            poster={previewProject.homeImage}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img src={previewProject.homeImage} alt="" />
        )}
      </aside>
      <footer className="portfolio_index__footer">
        <span>Frontend portfolio</span>
        <span>Jeon Heesoo</span>
        <span>GitHub / Blog / Email</span>
      </footer>
    </main>
  )
}
