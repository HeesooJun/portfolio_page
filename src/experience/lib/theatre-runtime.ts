import { getProject } from '@theatre/core'

let isTheatreStudioInitialized = false

export const experienceTheatreProject = getProject('portfolio-experience')

export async function initializeTheatreStudio() {
  if (!import.meta.env.DEV || typeof window === 'undefined') {
    return false
  }

  if (!new URLSearchParams(window.location.search).has('theatre')) {
    return false
  }

  if (isTheatreStudioInitialized) {
    return true
  }

  const studioModule = await import('@theatre/studio')

  // Theatre Studio는 캔버스 저작 시점에만 쓰고, 일반 개발 화면은 가리지 않도록 쿼리 플래그가 있을 때만 엽니다.
  studioModule.default.initialize()
  isTheatreStudioInitialized = true

  return true
}
