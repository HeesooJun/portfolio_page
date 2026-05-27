import { useEffect, useRef, useState } from 'react'

import { HOME_PRELOAD_SOURCES } from '@/entities/project/model/project-data'

async function createPreloadedObjectUrl(source: string) {
  const response = await fetch(source, { cache: 'force-cache' })

  if (!response.ok) {
    throw new Error(`홈 미디어를 불러오지 못했습니다: ${source}`)
  }

  const blob = await response.blob()

  return URL.createObjectURL(blob)
}

let homePreloadPromise: Promise<ReadonlyArray<readonly [string, string]>> | null = null

function preloadHomeMediaSources() {
  homePreloadPromise ??= Promise.all(
    HOME_PRELOAD_SOURCES.map(async (source) => {
      const objectUrl = await createPreloadedObjectUrl(source)

      return [source, objectUrl] as const
    }),
  )

  return homePreloadPromise
}

export function useHomeMediaPreload(shouldPreload: boolean) {
  const preloadStartedRef = useRef(false)
  const [isReady, setIsReady] = useState(false)
  const [preloadedSources, setPreloadedSources] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!shouldPreload || isReady || preloadStartedRef.current) {
      return
    }

    let isCancelled = false

    preloadStartedRef.current = true

    void preloadHomeMediaSources()
      .then((entries) => {
        if (isCancelled) {
          return
        }

        // 홈 첫 화면은 영상과 포스터가 한꺼번에 준비된 뒤 노출되어야 깜빡임과 추가 네트워크 요청이 줄어듭니다.
        setPreloadedSources(Object.fromEntries(entries))
        setIsReady(true)
      })
      .catch((error: unknown) => {
        console.error(error)

        if (!isCancelled) {
          // 일부 미디어 로딩이 실패해도 원본 URL로 폴백해 사용자가 빈 화면에 갇히지 않게 합니다.
          setIsReady(true)
        }
      })

    return () => {
      isCancelled = true
      preloadStartedRef.current = false
    }
  }, [isReady, shouldPreload])

  useEffect(() => {
    return () => {
      Object.values(preloadedSources).forEach((objectUrl) => URL.revokeObjectURL(objectUrl))
    }
  }, [preloadedSources])

  return {
    isReady: !shouldPreload || isReady,
    resolveMediaSource: (source: string) => preloadedSources[source] ?? source,
  }
}
