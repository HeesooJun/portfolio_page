import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'

import { useExperienceStore } from '@/experience/state/experience-store'

export default function HeroSignalPanelLayer() {
  const shellReference = useRef<Group>(null)
  const innerPlateReference = useRef<Mesh<PlaneGeometry, MeshBasicMaterial>>(null)
  const scenePhase = useExperienceStore((state) => state.scenePhase)
  const scrollProgress = useExperienceStore((state) => state.scroll.progress)

  useFrame((_, delta) => {
    const easing = Math.min(1, delta * 2.4)
    const isContentPhase = scenePhase === 'content'
    const targetProgress = isContentPhase ? 1 : Math.max(0, (scrollProgress - 0.24) / 0.42)

    if (shellReference.current) {
      const targetPositionX = 2.7 - targetProgress * 1.15
      const targetPositionY = 0.95 - targetProgress * 0.28
      const targetPositionZ = -2.7 + targetProgress * 1.05
      const targetRotationY = 0.58 - targetProgress * 0.52
      const targetRotationX = 0.16 - targetProgress * 0.08

      shellReference.current.position.x +=
        (targetPositionX - shellReference.current.position.x) * easing
      shellReference.current.position.y +=
        (targetPositionY - shellReference.current.position.y) * easing
      shellReference.current.position.z +=
        (targetPositionZ - shellReference.current.position.z) * easing
      shellReference.current.rotation.y +=
        (targetRotationY - shellReference.current.rotation.y) * easing
      shellReference.current.rotation.x +=
        (targetRotationX - shellReference.current.rotation.x) * easing
    }

    if (innerPlateReference.current) {
      innerPlateReference.current.material.opacity = 0.12 + targetProgress * 0.22
    }
  })

  return (
    <group ref={shellReference} position={[2.7, 0.95, -2.7]} rotation={[0.16, 0.58, 0]}>
      {/* 이 패널은 실제 프로젝트 카드가 아니라, 추후 카드가 안착할 월드 좌표와 회전 문법을 미리 고정하는 자리입니다. */}
      <RoundedBox args={[2.1, 1.35, 0.08]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color="#10233d"
          emissive="#1b4bd2"
          emissiveIntensity={0.22}
          metalness={0.18}
          roughness={0.56}
          transparent
          opacity={0.28}
        />
      </RoundedBox>
      <mesh ref={innerPlateReference} position={[0, 0, 0.06]}>
        <planeGeometry args={[1.75, 1]} />
        <meshBasicMaterial color="#7ab1ff" depthWrite={false} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}
