import { lazy, Suspense, type PropsWithChildren } from 'react'

import { useExperienceBootstrap } from '@/experience/hooks/useExperienceBootstrap'
import ExperienceStatusBridge from '@/experience/components/ExperienceStatusBridge'
import { EXPERIENCE_SCROLL_PHASE_THRESHOLDS } from '@/experience/config/experience-scroll'
import { useExperienceStore } from '@/experience/state/experience-store'

const ExperienceCanvas = lazy(() => import('@/experience/components/ExperienceCanvas'))
const ExperienceDebugPanels = lazy(() => import('@/experience/components/ExperienceDebugPanels'))

export default function ExperienceRuntime({ children }: PropsWithChildren) {
  useExperienceBootstrap()
  const hasWebglSupport = useExperienceStore((state) => state.hasWebglSupport)
  const motionPreference = useExperienceStore((state) => state.motionPreference)
  const scrollProgress = useExperienceStore((state) => state.scroll.progress)
  const shouldRenderCanvas =
    hasWebglSupport &&
    motionPreference === 'full' &&
    scrollProgress <= EXPERIENCE_SCROLL_PHASE_THRESHOLDS.heroEnd + 0.08
  const shouldRenderDebugPanels =
    typeof window !== 'undefined' &&
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).has('leva')

  return (
    <div className="experience_runtime">
      <ExperienceStatusBridge />
      <div className="experience_runtime__canvas_layer">
        {/* Three/R3F 계층은 초기 DOM 콘텐츠보다 무겁기 때문에 첫 페인트를 막지 않도록 지연 로딩합니다. */}
        {shouldRenderCanvas ? (
          <Suspense fallback={null}>
            <ExperienceCanvas />
          </Suspense>
        ) : null}
      </div>
      {/* 기존 DOM 레이아웃은 앞으로도 SEO, 접근성, 실제 콘텐츠 전달을 담당하므로 3D 레이어와 완전히 분리합니다. */}
      <div className="experience_runtime__dom_layer">{children}</div>
      {shouldRenderDebugPanels ? (
        <Suspense fallback={null}>
          <ExperienceDebugPanels />
        </Suspense>
      ) : null}
    </div>
  )
}
