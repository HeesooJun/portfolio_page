import { create } from 'zustand'

import {
  EXPERIENCE_QUALITY_PRESETS,
  type ExperienceQualityTier,
} from '@/experience/config/experience-quality'

export type ExperienceMotionPreference = 'full' | 'reduced'
export type ExperienceScenePhase = 'boot' | 'intro' | 'hero' | 'content'

export type ExperienceViewport = {
  height: number
  pixelRatio: number
  width: number
}

export type ExperienceGpuProfile = {
  fps: number | null
  gpu: string | null
  isMobile: boolean
  tier: number | null
}

export type ExperienceScrollMetrics = {
  progress: number
  velocity: number
  y: number
}

type ExperienceStoreState = {
  gpuProfile: ExperienceGpuProfile
  hasWebglSupport: boolean
  motionPreference: ExperienceMotionPreference
  qualityTier: ExperienceQualityTier
  runtimeReady: boolean
  scenePhase: ExperienceScenePhase
  scroll: ExperienceScrollMetrics
  viewport: ExperienceViewport
  setGpuProfile: (gpuProfile: ExperienceGpuProfile) => void
  setHasWebglSupport: (hasWebglSupport: boolean) => void
  setMotionPreference: (motionPreference: ExperienceMotionPreference) => void
  setQualityTier: (qualityTier: ExperienceQualityTier) => void
  setRuntimeReady: (runtimeReady: boolean) => void
  setScenePhase: (scenePhase: ExperienceScenePhase) => void
  setScrollMetrics: (scroll: ExperienceScrollMetrics) => void
  setViewport: (viewport: ExperienceViewport) => void
}

const DEFAULT_VIEWPORT: ExperienceViewport = {
  height: 0,
  pixelRatio: 1,
  width: 0,
}

const DEFAULT_GPU_PROFILE: ExperienceGpuProfile = {
  fps: null,
  gpu: null,
  isMobile: false,
  tier: null,
}

const DEFAULT_SCROLL: ExperienceScrollMetrics = {
  progress: 0,
  velocity: 0,
  y: 0,
}

export const useExperienceStore = create<ExperienceStoreState>((set) => ({
  gpuProfile: DEFAULT_GPU_PROFILE,
  hasWebglSupport: true,
  motionPreference: 'full',
  qualityTier: 'high',
  runtimeReady: false,
  scenePhase: 'boot',
  scroll: DEFAULT_SCROLL,
  viewport: DEFAULT_VIEWPORT,
  setGpuProfile: (gpuProfile) => set({ gpuProfile }),
  setHasWebglSupport: (hasWebglSupport) => set({ hasWebglSupport }),
  setMotionPreference: (motionPreference) => set({ motionPreference }),
  setQualityTier: (qualityTier) => set({ qualityTier }),
  setRuntimeReady: (runtimeReady) => set({ runtimeReady }),
  setScenePhase: (scenePhase) => set({ scenePhase }),
  setScrollMetrics: (scroll) => set({ scroll }),
  setViewport: (viewport) => set({ viewport }),
}))

export function getExperienceQualityPreset(qualityTier: ExperienceQualityTier) {
  return EXPERIENCE_QUALITY_PRESETS[qualityTier]
}
