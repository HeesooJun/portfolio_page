import { useEffect, useMemo, useState } from 'react'

import { AUTOPLAY_SECONDS, PROJECTS } from '@/entities/project/model/project-data'
import AboutPage from '@/pages/about/ui/AboutPage'
import { useHomeMediaPreload } from '@/pages/home/model/useHomeMediaPreload'
import HomePage from '@/pages/home/ui/HomePage'
import ProjectDetailPage from '@/pages/project-detail/ui/ProjectDetailPage'
import ProjectIndexPage from '@/pages/project-index/ui/ProjectIndexPage'
import PortfolioShell from '@/widgets/portfolio-shell/ui/PortfolioShell'

type PortfolioView =
  | { name: 'home' }
  | { name: 'index' }
  | { name: 'about' }
  | { name: 'project'; slug: string }

function resolveViewFromHash(hash: string): PortfolioView {
  const normalizedHash = hash.replace(/^#/, '')

  if (normalizedHash === 'index' || normalizedHash === 'projects') {
    return { name: 'index' }
  }

  if (normalizedHash === 'about') {
    return { name: 'about' }
  }

  if (normalizedHash.startsWith('project/')) {
    const slug = normalizedHash.split('/')[1]

    if (PROJECTS.some((project) => project.slug === slug)) {
      return { name: 'project', slug }
    }
  }

  return { name: 'home' }
}

export default function App() {
  const [view, setView] = useState<PortfolioView>(() => resolveViewFromHash(window.location.hash))
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [previousProjectIndex, setPreviousProjectIndex] = useState(0)
  const [homePlaybackKey, setHomePlaybackKey] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'previous'>('next')
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const { isReady: isHomeMediaReady, resolveMediaSource } = useHomeMediaPreload(
    view.name === 'home',
  )
  const activeProject = PROJECTS[activeProjectIndex]
  const currentProject =
    view.name === 'project'
      ? (PROJECTS.find((project) => project.slug === view.slug) ?? PROJECTS[0])
      : activeProject
  const nextProject = useMemo(() => {
    const currentIndex = PROJECTS.findIndex((project) => project.slug === currentProject.slug)
    return PROJECTS[(currentIndex + 1) % PROJECTS.length]
  }, [currentProject.slug])

  useEffect(() => {
    const handleHashChange = () => {
      setView(resolveViewFromHash(window.location.hash))
      setIsHeaderHidden(false)
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const selectProjectIndex = (nextIndex: number) => {
    if (activeProjectIndex === nextIndex) {
      return
    }

    setPreviousProjectIndex(activeProjectIndex)
    setTransitionDirection(nextIndex > activeProjectIndex ? 'next' : 'previous')
    setHomePlaybackKey((currentKey) => currentKey + 1)
    setActiveProjectIndex(nextIndex)
  }

  useEffect(() => {
    if (view.name !== 'home') {
      return
    }

    const intervalId = window.setInterval(() => {
      const nextIndex = (activeProjectIndex + 1) % PROJECTS.length

      setPreviousProjectIndex(activeProjectIndex)
      setTransitionDirection('next')
      setHomePlaybackKey((currentKey) => currentKey + 1)
      setActiveProjectIndex(nextIndex)
    }, AUTOPLAY_SECONDS * 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [activeProjectIndex, view.name])

  useEffect(() => {
    document.querySelector('.portfolio_shell__scroll')?.scrollTo({ top: 0 })
  }, [view])

  useEffect(() => {
    if (view.name === 'home') {
      return
    }

    const scrollContainer = document.querySelector<HTMLElement>('.portfolio_shell__scroll')

    if (!scrollContainer) {
      return
    }

    let previousScrollTop = scrollContainer.scrollTop

    const handleScroll = () => {
      const currentScrollTop = scrollContainer.scrollTop
      const scrollDelta = currentScrollTop - previousScrollTop

      if (Math.abs(scrollDelta) < 8) {
        return
      }

      // 홈 외 페이지는 내용 탐색이 주가 되므로, 아래로 읽을 때는 헤더를 숨기고 위로 돌아올 때만 다시 노출합니다.
      setIsHeaderHidden(currentScrollTop > 32 && scrollDelta > 0)
      previousScrollTop = currentScrollTop
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [view])

  return (
    <PortfolioShell
      viewName={view.name}
      isHeaderHidden={view.name === 'home' ? false : isHeaderHidden}
    >
      {view.name === 'home' ? (
        <HomePage
          activeProjectIndex={activeProjectIndex}
          previousProjectIndex={previousProjectIndex}
          homePlaybackKey={homePlaybackKey}
          isMediaReady={isHomeMediaReady}
          resolveMediaSource={resolveMediaSource}
          transitionDirection={transitionDirection}
          setActiveProjectIndex={selectProjectIndex}
        />
      ) : null}
      {view.name === 'index' ? <ProjectIndexPage activeProjectSlug={currentProject.slug} /> : null}
      {view.name === 'about' ? <AboutPage /> : null}
      {view.name === 'project' ? (
        <ProjectDetailPage project={currentProject} nextProject={nextProject} />
      ) : null}
    </PortfolioShell>
  )
}
