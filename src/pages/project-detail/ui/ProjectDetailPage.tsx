import { useEffect, useRef } from 'react'

import type { PortfolioProject } from '@/entities/project/model/project-types'
import { navigateTo } from '@/shared/lib/portfolio-routing'

import ProjectIntroReveal from './blocks/ProjectIntroReveal'

interface ProjectDetailPageProps {
  project: PortfolioProject
  nextProject: PortfolioProject
}

export default function ProjectDetailPage({ project, nextProject }: ProjectDetailPageProps) {
  const storyRootRef = useRef<HTMLElement | null>(null)
  const supportingEvidence = project.evidence.slice(1)
  const caseSections = project.caseStudy.map((item, index) => ({
    ...item,
    media: supportingEvidence[index],
  }))
  const remainingEvidence = supportingEvidence.slice(project.caseStudy.length)

  useEffect(() => {
    const storyRoot = storyRootRef.current

    if (!storyRoot) {
      return
    }

    const revealTargets = Array.from(storyRoot.querySelectorAll<HTMLElement>('[data-story-reveal]'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealTargets.forEach((target) => target.classList.add('is-visible'))
      return
    }

    const scrollRoot = storyRoot.closest('.portfolio_shell__scroll')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        // 프로젝트 상세는 내부 스크롤 컨테이너를 쓰기 때문에 실제 관찰 기준도 같은 요소로 맞춥니다.
        root: scrollRoot instanceof HTMLElement ? scrollRoot : null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.14,
      },
    )

    revealTargets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
    }
  }, [project.slug])

  return (
    <main
      className="portfolio_shell__scroll portfolio_detail"
      aria-label={`${project.title} detail`}
    >
      <ProjectIntroReveal
        slug={project.slug}
        title={project.title}
        summary={project.summary}
        role={project.role}
        date={project.date}
        repository={project.repository}
        image={project.heroImage}
        video={project.heroVideo}
        titleLogo={project.detailLogoImage}
        imageAlt={`${project.title} 대표 화면`}
        imagePosition={project.heroPosition}
      />
      <section className="portfolio_detail__lead_media" aria-label={`${project.title} lead media`}>
        <figure className="portfolio_detail__lead_figure">
          {/* 상세 인트로 영상과 증거 이미지 사이의 호흡을 만들기 위해 고정 대표 이미지를 독립 컷처럼 배치합니다. */}
          <img
            src={project.heroImage}
            alt={`${project.title} 대표 고정 이미지`}
            style={{ objectPosition: project.heroPosition }}
          />
        </figure>
      </section>
      <section
        ref={storyRootRef}
        className="portfolio_detail__story"
        aria-label={`${project.title} story`}
      >
        <section className="portfolio_detail__context" data-story-reveal>
          <p className="portfolio_detail__story_eyebrow">Context</p>
          <div className="portfolio_detail__context_copy">
            <p>{project.subtitle}</p>
            <h2>{project.contribution}</h2>
            <p>{project.summary}</p>
          </div>
        </section>

        <div className="portfolio_detail__case_list">
          {caseSections.map((item, index) => (
            <article
              key={item.title}
              className={`portfolio_detail__case_section ${
                index % 2 === 1 ? 'portfolio_detail__case_section--reverse' : ''
              }`}
              data-story-reveal
            >
              <div className="portfolio_detail__case_copy">
                <p className="portfolio_detail__story_eyebrow">
                  Decision {String(index + 1).padStart(2, '0')}
                </p>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
              {item.media ? (
                <figure
                  className={`portfolio_detail__case_media portfolio_detail__case_media--${item.media.kind}`}
                >
                  <img
                    src={item.media.src}
                    alt={item.media.alt}
                    style={{ objectPosition: item.media.objectPosition }}
                  />
                  <figcaption>{item.media.caption}</figcaption>
                </figure>
              ) : null}
            </article>
          ))}
        </div>

        {remainingEvidence.length > 0 ? (
          <section className="portfolio_detail__proof_strip" data-story-reveal>
            <p className="portfolio_detail__story_eyebrow">Proof</p>
            <div>
              {remainingEvidence.map((asset) => (
                <figure key={`${asset.caption}-${asset.src}`}>
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    style={{ objectPosition: asset.objectPosition }}
                  />
                  <figcaption>{asset.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="portfolio_detail__outcome" data-story-reveal>
          <p className="portfolio_detail__story_eyebrow">Outcome</p>
          <div className="portfolio_detail__outcome_grid">
            {project.meta.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>
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
