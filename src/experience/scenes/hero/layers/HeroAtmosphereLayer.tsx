import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'

import { getExperienceQualityPreset, useExperienceStore } from '@/experience/state/experience-store'

type AtmosphereDisc = {
  baseOpacity: number
  depth: number
  scale: [number, number, number]
  speed: number
  x: number
  y: number
}

export default function HeroAtmosphereLayer() {
  const groupReference = useRef<Group>(null)
  const frontDiscReference = useRef<Mesh<PlaneGeometry, MeshBasicMaterial>>(null)
  const rearDiscReference = useRef<Mesh<PlaneGeometry, MeshBasicMaterial>>(null)
  const scrollProgress = useExperienceStore((state) => state.scroll.progress)
  const qualityTier = useExperienceStore((state) => state.qualityTier)
  const qualityPreset = getExperienceQualityPreset(qualityTier)

  const discs = useMemo<AtmosphereDisc[]>(
    () => [
      {
        baseOpacity: 0.08,
        depth: -4.4,
        scale: [6.2, 3.1, 1],
        speed: 0.42,
        x: -1.8,
        y: 0.8,
      },
      {
        baseOpacity: 0.06,
        depth: -3.2,
        scale: [4.4, 2.1, 1],
        speed: 0.58,
        x: 2.1,
        y: -0.1,
      },
    ],
    [],
  )

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime()
    const easing = Math.min(1, delta * 1.8)

    if (groupReference.current) {
      const targetRotationX = -0.08 + scrollProgress * 0.12
      const targetRotationY = -0.18 + scrollProgress * 0.36
      const targetPositionY = 0.15 - scrollProgress * 0.25

      groupReference.current.rotation.x +=
        (targetRotationX - groupReference.current.rotation.x) * easing
      groupReference.current.rotation.y +=
        (targetRotationY - groupReference.current.rotation.y) * easing
      groupReference.current.position.y +=
        (targetPositionY - groupReference.current.position.y) * easing
    }

    if (frontDiscReference.current) {
      frontDiscReference.current.position.x = discs[0].x + Math.sin(elapsed * discs[0].speed) * 0.14
      frontDiscReference.current.position.y = discs[0].y + Math.cos(elapsed * discs[0].speed) * 0.08
      frontDiscReference.current.material.opacity =
        discs[0].baseOpacity + qualityPreset.renderScale * 0.015 + scrollProgress * 0.03
    }

    if (rearDiscReference.current) {
      rearDiscReference.current.position.x = discs[1].x + Math.cos(elapsed * discs[1].speed) * 0.1
      rearDiscReference.current.position.y = discs[1].y + Math.sin(elapsed * discs[1].speed) * 0.05
      rearDiscReference.current.material.opacity =
        discs[1].baseOpacity + qualityPreset.renderScale * 0.01 + scrollProgress * 0.022
    }
  })

  return (
    <group ref={groupReference}>
      {/* 안개층은 실루엣을 덮지 않고 공간감만 더해야 해서 실제 월드 자산보다 뒤쪽에서 낮은 opacity로만 움직입니다. */}
      <mesh
        ref={frontDiscReference}
        position={[discs[0].x, discs[0].y, discs[0].depth]}
        scale={discs[0].scale}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          color="#5d8fff"
          depthWrite={false}
          transparent
          opacity={discs[0].baseOpacity}
        />
      </mesh>
      <mesh
        ref={rearDiscReference}
        position={[discs[1].x, discs[1].y, discs[1].depth]}
        scale={discs[1].scale}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          color="#89bcff"
          depthWrite={false}
          transparent
          opacity={discs[1].baseOpacity}
        />
      </mesh>
    </group>
  )
}
