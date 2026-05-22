export function checkWebGLSupport() {
  if (typeof document === 'undefined') {
    return false
  }

  const canvas = document.createElement('canvas')

  return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
}
