import { Leva } from 'leva'

function shouldShowLevaPanel() {
  if (!import.meta.env.DEV) {
    return false
  }

  return new URLSearchParams(window.location.search).has('leva')
}

export default function ExperienceDebugPanels() {
  if (!shouldShowLevaPanel()) {
    return null
  }

  // Leva는 항상 보이는 운영 UI가 아니라 개발 중 튜닝 패널이므로 쿼리 스트링으로만 노출합니다.
  return <Leva collapsed fill flat oneLineLabels />
}
