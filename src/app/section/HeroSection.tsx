import { startTransition, useEffect, useRef, useState } from 'react'

import scene01RooftopOpening from '@/assets/hero/review/round_01_selected/scene_01_rooftop_opening.png'
import scene02CatForwardWalk from '@/assets/hero/review/round_01_selected/scene_02_cat_forward_walk.png'
import scene03CatRooftopCrossing from '@/assets/hero/review/round_01_selected/scene_03_cat_rooftop_crossing.png'
import scene04CatBridgePath from '@/assets/hero/review/round_01_selected/scene_04_cat_bridge_path.png'
import scene05CatHandoffView from '@/assets/hero/review/round_01_selected/scene_05_cat_handoff_view.png'
import scene06ProjectHandoff from '@/assets/hero/review/round_01_selected/scene_06_project_handoff.png'
import { PROJECT_ITEMS } from '@/content/portfolio-content'

const HERO_SCENES = [
  scene01RooftopOpening,
  scene02CatForwardWalk,
  scene03CatRooftopCrossing,
  scene04CatBridgePath,
  scene05CatHandoffView,
  scene06ProjectHandoff,
]

const HERO_SCENE_BEATS = [
  { fadeInStart: 0, visibleStart: 0, visibleEnd: 0.07, fadeOutEnd: 0.15 },
  { fadeInStart: 0.11, visibleStart: 0.16, visibleEnd: 0.22, fadeOutEnd: 0.3 },
  { fadeInStart: 0.26, visibleStart: 0.32, visibleEnd: 0.4, fadeOutEnd: 0.48 },
  { fadeInStart: 0.44, visibleStart: 0.5, visibleEnd: 0.6, fadeOutEnd: 0.68 },
  { fadeInStart: 0.64, visibleStart: 0.7, visibleEnd: 0.78, fadeOutEnd: 0.86 },
  { fadeInStart: 0.8, visibleStart: 0.86, visibleEnd: 1, fadeOutEnd: 1 },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3
}

function getSegmentProgress(value: number, start: number, end: number) {
  if (start === end) {
    return value >= end ? 1 : 0
  }

  return clamp((value - start) / (end - start), 0, 1)
}

function getSceneOpacity(heroProgress: number, sceneIndex: number) {
  const beat = HERO_SCENE_BEATS[sceneIndex]

  if (heroProgress < beat.fadeInStart || heroProgress > beat.fadeOutEnd) {
    return 0
  }

  if (heroProgress <= beat.visibleStart) {
    return easeOutCubic(getSegmentProgress(heroProgress, beat.fadeInStart, beat.visibleStart))
  }

  if (heroProgress <= beat.visibleEnd) {
    return 1
  }

  return easeOutCubic(1 - getSegmentProgress(heroProgress, beat.visibleEnd, beat.fadeOutEnd))
}

export default function HeroSection() {
  const heroSectionReference = useRef<HTMLElement | null>(null)
  const heroProgressReference = useRef(0)
  const [heroProgress, setHeroProgress] = useState(0)
  const featuredProject = PROJECT_ITEMS[0]
  const projectRevealProgress = easeOutCubic(getSegmentProgress(heroProgress, 0.76, 0.96))
  const projectStageTranslateX = (1 - projectRevealProgress) * 124
  const projectStageTranslateY = 64 - projectRevealProgress * 64
  const projectStageScale = 0.82 + projectRevealProgress * 0.18
  const projectStageRotateX = 18 - projectRevealProgress * 10
  const projectStageRotateY = -28 + projectRevealProgress * 14
  const projectAuraOpacity = clamp(getSegmentProgress(heroProgress, 0.74, 0.9), 0, 1) * 0.86

  useEffect(() => {
    const heroSectionElement = heroSectionReference.current

    if (!heroSectionElement) {
      return
    }

    const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animationFrameIdentifier = 0
    let isAnimationFramePending = false

    const syncHeroProgress = () => {
      isAnimationFramePending = false

      const heroBounds = heroSectionElement.getBoundingClientRect()
      const scrollableDistance = Math.max(heroSectionElement.offsetHeight - window.innerHeight, 1)
      const nextProgress = Math.min(Math.max(-heroBounds.top / scrollableDistance, 0), 1)

      if (Math.abs(heroProgressReference.current - nextProgress) < 0.002) {
        return
      }

      heroProgressReference.current = nextProgress

      // 장면 전환은 사용자의 즉시 입력보다 우선순위가 낮으므로 비동기 전환으로 처리합니다.
      startTransition(() => {
        setHeroProgress(nextProgress)
      })
    }

    const requestHeroProgressSync = () => {
      if (isAnimationFramePending) {
        return
      }

      isAnimationFramePending = true
      animationFrameIdentifier = window.requestAnimationFrame(syncHeroProgress)
    }

    const handleReducedMotionChange = () => {
      if (reducedMotionMediaQuery.matches) {
        heroProgressReference.current = 0
        setHeroProgress(0)
        return
      }

      requestHeroProgressSync()
    }

    if (reducedMotionMediaQuery.matches) {
      heroProgressReference.current = 0
    } else {
      requestHeroProgressSync()
    }

    window.addEventListener('scroll', requestHeroProgressSync, { passive: true })
    window.addEventListener('resize', requestHeroProgressSync)

    reducedMotionMediaQuery.addEventListener('change', handleReducedMotionChange)

    return () => {
      window.cancelAnimationFrame(animationFrameIdentifier)
      window.removeEventListener('scroll', requestHeroProgressSync)
      window.removeEventListener('resize', requestHeroProgressSync)

      reducedMotionMediaQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [])

  return (
    <section
      id="home"
      ref={heroSectionReference}
      className="hero_section"
      aria-label="Heesoo Jun hero"
    >
      <div className="hero_section__sticky_frame">
        {HERO_SCENES.map((sceneImage, sceneIndex) => {
          const sceneOpacity = getSceneOpacity(heroProgress, sceneIndex)
          const translateY = (1 - sceneOpacity) * 18
          const scale = 1.035 - sceneOpacity * 0.035

          return (
            <div
              key={sceneImage}
              className="hero_section__scene"
              aria-hidden="true"
              style={{
                opacity: sceneOpacity,
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                zIndex: sceneIndex + 1,
              }}
            >
              {/* 장면은 순서대로만 읽히게 하고, 각 컷의 움직임은 최소화해 전환감만 남깁니다. */}
              <img
                src={sceneImage}
                alt=""
                aria-hidden="true"
                width={1536}
                height={1024}
                fetchPriority={sceneIndex === 0 ? 'high' : 'auto'}
                className="hero_section__scene_image"
              />
            </div>
          )
        })}
        <div
          className="hero_section__project_preview"
          aria-hidden="true"
          style={{
            opacity: projectRevealProgress,
          }}
        >
          <div
            className="hero_section__project_preview_aura"
            style={{ opacity: projectAuraOpacity }}
          />
          <div
            className="hero_section__project_preview_stage"
            style={{
              transform: `translate3d(${projectStageTranslateX}px, ${projectStageTranslateY}px, 0) scale(${projectStageScale}) rotateX(${projectStageRotateX}deg) rotateY(${projectStageRotateY}deg)`,
            }}
          >
            <div className="hero_section__project_preview_stack hero_section__project_preview_stack--back" />
            <div className="hero_section__project_preview_stack hero_section__project_preview_stack--mid" />
            <article className="hero_section__project_panel">
              <div className="hero_section__project_panel_header">
                <span className="hero_section__project_panel_chip">Selected Work</span>
              </div>
              <div className="hero_section__project_panel_body">
                <div className="hero_section__project_media_shell">
                  <img
                    src={featuredProject.image}
                    alt=""
                    loading="eager"
                    className="hero_section__project_media"
                  />
                </div>
                <div className="hero_section__project_copy">
                  <p className="hero_section__project_index">01</p>
                  <h2 className="hero_section__project_title">{featuredProject.title}</h2>
                  <p className="hero_section__project_description">{featuredProject.description}</p>
                  <span className="hero_section__project_tags">
                    {featuredProject.tags.join(' · ')}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="hero_section__overlay" aria-hidden="true" />
        {/* 히어로의 텍스트는 걷어내되 문서 구조를 위해 제목만 숨겨서 유지합니다. */}
        <h1 className="sr-only">Heesoo Jun portfolio</h1>
      </div>
    </section>
  )
}
