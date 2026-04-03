import { forwardRef } from 'react'

import type { ThreeElements } from '@react-three/fiber'
import type { Group } from 'three'

const SceneAnchorLayer = forwardRef<Group, ThreeElements['group']>(
  function SceneAnchorLayer(props, ref) {
    return (
      <group ref={ref} {...props}>
        {/* 실제 메쉬는 아직 없지만, 씬의 기준 원점을 이 그룹에 몰아두면 이후 카메라/오브젝트 애니메이션을 한 군데에서 관리하기 쉽습니다. */}
      </group>
    )
  },
)

export default SceneAnchorLayer
