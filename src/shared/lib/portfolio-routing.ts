export function navigateTo(hash: string) {
  window.location.hash = hash
}

export function resolveProjectHref(slug: string) {
  return `#project/${slug}`
}

export function romanize(index: number) {
  return ['I', 'II', 'III', 'IV', 'V', 'VI'][index] ?? `${index + 1}`
}
