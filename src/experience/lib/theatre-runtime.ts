import { getProject } from '@theatre/core'

let isTheatreStudioInitialized = false
let experienceTheatreProject: ReturnType<typeof getProject> | null = null

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

export async function getExperienceTheatreProject() {
  const isStudioReady = await initializeTheatreStudio()

  // 현재 구조에선 Theatre state export가 아직 없으므로 Studio를 실제로 여는 경우에만 프로젝트를 만들고, 그 외에는 null로 둡니다.
  if (!isStudioReady) {
    return null
  }

  if (!experienceTheatreProject) {
    experienceTheatreProject = getProject('portfolio-experience')
  }

  return experienceTheatreProject
}
