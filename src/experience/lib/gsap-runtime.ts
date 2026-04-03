import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isGsapRuntimeRegistered = false

export function ensureGsapRuntime() {
  if (isGsapRuntimeRegistered) {
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  // Lenis와 GSAP ticker를 섞을 때 기본 lag smoothing이 개입하면 스크롤과 타임라인이 미묘하게 어긋날 수 있습니다.
  gsap.ticker.lagSmoothing(0)
  isGsapRuntimeRegistered = true
}

export { gsap, ScrollTrigger }
