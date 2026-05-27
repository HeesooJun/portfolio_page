import { useEffect, useRef } from 'react'

interface ProjectIntroRevealProps {
  title: string
  summary: string
  role: string
  date: string
  repository: string
  image: string
  video?: string
  imageAlt: string
  imagePosition: string
}

export default function ProjectIntroReveal({
  title,
  summary,
  role,
  date,
  repository,
  image,
  video,
  imageAlt,
  imagePosition,
}: ProjectIntroRevealProps) {
  const visualRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const visualElement = visualRef.current
    const scroller = visualElement?.closest('.portfolio_shell__scroll')

    if (!visualElement || !(scroller instanceof HTMLElement)) {
      return undefined
    }

    let frameId = 0

    const updateParallax = () => {
      frameId = 0

      const visualRect = visualElement.getBoundingClientRect()
      const scrollerRect = scroller.getBoundingClientRect()
      const visualCenter = visualRect.top + visualRect.height / 2
      const scrollerCenter = scrollerRect.top + scrollerRect.height / 2
      const progress = Math.max(
        -1,
        Math.min(1, (visualCenter - scrollerCenter) / scrollerRect.height),
      )

      visualElement.style.setProperty('--project-detail-visual-shift', `${progress * -320}px`)
    }

    const requestUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateParallax)
      }
    }

    updateParallax()
    scroller.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }

      scroller.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  const roles = role
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)
  const metaItems = [
    { label: 'About', value: [summary] },
    { label: roles.length > 1 ? 'Roles' : 'Role', value: roles },
    { label: 'Date', value: [date] },
  ]

  return (
    <section className="portfolio_detail_intro" aria-labelledby="project_detail_title">
      <div className="portfolio_detail_intro__inner">
        <div className="portfolio_detail_intro__copy">
          <h1 id="project_detail_title">{title}</h1>
        </div>
        <div className="portfolio_detail_intro__meta" aria-label="Project metadata">
          <dl>
            {metaItems.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  {item.value.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </dd>
              </div>
            ))}
            <div>
              <dt>Links</dt>
              <dd>
                <a href={`https://${repository}`} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <figure ref={visualRef} className="portfolio_detail_intro__visual">
        {video ? (
          <video
            className="portfolio_detail_intro__visual_media"
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            aria-label={imageAlt}
            style={{ objectPosition: imagePosition }}
          />
        ) : (
          <img
            className="portfolio_detail_intro__visual_media"
            src={image}
            alt={imageAlt}
            style={{ objectPosition: imagePosition }}
          />
        )}
      </figure>
    </section>
  )
}
