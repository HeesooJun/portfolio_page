import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

import SceneAnchorLayer from '@/experience/scenes/layers/SceneAnchorLayer'
import { useExperienceStore } from '@/experience/state/experience-store'

export default function ExperienceScene() {
  const scrollProgress = useExperienceStore((state) => state.scroll.progress)
  const anchorReference = useRef<Group>(null)

  useFrame(({ camera }, delta) => {
    const easing = Math.min(1, delta * 2.2)
    const targetCameraX = (scrollProgress - 0.5) * 0.45
    const targetCameraY = 0.2 - scrollProgress * 0.25
    const targetAnchorRotationY = (scrollProgress - 0.5) * 0.22

    // 카메라 리그는 아직 본격 연출 전이지만, 스크롤과 씬 좌표계를 미리 연결해 둬야 이후 자산이 들어와도 구조를 유지할 수 있습니다.
    camera.position.x += (targetCameraX - camera.position.x) * easing
    camera.position.y += (targetCameraY - camera.position.y) * easing
    camera.lookAt(0, 0, 0)

    if (anchorReference.current) {
      anchorReference.current.rotation.y +=
        (targetAnchorRotationY - anchorReference.current.rotation.y) * easing
    }
  })

  return (
    <>
      {/* 현재 단계에선 투명 캔버스 기반 구조만 먼저 깔고, 실제 월드 자산은 다음 작업 단위에서 주입합니다. */}
      <ambientLight intensity={0.4} />
      <directionalLight intensity={0.7} position={[2.5, 5, 4]} />
      <SceneAnchorLayer ref={anchorReference} />
    </>
  )
}
