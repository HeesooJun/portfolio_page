import type { LoadingManager, WebGLRenderer } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'

export const EXPERIENCE_ASSET_PATHS = {
  dracoDecoderPath: '/vendor/draco/',
  ktx2TranscoderPath: '/vendor/basis/',
}

export function createDracoLoader() {
  const dracoLoader = new DRACOLoader()

  // 디코더 파일은 npm 패키지를 직접 번들에 넣기보다 public/vendor 경로로 복사해 참조하는 편이 추후 교체가 쉽습니다.
  dracoLoader.setDecoderPath(EXPERIENCE_ASSET_PATHS.dracoDecoderPath)
  dracoLoader.setDecoderConfig({ type: 'js' })

  return dracoLoader
}

export function createKtx2Loader(renderer: WebGLRenderer) {
  const ktx2Loader = new KTX2Loader()

  // KTX2/Basis 트랜스코더도 런타임에서 원격 탐색하지 않도록 고정 경로를 미리 문서화해 둡니다.
  ktx2Loader.setTranscoderPath(EXPERIENCE_ASSET_PATHS.ktx2TranscoderPath)
  ktx2Loader.detectSupport(renderer)

  return ktx2Loader
}

export function createExperienceGltfLoader({
  loadingManager,
  renderer,
}: {
  loadingManager?: LoadingManager
  renderer?: WebGLRenderer
}) {
  const gltfLoader = new GLTFLoader(loadingManager)
  const dracoLoader = createDracoLoader()

  gltfLoader.setDRACOLoader(dracoLoader)

  if (!renderer) {
    return { dracoLoader, gltfLoader, ktx2Loader: null }
  }

  const ktx2Loader = createKtx2Loader(renderer)

  gltfLoader.setKTX2Loader(ktx2Loader)

  return { dracoLoader, gltfLoader, ktx2Loader }
}
