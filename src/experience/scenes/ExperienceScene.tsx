import { useFrame } from '@react-three/fiber'

import HeroExperienceScene from '@/experience/scenes/hero/HeroExperienceScene'
import { useExperienceStore } from '@/experience/state/experience-store'

export default function ExperienceScene() {
  const scrollProgress = useExperienceStore((state) => state.scroll.progress)

  useFrame(({ camera }, delta) => {
    const easing = Math.min(1, delta * 2.2)
    const targetCameraX = (scrollProgress - 0.5) * 0.45
    const targetCameraY = 0.2 - scrollProgress * 0.25

    // 카메라 리그는 아직 본격 연출 전이지만, 스크롤과 씬 좌표계를 미리 연결해 둬야 이후 자산이 들어와도 구조를 유지할 수 있습니다.
    camera.position.x += (targetCameraX - camera.position.x) * easing
    camera.position.y += (targetCameraY - camera.position.y) * easing
    camera.lookAt(0, 0, 0)
  })

  return <HeroExperienceScene />
}
