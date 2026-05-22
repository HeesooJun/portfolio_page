import { useEffect, useEffectEvent } from 'react'

import { getGPUTier } from 'detect-gpu'

import {
  EXPERIENCE_SCROLL_PHASE_THRESHOLDS,
  EXPERIENCE_LENIS_OPTIONS,
} from '@/experience/config/experience-scroll'
import { ensureGsapRuntime, ScrollTrigger, gsap } from '@/experience/lib/gsap-runtime'
import { createLenisRuntime } from '@/experience/lib/lenis-runtime'
import { initializeTheatreStudio } from '@/experience/lib/theatre-runtime'
import { checkWebGLSupport } from '@/experience/lib/webgl-support'
import { type ExperienceScenePhase, useExperienceStore } from '@/experience/state/experience-store'
import { resolveExperienceQualityTier } from '@/experience/config/experience-quality'

function resolveScenePhase(progress: number): ExperienceScenePhase {
  if (progress <= EXPERIENCE_SCROLL_PHASE_THRESHOLDS.introEnd) {
    return 'intro'
  }

  if (progress <= EXPERIENCE_SCROLL_PHASE_THRESHOLDS.heroEnd) {
    return 'hero'
  }

  return 'content'
}

export function useExperienceBootstrap() {
  const setGpuProfile = useExperienceStore((state) => state.setGpuProfile)
  const setHasWebglSupport = useExperienceStore((state) => state.setHasWebglSupport)
  const setMotionPreference = useExperienceStore((state) => state.setMotionPreference)
  const setQualityTier = useExperienceStore((state) => state.setQualityTier)
  const setRuntimeReady = useExperienceStore((state) => state.setRuntimeReady)
  const setScenePhase = useExperienceStore((state) => state.setScenePhase)
  const setScrollMetrics = useExperienceStore((state) => state.setScrollMetrics)
  const setViewport = useExperienceStore((state) => state.setViewport)

  const syncViewport = useEffectEvent(() => {
    setViewport({
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
      width: window.innerWidth,
    })
  })

  const syncNativeScroll = useEffectEvent(() => {
    const totalScrollableHeight = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    )
    const progress = Math.min(Math.max(window.scrollY / totalScrollableHeight, 0), 1)

    setScrollMetrics({
      progress,
      velocity: 0,
      y: window.scrollY,
    })
    setScenePhase(resolveScenePhase(progress))
  })

  const syncMotionPreference = useEffectEvent((prefersReducedMotion: boolean) => {
    setMotionPreference(prefersReducedMotion ? 'reduced' : 'full')
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const hasWebglSupport = checkWebGLSupport()
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let didDispose = false

    ensureGsapRuntime()
    setHasWebglSupport(hasWebglSupport)
    syncViewport()
    syncMotionPreference(motionMediaQuery.matches)
    syncNativeScroll()

    // Theatre Studio는 운영 화면에 항상 얹히면 안 되므로 개발 환경 + 쿼리 플래그 조합일 때만 초기화합니다.
    void initializeTheatreStudio()

    void getGPUTier()
      .then((gpuProfile) => {
        if (didDispose) {
          return
        }

        setGpuProfile({
          fps: gpuProfile.fps ?? null,
          gpu: gpuProfile.gpu ?? null,
          isMobile: gpuProfile.isMobile ?? false,
          tier: gpuProfile.tier ?? null,
        })
        setQualityTier(
          resolveExperienceQualityTier({
            detectedTier: gpuProfile.tier ?? null,
            isMobileDevice: gpuProfile.isMobile ?? false,
            prefersReducedMotion: motionMediaQuery.matches,
          }),
        )
      })
      .catch(() => {
        if (didDispose) {
          return
        }

        setGpuProfile({
          fps: null,
          gpu: null,
          isMobile: /Android|iPhone|iPad/i.test(window.navigator.userAgent),
          tier: null,
        })
      })

    const handleResize = () => {
      syncViewport()
      syncNativeScroll()
      ScrollTrigger.refresh()
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      syncMotionPreference(event.matches)
      setQualityTier(
        resolveExperienceQualityTier({
          detectedTier: useExperienceStore.getState().gpuProfile.tier,
          isMobileDevice: useExperienceStore.getState().gpuProfile.isMobile,
          prefersReducedMotion: event.matches,
        }),
      )
    }

    window.addEventListener('resize', handleResize)
    motionMediaQuery.addEventListener('change', handleMotionChange)

    if (motionMediaQuery.matches) {
      window.addEventListener('scroll', syncNativeScroll, { passive: true })
      setRuntimeReady(true)

      return () => {
        didDispose = true
        setRuntimeReady(false)
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', syncNativeScroll)
        motionMediaQuery.removeEventListener('change', handleMotionChange)
      }
    }

    const lenis = createLenisRuntime(EXPERIENCE_LENIS_OPTIONS)
    const tickerCallback = (time: number) => {
      // GSAP ticker는 seconds 단위이고 Lenis는 milliseconds 단위를 받으므로 여기서만 변환합니다.
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', (event) => {
      const progress = lenis.limit > 0 ? event.scroll / lenis.limit : 0

      setScrollMetrics({
        progress,
        velocity: event.velocity,
        y: event.scroll,
      })
      setScenePhase(resolveScenePhase(progress))
      ScrollTrigger.update()
    })

    gsap.ticker.add(tickerCallback)
    setRuntimeReady(true)

    return () => {
      didDispose = true
      setRuntimeReady(false)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      window.removeEventListener('resize', handleResize)
      motionMediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [
    setGpuProfile,
    setHasWebglSupport,
    setMotionPreference,
    setQualityTier,
    setRuntimeReady,
    setScenePhase,
    setScrollMetrics,
    setViewport,
  ])
}
