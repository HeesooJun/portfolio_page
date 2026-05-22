import { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'

import { EXPERIENCE_QUALITY_PRESETS } from '@/experience/config/experience-quality'
import ExperienceScene from '@/experience/scenes/ExperienceScene'
import { useExperienceStore } from '@/experience/state/experience-store'

export default function ExperienceCanvas() {
  const hasWebglSupport = useExperienceStore((state) => state.hasWebglSupport)
  const motionPreference = useExperienceStore((state) => state.motionPreference)
  const qualityTier = useExperienceStore((state) => state.qualityTier)
  const qualityPreset = EXPERIENCE_QUALITY_PRESETS[qualityTier]

  if (!hasWebglSupport) {
    return null
  }

  return (
    <div className="experience_runtime__canvas_shell" aria-hidden="true">
      <Canvas
        className="experience_runtime__canvas"
        dpr={qualityPreset.dpr}
        frameloop={motionPreference === 'reduced' ? 'demand' : 'always'}
        gl={{
          alpha: true,
          antialias: qualityPreset.antialias,
          powerPreference: qualityPreset.powerPreference,
        }}
        camera={{ position: [0, 0.2, 7], fov: 36, near: 0.1, far: 120 }}
        resize={{ scroll: false, debounce: { resize: 120, scroll: 0 } }}
      >
        {/* 실제 씬이 무거워지기 전까지는 로더 지연과 빈 프레임 깜빡임을 막기 위해 fallback 없이 즉시 투명 캔버스를 유지합니다. */}
        <Suspense fallback={null}>
          <ExperienceScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
