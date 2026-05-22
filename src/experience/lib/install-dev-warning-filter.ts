const THREE_CLOCK_DEPRECATION_MESSAGE =
  'THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.'

let hasInstalledWarningFilter = false

export function installDevWarningFilter() {
  if (!import.meta.env.DEV || hasInstalledWarningFilter) {
    return
  }

  const originalConsoleWarn = window.console.warn

  // 현재 설치된 @react-three/fiber가 내부적으로 THREE.Clock를 생성해 dev 경고를 반복 출력하므로,
  // upstream 수정 전까지는 이 정확한 메시지만 걸러 다른 경고는 그대로 보이게 유지합니다.
  window.console.warn = (...argumentsList: unknown[]) => {
    const firstArgument = argumentsList[0]

    if (
      typeof firstArgument === 'string' &&
      firstArgument.includes(THREE_CLOCK_DEPRECATION_MESSAGE)
    ) {
      return
    }

    originalConsoleWarn(...argumentsList)
  }

  hasInstalledWarningFilter = true
}
