import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

import { createExperienceGltfLoader } from '@/experience/lib/asset-loaders'
import { useExperienceStore } from '@/experience/state/experience-store'

const EXPERIENCE_PROBE_ASSET_PATH = '/models/probes/experience_probe.gltf'

export default function ExperienceAssetPipelineProbe() {
  const gl = useThree((state) => state.gl)
  const setAssetPipelineStatus = useExperienceStore((state) => state.setAssetPipelineStatus)

  useEffect(() => {
    let isDisposed = false
    const { dracoLoader, gltfLoader, ktx2Loader } = createExperienceGltfLoader({ renderer: gl })

    // 지금 단계에서 가장 중요한 건 “실제 모델이 예쁘게 보이냐”가 아니라 “런타임 로더 체인이 깨지지 않고 준비되느냐”입니다.
    gltfLoader.load(
      EXPERIENCE_PROBE_ASSET_PATH,
      () => {
        if (!isDisposed) {
          setAssetPipelineStatus({ error: null, ready: true })
        }
      },
      undefined,
      (error) => {
        if (!isDisposed) {
          setAssetPipelineStatus({
            error: error instanceof Error ? error.message : '알 수 없는 GLTF 로드 오류',
            ready: false,
          })
        }
      },
    )

    return () => {
      isDisposed = true
      dracoLoader.dispose()
      ktx2Loader?.dispose()
    }
  }, [gl, setAssetPipelineStatus])

  return null
}
