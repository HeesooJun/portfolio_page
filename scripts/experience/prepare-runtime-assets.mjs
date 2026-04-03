import { cp, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDirectoryPath = path.dirname(fileURLToPath(import.meta.url))
const projectRootPath = path.resolve(currentDirectoryPath, '..', '..')

const copyTargets = [
  {
    sourcePath: path.join(
      projectRootPath,
      'node_modules',
      'three',
      'examples',
      'jsm',
      'libs',
      'draco',
      'gltf',
    ),
    targetPath: path.join(projectRootPath, 'public', 'vendor', 'draco', 'gltf'),
  },
  {
    sourcePath: path.join(
      projectRootPath,
      'node_modules',
      'three',
      'examples',
      'jsm',
      'libs',
      'basis',
    ),
    targetPath: path.join(projectRootPath, 'public', 'vendor', 'basis'),
  },
]

async function copyRuntimeAssets() {
  for (const copyTarget of copyTargets) {
    await mkdir(copyTarget.targetPath, { recursive: true })

    // 런타임 디코더는 import로 직접 번들에 끌어오기보다 public/vendor에 고정해 두는 편이 교체와 디버깅이 훨씬 쉽습니다.
    await cp(copyTarget.sourcePath, copyTarget.targetPath, { force: true, recursive: true })
  }
}

copyRuntimeAssets().catch((error) => {
  console.error('3D 런타임 자산 복사에 실패했습니다.', error)
  process.exitCode = 1
})
