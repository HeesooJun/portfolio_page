import type { PropsWithChildren } from 'react'

import ExperienceCanvas from '@/experience/components/ExperienceCanvas'
import ExperienceDebugPanels from '@/experience/components/ExperienceDebugPanels'
import { useExperienceBootstrap } from '@/experience/hooks/useExperienceBootstrap'

export default function ExperienceRuntime({ children }: PropsWithChildren) {
  useExperienceBootstrap()

  return (
    <div className="experience_runtime">
      <div className="experience_runtime__canvas_layer">
        <ExperienceCanvas />
      </div>
      {/* 기존 DOM 레이아웃은 앞으로도 SEO, 접근성, 실제 콘텐츠 전달을 담당하므로 3D 레이어와 완전히 분리합니다. */}
      <div className="experience_runtime__dom_layer">{children}</div>
      <ExperienceDebugPanels />
    </div>
  )
}
