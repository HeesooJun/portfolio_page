import Lenis, { type LenisOptions } from 'lenis'

export function createLenisRuntime(options: LenisOptions) {
  return new Lenis(options)
}
