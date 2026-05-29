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
  const personaImages = project.personaImages
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
      <section
        ref={storyRootRef}
        className="portfolio_detail__story"
        aria-label={`${project.title} story`}
      >
        <section
          className={`portfolio_detail__context ${
            project.contextImage ? 'portfolio_detail__context--with_media' : ''
          }`}
          data-story-reveal
        >
          {project.contextImage ? (
            <figure className="portfolio_detail__context_media">
              <img
                src={project.contextImage}
                alt={project.contextImageAlt ?? `${project.title} context image`}
              />
            </figure>
          ) : null}
          <div className="portfolio_detail__context_copy">
            <p className="portfolio_detail__story_eyebrow">Context</p>
            <p className="portfolio_detail__context_subtitle">{project.subtitle}</p>
            <h2>{project.contribution}</h2>
            <p className="portfolio_detail__context_body">{project.summary}</p>
          </div>
        </section>

        <section
          className="portfolio_detail__lead_media"
          aria-label={`${project.title} lead media`}
          data-story-reveal
        >
          <figure className="portfolio_detail__lead_figure">
            {/* 레퍼런스의 영상 장면을 대체하는 대표 컷이므로 context 이후에 풀블리드로 이어 붙입니다. */}
            <img
              src={project.heroImage}
              alt={`${project.title} 대표 고정 이미지`}
              style={{ objectPosition: project.heroPosition }}
            />
          </figure>
        </section>

        <div className="portfolio_detail__case_list">
          {caseSections.map((item, index) => (
            <article
              key={item.title}
              className={`portfolio_detail__case_section ${
                index % 2 === 1 ? 'portfolio_detail__case_section--reverse' : ''
              } ${
                project.slug === 'lifesavior' && index === 0 && personaImages
                  ? 'portfolio_detail__case_section--persona'
                  : ''
              }`}
              data-story-reveal
            >
              <div className="portfolio_detail__case_copy">
                {project.slug === 'lifesavior' && index === 0 && personaImages ? (
                  <p className="portfolio_detail__persona_eyebrow">UI/UX</p>
                ) : null}
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
              {project.slug === 'lifesavior' && index === 0 && personaImages ? (
                <div
                  className="portfolio_detail__persona_scene"
                  aria-label="생존자와 구조자 UI 비교"
                >
                  {/* 세로 앱 화면은 비율을 유지해야 설명 근거가 살아나므로, 프레임보다 실제 화면 크기를 우선합니다. */}
                  {personaImages.map((image, personaIndex) => (
                    <figure
                      key={image.src}
                      className={`portfolio_detail__persona_frame portfolio_detail__persona_frame--${
                        personaIndex + 1
                      }`}
                    >
                      <img
                        className="portfolio_detail__persona_frame_screen"
                        src={image.src}
                        alt={image.alt}
                      />
                    </figure>
                  ))}
                </div>
              ) : item.media ? (
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
