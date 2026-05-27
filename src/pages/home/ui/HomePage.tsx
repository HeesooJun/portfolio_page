import { type CSSProperties, useEffect, useRef } from 'react'

import { PROJECTS } from '@/entities/project/model/project-data'
import type { MediaSourceResolver, PortfolioProject } from '@/entities/project/model/project-types'
import { resolveProjectHref, romanize } from '@/shared/lib/portfolio-routing'

interface HomePageProps {
  activeProjectIndex: number
  previousProjectIndex: number
  homePlaybackKey: number
  isMediaReady: boolean
  resolveMediaSource: MediaSourceResolver
  transitionDirection: 'next' | 'previous'
  setActiveProjectIndex: (index: number) => void
}

export default function HomePage({
  activeProjectIndex,
  previousProjectIndex,
  homePlaybackKey,
  isMediaReady,
  resolveMediaSource,
  transitionDirection,
  setActiveProjectIndex,
}: HomePageProps) {
  const project = PROJECTS[activeProjectIndex]

  if (!isMediaReady) {
    return (
      <main className="portfolio_home portfolio_home--loading" aria-label="Home">
        <div className="portfolio_home__loader" role="status" aria-live="polite">
          <span>Loading</span>
        </div>
      </main>
    )
  }

  return (
    <main className="portfolio_home" aria-label="Home">
      <div className="portfolio_home__media_stage">
        {PROJECTS.map((item, index) => (
          <HomeMedia
            key={item.slug}
            item={item}
            isActive={index === activeProjectIndex}
            isPrevious={index === previousProjectIndex}
            homePlaybackKey={homePlaybackKey}
            resolveMediaSource={resolveMediaSource}
            transitionDirection={transitionDirection}
          />
        ))}
      </div>
      <div className="portfolio_home__center" aria-labelledby="home_project_title">
        {/* 데스크톱 홈 이미지는 main 자산이 타이틀 역할을 대신하므로 접근성 제목만 남깁니다. */}
        <h1 id="home_project_title" className="portfolio_home__title">
          {project.title}
        </h1>
        <p>{project.subtitle}</p>
        <a href={resolveProjectHref(project.slug)}>DISCOVER PROJECT</a>
      </div>
      <div className="portfolio_home__bottom">
        <div className="portfolio_home__count">
          <span>{romanize(activeProjectIndex)}</span>
        </div>
        <div className="portfolio_home__controls" aria-label="Project controls">
          {PROJECTS.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`${item.title} project`}
              aria-pressed={index === activeProjectIndex}
              className={index === activeProjectIndex ? 'portfolio_home__bar--active' : ''}
              onClick={() => setActiveProjectIndex(index)}
            >
              <span key={index === activeProjectIndex ? item.slug : undefined} />
            </button>
          ))}
        </div>
        <span className="portfolio_home__total">{romanize(PROJECTS.length - 1)}</span>
      </div>
      <section className="portfolio_home__mobile_list" aria-label="Project list">
        {PROJECTS.map((item) => (
          <article key={item.slug} className="portfolio_home__mobile_project">
            {/* 모바일은 레퍼런스처럼 모든 프로젝트를 세로로 보여주므로 원본 비율을 유지합니다. */}
            {item.homeVideo ? (
              <video
                src={resolveMediaSource(item.homeMobileVideo ?? item.homeVideo)}
                poster={resolveMediaSource(item.homeMobileImage)}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                aria-label={`${item.title} 대표 화면`}
              />
            ) : (
              <img src={resolveMediaSource(item.homeImage)} alt={`${item.title} 대표 화면`} />
            )}
            <div>
              <h2>{item.title}</h2>
              <p>{item.mobileDescription}</p>
              <a href={resolveProjectHref(item.slug)}>DISCOVER PROJECT</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

function HomeMedia({
  item,
  isActive,
  isPrevious,
  homePlaybackKey,
  resolveMediaSource,
  transitionDirection,
}: {
  item: PortfolioProject
  isActive: boolean
  isPrevious: boolean
  homePlaybackKey: number
  resolveMediaSource: MediaSourceResolver
  transitionDirection: 'next' | 'previous'
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const imageSource = resolveMediaSource(item.homeImage)
  const mobileImageSource = resolveMediaSource(item.homeMobileImage)
  const videoSource = item.homeVideo ? resolveMediaSource(item.homeVideo) : null
  const mobileVideoSource = item.homeMobileVideo ? resolveMediaSource(item.homeMobileVideo) : null

  useEffect(() => {
    const videoElement = videoRef.current

    if (!isActive || !videoElement) {
      return
    }

    const restartPlayback = () => {
      videoElement.currentTime = 0
      void videoElement.play().catch(() => {
        // 브라우저 자동재생 정책이 막는 경우에도 포스터가 남아 있으므로 화면은 유지됩니다.
      })
    }

    if (videoElement.readyState >= HTMLMediaElement.HAVE_METADATA) {
      restartPlayback()
      return
    }

    videoElement.addEventListener('loadedmetadata', restartPlayback, { once: true })

    return () => {
      videoElement.removeEventListener('loadedmetadata', restartPlayback)
    }
  }, [homePlaybackKey, isActive, videoSource])

  return (
    <figure
      className="portfolio_home__media"
      data-active={isActive}
      data-previous={isPrevious}
      data-direction={transitionDirection}
      style={
        {
          '--home-backdrop-source': `url(${imageSource})`,
          '--home-mobile-backdrop-source': `url(${mobileImageSource})`,
          '--home-image-position': item.homePosition,
          '--home-mobile-image-position': item.homeMobilePosition,
        } as CSSProperties
      }
      aria-hidden={!isActive}
    >
      {videoSource ? (
        <video
          ref={videoRef}
          className="portfolio_home__video"
          poster={imageSource}
          muted
          loop
          playsInline
          preload="auto"
        >
          {mobileVideoSource ? (
            <source media="(max-width: 767px)" src={mobileVideoSource} type="video/webm" />
          ) : null}
          <source src={videoSource} type="video/webm" />
        </video>
      ) : (
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileImageSource} />
          <img className="portfolio_home__image" src={imageSource} alt="" />
        </picture>
      )}
    </figure>
  )
}
