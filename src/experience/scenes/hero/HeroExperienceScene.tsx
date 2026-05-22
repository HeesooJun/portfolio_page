import HeroAtmosphereLayer from '@/experience/scenes/hero/layers/HeroAtmosphereLayer'
import HeroSignalPanelLayer from '@/experience/scenes/hero/layers/HeroSignalPanelLayer'
import ExperienceAssetPipelineProbe from '@/experience/scenes/support/ExperienceAssetPipelineProbe'

export default function HeroExperienceScene() {
  return (
    <>
      {/* 기본 조명은 아직 실자산이 없더라도 레이어 좌표계와 포스트 이펙트 튜닝 기준점을 미리 잡아두기 위해 유지합니다. */}
      <ambientLight intensity={0.45} />
      <directionalLight intensity={0.8} position={[2.5, 5, 4]} />
      <HeroAtmosphereLayer />
      <HeroSignalPanelLayer />
      <ExperienceAssetPipelineProbe />
    </>
  )
}
