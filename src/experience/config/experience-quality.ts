export type ExperienceQualityTier = 'low' | 'medium' | 'high' | 'ultra'

export type ExperienceQualityPreset = {
  dpr: [number, number]
  antialias: boolean
  postprocessing: boolean
  particles: number
  powerPreference: WebGLPowerPreference
  renderScale: number
  shadows: boolean
}

type ExperienceQualityResolverInput = {
  detectedTier: number | null
  isMobileDevice: boolean
  prefersReducedMotion: boolean
}

export const EXPERIENCE_QUALITY_PRESETS: Record<ExperienceQualityTier, ExperienceQualityPreset> = {
  low: {
    dpr: [1, 1.2],
    antialias: false,
    postprocessing: false,
    particles: 24,
    powerPreference: 'default',
    renderScale: 0.72,
    shadows: false,
  },
  medium: {
    dpr: [1, 1.5],
    antialias: true,
    postprocessing: false,
    particles: 48,
    powerPreference: 'high-performance',
    renderScale: 0.86,
    shadows: false,
  },
  high: {
    dpr: [1, 1.8],
    antialias: true,
    postprocessing: true,
    particles: 80,
    powerPreference: 'high-performance',
    renderScale: 1,
    shadows: true,
  },
  ultra: {
    dpr: [1, 2],
    antialias: true,
    postprocessing: true,
    particles: 120,
    powerPreference: 'high-performance',
    renderScale: 1,
    shadows: true,
  },
}

export function resolveExperienceQualityTier({
  detectedTier,
  isMobileDevice,
  prefersReducedMotion,
}: ExperienceQualityResolverInput): ExperienceQualityTier {
  // 모션 축소 환경에선 품질보다 안정성이 우선이라 가장 보수적인 프리셋으로 바로 내립니다.
  if (prefersReducedMotion) {
    return 'low'
  }

  if (detectedTier === null) {
    return isMobileDevice ? 'medium' : 'high'
  }

  if (detectedTier <= 0) {
    return 'low'
  }

  if (detectedTier === 1) {
    return isMobileDevice ? 'low' : 'medium'
  }

  if (detectedTier === 2) {
    return isMobileDevice ? 'medium' : 'high'
  }

  return isMobileDevice ? 'high' : 'ultra'
}
