import { startTransition, useEffect, useRef, useState } from 'react'

import scene01RooftopOpening from '@/assets/hero/review/round_01_optimized/scene_01_rooftop_opening.webp'
import scene03CatRooftopCrossing from '@/assets/hero/review/round_01_optimized/scene_03_cat_rooftop_crossing.webp'
import scene05CatHandoffView from '@/assets/hero/review/round_01_optimized/scene_05_cat_handoff_view.webp'
import scene06ProjectHandoff from '@/assets/hero/review/round_01_optimized/scene_06_project_handoff.webp'
import {
  HERO_DESCRIPTION,
  HERO_META_ITEMS,
  HERO_SCENE_LABEL,
  HERO_TITLE,
  PROJECT_ITEMS,
} from '@/content/portfolio-content'

interface HeroProjectShard {
  clipPath: string
  width: string
  height: string
  top: string
  right: string
  startTranslateX: number
  startTranslateY: number
  startRotate: number
  delay: number
}

interface HeroTransitionSlice {
  clipPath: string
  width: string
  height: string
  top: string
  left: string
  exitTranslateX: number
  exitTranslateY: number
  exitRotate: number
  delay: number
}

const HERO_SCENES = [
  scene01RooftopOpening,
  scene03CatRooftopCrossing,
  scene05CatHandoffView,
  scene06ProjectHandoff,
]

const HERO_SCENE_BEATS = [
  { fadeInStart: 0, visibleStart: 0, visibleEnd: 0.18, fadeOutEnd: 0.28 },
  { fadeInStart: 0.18, visibleStart: 0.28, visibleEnd: 0.44, fadeOutEnd: 0.58 },
  { fadeInStart: 0.46, visibleStart: 0.58, visibleEnd: 0.74, fadeOutEnd: 0.86 },
  { fadeInStart: 0.72, visibleStart: 0.84, visibleEnd: 1, fadeOutEnd: 1 },
]

const HERO_PROJECT_REVEAL_START = 0.69
const HERO_PROJECT_REVEAL_END = 0.96
const HERO_PROJECT_SWING_MIDPOINT = 0.84

const HERO_PROJECT_SHARDS: HeroProjectShard[] = [
  {
    clipPath: 'polygon(6% 0%, 100% 8%, 82% 100%, 0% 80%)',
    width: '10rem',
    height: '6.5rem',
    top: '14%',
    right: '28%',
    startTranslateX: -220,
    startTranslateY: -90,
    startRotate: -18,
    delay: 0,
  },
  {
    clipPath: 'polygon(16% 0%, 100% 12%, 88% 100%, 0% 100%)',
    width: '9rem',
    height: '5.8rem',
    top: '22%',
    right: '10%',
    startTranslateX: 180,
    startTranslateY: -120,
    startRotate: 16,
    delay: 0.03,
  },
  {
    clipPath: 'polygon(0% 14%, 86% 0%, 100% 88%, 14% 100%)',
    width: '7rem',
    height: '4.8rem',
    top: '46%',
    right: '38%',
    startTranslateX: -160,
    startTranslateY: 60,
    startRotate: -14,
    delay: 0.05,
  },
  {
    clipPath: 'polygon(24% 0%, 100% 0%, 90% 100%, 0% 70%)',
    width: '8.5rem',
    height: '5.2rem',
    top: '56%',
    right: '12%',
    startTranslateX: 160,
    startTranslateY: 90,
    startRotate: 22,
    delay: 0.08,
  },
]

const HERO_TRANSITION_SLICES: HeroTransitionSlice[] = [
  {
    clipPath: 'polygon(0% 0%, 100% 0%, 78% 100%, 0% 82%)',
    width: '30vw',
    height: '36vh',
    top: '12%',
    left: '-2%',
    exitTranslateX: -220,
    exitTranslateY: -130,
    exitRotate: -12,
    delay: 0,
  },
  {
    clipPath: 'polygon(8% 0%, 100% 10%, 100% 100%, 0% 82%)',
    width: '25vw',
    height: '26vh',
    top: '22%',
    left: '24%',
    exitTranslateX: -100,
    exitTranslateY: -170,
    exitRotate: -10,
    delay: 0.04,
  },
  {
    clipPath: 'polygon(0% 18%, 82% 0%, 100% 86%, 10% 100%)',
    width: '24vw',
    height: '28vh',
    top: '52%',
    left: '6%',
    exitTranslateX: -210,
    exitTranslateY: 120,
    exitRotate: 10,
    delay: 0.07,
  },
  {
    clipPath: 'polygon(16% 0%, 100% 0%, 100% 82%, 0% 100%)',
    width: '22vw',
    height: '34vh',
    top: '8%',
    left: '72%',
    exitTranslateX: 190,
    exitTranslateY: -140,
    exitRotate: 14,
    delay: 0.03,
  },
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
  const [isProjectOverlayOpen, setIsProjectOverlayOpen] = useState(false)
  const featuredProject = PROJECT_ITEMS[0]
  const projectEnterProgress = easeOutCubic(
    getSegmentProgress(heroProgress, HERO_PROJECT_REVEAL_START, HERO_PROJECT_SWING_MIDPOINT),
  )
  const projectSettleProgress = easeOutCubic(
    getSegmentProgress(heroProgress, HERO_PROJECT_SWING_MIDPOINT, HERO_PROJECT_REVEAL_END),
  )
  const projectPreviewOpacity = clamp(getSegmentProgress(heroProgress, 0.68, 0.9), 0, 1)
  const projectStageTranslateX = 320 - projectEnterProgress * 356 + projectSettleProgress * 42
  const projectStageTranslateY = 118 - projectEnterProgress * 132 + projectSettleProgress * 14
  const projectStageScale = 0.58 + projectEnterProgress * 0.46 - projectSettleProgress * 0.06
  const projectStageRotateX = 18 - projectEnterProgress * 14 + projectSettleProgress * 1.5
  const projectStageRotateY = 62 - projectEnterProgress * 86 + projectSettleProgress * 24
  const projectStageRotateZ = 7 - projectEnterProgress * 12 + projectSettleProgress * 4
  const projectAuraOpacity = clamp(getSegmentProgress(heroProgress, 0.6, 0.84), 0, 1) * 0.88
  const signalProgress = easeOutCubic(getSegmentProgress(heroProgress, 0.2, 0.54))
  const apertureProgress = easeOutCubic(getSegmentProgress(heroProgress, 0.5, 0.78))
  const infoShiftProgress = easeOutCubic(getSegmentProgress(heroProgress, 0, 0.76))
  const projectInfoOpacity = clamp(getSegmentProgress(heroProgress, 0.82, 0.96), 0, 1)
  const copyFadeProgress = easeOutCubic(getSegmentProgress(heroProgress, 0.36, 0.68))

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

      // 스크롤에 따라 바뀌는 히어로 상태는 연속적으로 갱신되지만 입력보다 우선순위가 낮으므로 전환으로 넘깁니다.
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

  useEffect(() => {
    if (!isProjectOverlayOpen) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow

    // 아카이브 오버레이가 열렸을 때는 배경 스크롤이 같이 움직이지 않게 잠가 무드가 끊기지 않도록 합니다.
    document.body.style.overflow = 'hidden'

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProjectOverlayOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isProjectOverlayOpen])

  return (
    <section
      id="home"
      ref={heroSectionReference}
      className="hero_section"
      aria-label="Heesoo Jun hero"
    >
      <div className="hero_section__sticky_frame">
        {HERO_SCENES.map((scene, sceneIndex) => {
          const sceneOpacity = getSceneOpacity(heroProgress, sceneIndex)
          const translateY = (1 - sceneOpacity) * 18
          const scale = 1.04 - sceneOpacity * 0.04

          return (
            <div
              key={scene}
              className="hero_section__scene"
              aria-hidden="true"
              style={{
                opacity: sceneOpacity,
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                zIndex: sceneIndex + 1,
              }}
            >
              {/* 컷을 완전히 갈아끼우기보다, 같은 무대가 천천히 주도권을 넘기는 인상만 남기도록 움직임을 최소화합니다. */}
              <img
                src={scene}
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

        <div className="hero_section__grid_overlay" aria-hidden="true">
          <span className="hero_section__grid_line hero_section__grid_line--vertical" />
          <span className="hero_section__grid_line hero_section__grid_line--horizontal" />
          <span className="hero_section__grid_frame" />
        </div>

        <div className="hero_section__signal_node" aria-hidden="true">
          <span
            className="hero_section__signal_node_ring hero_section__signal_node_ring--outer"
            style={{
              opacity: signalProgress * 0.42,
              transform: `scale(${0.8 + signalProgress * 0.34})`,
            }}
          />
          <span
            className="hero_section__signal_node_ring hero_section__signal_node_ring--inner"
            style={{
              opacity: signalProgress * 0.7,
              transform: `scale(${0.92 + signalProgress * 0.14})`,
            }}
          />
          <span
            className="hero_section__signal_node_core"
            style={{
              opacity: signalProgress,
              transform: `scale(${0.84 + signalProgress * 0.2})`,
            }}
          />
        </div>

        <div className="hero_section__copy_column">
          <div
            className="hero_section__copy_panel"
            style={{
              transform: `translate3d(${-32 * copyFadeProgress}px, ${-8 * infoShiftProgress - 16 * copyFadeProgress}px, 0) scale(${1 - copyFadeProgress * 0.05})`,
              opacity: 1 - copyFadeProgress,
            }}
          >
            <p className="hero_section__scene_label">{HERO_SCENE_LABEL}</p>
            <h1 className="hero_section__title">{HERO_TITLE}</h1>
            <p className="hero_section__description">{HERO_DESCRIPTION}</p>
            <dl className="hero_section__meta_list">
              {HERO_META_ITEMS.map((item) => (
                <div key={item.label} className="hero_section__meta_item">
                  <dt className="hero_section__meta_label">{item.label}</dt>
                  <dd className="hero_section__meta_value">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div
          className="hero_section__project_preview"
          style={{
            opacity: projectPreviewOpacity,
          }}
        >
          <div
            className="hero_section__project_preview_aura"
            style={{ opacity: projectAuraOpacity }}
          />
          <div
            className="hero_section__aperture_glow"
            aria-hidden="true"
            style={{
              opacity: apertureProgress * 0.78,
              transform: `translate3d(${-40 + apertureProgress * 32}px, ${20 - apertureProgress * 24}px, 0) scale(${0.92 + apertureProgress * 0.16})`,
            }}
          />
          {HERO_TRANSITION_SLICES.map((slice, sliceIndex) => {
            const sliceProgress = easeOutCubic(
              getSegmentProgress(heroProgress, 0.54 + slice.delay, 0.76 + slice.delay * 0.3),
            )

            return (
              <div
                key={`${slice.clipPath}-${sliceIndex}`}
                className="hero_section__transition_slice"
                aria-hidden="true"
                style={{
                  clipPath: slice.clipPath,
                  width: slice.width,
                  height: slice.height,
                  top: slice.top,
                  left: slice.left,
                  opacity: 0.82 * (1 - sliceProgress),
                  transform: `translate3d(${slice.exitTranslateX * sliceProgress}px, ${
                    slice.exitTranslateY * sliceProgress
                  }px, 0) rotate(${slice.exitRotate * sliceProgress}deg)`,
                }}
              />
            )
          })}
          {HERO_PROJECT_SHARDS.map((shard, shardIndex) => {
            const shardProgress = easeOutCubic(
              getSegmentProgress(
                heroProgress,
                HERO_PROJECT_REVEAL_START + shard.delay,
                HERO_PROJECT_REVEAL_END + shard.delay * 0.35,
              ),
            )

            return (
              <div
                key={`${shard.clipPath}-${shardIndex}`}
                className="hero_section__project_shard"
                aria-hidden="true"
                style={{
                  clipPath: shard.clipPath,
                  width: shard.width,
                  height: shard.height,
                  top: shard.top,
                  right: shard.right,
                  opacity: shardProgress,
                  transform: `translate3d(${shard.startTranslateX * (1 - shardProgress)}px, ${
                    shard.startTranslateY * (1 - shardProgress)
                  }px, 0) rotate(${shard.startRotate * (1 - shardProgress)}deg) scale(${
                    0.84 + shardProgress * 0.16
                  })`,
                }}
              />
            )
          })}
          <div
            className="hero_section__project_preview_stage"
            style={{
              transform: `translate3d(${projectStageTranslateX}px, ${projectStageTranslateY}px, 0) scale(${projectStageScale}) rotateX(${projectStageRotateX}deg) rotateY(${projectStageRotateY}deg) rotateZ(${projectStageRotateZ}deg)`,
            }}
          >
            <div className="hero_section__project_preview_stack hero_section__project_preview_stack--back" />
            <div className="hero_section__project_preview_stack hero_section__project_preview_stack--mid" />
            <button
              type="button"
              className="hero_section__project_trigger"
              onClick={() => setIsProjectOverlayOpen(true)}
              tabIndex={projectPreviewOpacity > 0.78 ? 0 : -1}
              aria-label={`${featuredProject.title} 작업 상세 보기`}
            >
              <div className="hero_section__project_shell">
                <span className="hero_section__project_side" aria-hidden="true" />
                <article className="hero_section__project_panel">
                  <div className="hero_section__project_panel_header">
                    <span className="hero_section__project_panel_chip">Archive 01</span>
                    <span className="hero_section__project_panel_status">Signal Locked</span>
                  </div>
                  <div className="hero_section__project_panel_body">
                    <div className="hero_section__project_media_shell">
                      <img
                        src={featuredProject.image}
                        alt=""
                        loading="eager"
                        className="hero_section__project_media"
                        style={{ opacity: 0.72 + projectInfoOpacity * 0.28 }}
                      />
                    </div>
                    <div
                      className="hero_section__project_copy"
                      style={{
                        opacity: 0.56 + projectInfoOpacity * 0.44,
                        transform: `translate3d(0, ${10 - projectInfoOpacity * 10}px, 0)`,
                      }}
                    >
                      <p className="hero_section__project_index">01</p>
                      <h2 className="hero_section__project_title">{featuredProject.title}</h2>
                      <p className="hero_section__project_description">
                        {featuredProject.description}
                      </p>
                      <div className="hero_section__project_footer">
                        <span className="hero_section__project_tags">
                          {featuredProject.tags.join(' · ')}
                        </span>
                        <span className="hero_section__project_action">Open Archive</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </button>
          </div>
        </div>

        <div className="hero_section__overlay" aria-hidden="true" />
      </div>
      {isProjectOverlayOpen ? (
        <div
          className="hero_section__project_overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project_overlay_title"
        >
          <button
            type="button"
            className="hero_section__project_overlay_backdrop"
            aria-label="작업 상세 닫기"
            onClick={() => setIsProjectOverlayOpen(false)}
          />
          <div className="hero_section__project_overlay_panel">
            <div className="hero_section__project_overlay_header">
              <div>
                <p className="hero_section__project_overlay_eyebrow">Selected Work</p>
                <h2 id="project_overlay_title" className="hero_section__project_overlay_title">
                  Archive Log
                </h2>
              </div>
              <button
                type="button"
                className="hero_section__project_overlay_close"
                onClick={() => setIsProjectOverlayOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="hero_section__project_overlay_grid">
              {PROJECT_ITEMS.map((project, projectIndex) => (
                <article
                  key={project.title}
                  className={`hero_section__project_overlay_card ${
                    projectIndex === 0 ? 'hero_section__project_overlay_card--featured' : ''
                  }`}
                >
                  {/* 같은 세계관 안에서 작업 목록이 이어지도록, 오버레이 안에서도 카드보다 패널 구조를 유지합니다. */}
                  <div className="hero_section__project_overlay_media_shell">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="hero_section__project_overlay_media"
                    />
                  </div>
                  <div className="hero_section__project_overlay_copy">
                    <p className="hero_section__project_overlay_index">{`0${projectIndex + 1}`}</p>
                    <h3 className="hero_section__project_overlay_card_title">{project.title}</h3>
                    <p className="hero_section__project_overlay_card_description">
                      {project.description}
                    </p>
                    <span className="hero_section__project_overlay_tags">
                      {project.tags.join(' · ')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
