import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { HEADER_SECTION_LINKS } from '@/content/portfolio-content'

const NAVIGATION_ICONS: Record<string, ReactNode> = {
  '#home': (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site_header__icon">
      <path
        d="M4.5 10.5 12 4l7.5 6.5v8a1 1 0 0 1-1 1h-4.25v-5h-4.5v5H5.5a1 1 0 0 1-1-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  '#about': (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site_header__icon">
      <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M6.5 18.5a5.5 5.5 0 0 1 11 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  '#tech': (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site_header__icon">
      <path
        d="M8.5 8.5 6 12l2.5 3.5M15.5 8.5 18 12l-2.5 3.5M13.25 6l-2.5 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  '#projects': (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site_header__icon">
      <path
        d="M5.5 7.5h13M5.5 12h13M5.5 16.5h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
}

const NAVIGATION_ITEMS = [{ href: '#home', label: 'Home' }, ...HEADER_SECTION_LINKS]

export default function Header() {
  const [activeHref, setActiveHref] = useState('#home')
  const [isHeroActive, setIsHeroActive] = useState(true)

  useEffect(() => {
    const sections = NAVIGATION_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    ).filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) {
      return
    }

    // 작은 컨트롤러는 현재 읽고 있는 섹션만 명확히 보여주면 충분하므로 중앙 영역에 들어온 섹션을 active로 간주합니다.
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entry_a, entry_b) => entry_b.intersectionRatio - entry_a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveHref(`#${visibleEntry.target.id}`)
        }
      },
      {
        rootMargin: '-36% 0px -36% 0px',
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const heroSection = document.querySelector<HTMLElement>('#home')

    if (!heroSection) {
      return
    }

    const syncHeroVisibility = () => {
      const heroBounds = heroSection.getBoundingClientRect()
      const viewportMidpoint = window.innerHeight * 0.5

      // 히어로의 중앙 구간에서는 플로팅 내비게이션이 먼저 보이지 않도록 화면 중앙 기준으로 노출 여부를 계산합니다.
      setIsHeroActive(heroBounds.top <= viewportMidpoint && heroBounds.bottom >= viewportMidpoint)
    }

    syncHeroVisibility()

    window.addEventListener('scroll', syncHeroVisibility, { passive: true })
    window.addEventListener('resize', syncHeroVisibility)

    return () => {
      window.removeEventListener('scroll', syncHeroVisibility)
      window.removeEventListener('resize', syncHeroVisibility)
    }
  }, [])

  return (
    <header className={`site_header ${isHeroActive ? 'site_header--hero_active' : ''}`}>
      <nav className="site_header__navigation" aria-label="주요 탐색">
        {/* 히어로 안에서는 네비게이션이 사라지지 않고, 정보 구조를 보조하는 작은 컨트롤러로 남아 있어야 합니다. */}
        <div className="site_header__links">
          {NAVIGATION_ITEMS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`site_header__control ${link.href === '#home' ? 'site_header__home' : 'site_header__link'} ${activeHref === link.href ? 'site_header__control_active' : ''}`}
              aria-label={link.label}
              title={link.label}
              data-label={link.label}
              aria-current={activeHref === link.href ? 'location' : undefined}
            >
              {NAVIGATION_ICONS[link.href]}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
