import { useEffect } from 'react'

import { useExperienceStore } from '@/experience/state/experience-store'

export default function ExperienceStatusBridge() {
  const assetPipeline = useExperienceStore((state) => state.assetPipeline)
  const scenePhase = useExperienceStore((state) => state.scenePhase)
  const qualityTier = useExperienceStore((state) => state.qualityTier)
  const runtimeReady = useExperienceStore((state) => state.runtimeReady)

  useEffect(() => {
    document.documentElement.dataset.experienceAssetPipeline = assetPipeline.ready
      ? 'ready'
      : 'pending'

    if (assetPipeline.error) {
      document.documentElement.dataset.experienceAssetPipelineError = assetPipeline.error
    } else {
      delete document.documentElement.dataset.experienceAssetPipelineError
    }

    document.documentElement.dataset.experiencePhase = scenePhase
    document.documentElement.dataset.experienceQuality = qualityTier
    document.documentElement.dataset.experienceRuntime = runtimeReady ? 'ready' : 'boot'

    return () => {
      delete document.documentElement.dataset.experienceAssetPipeline
      delete document.documentElement.dataset.experienceAssetPipelineError
      delete document.documentElement.dataset.experiencePhase
      delete document.documentElement.dataset.experienceQuality
      delete document.documentElement.dataset.experienceRuntime
    }
  }, [assetPipeline.error, assetPipeline.ready, qualityTier, runtimeReady, scenePhase])

  return null
}
