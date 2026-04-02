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
  '#experience': (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site_header__icon">
      <path
        d="M8 7V5.75A1.75 1.75 0 0 1 9.75 4h4.5A1.75 1.75 0 0 1 16 5.75V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="7"
        width="16"
        height="11"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
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
}

const NAVIGATION_ITEMS = [{ href: '#home', label: 'Home' }, ...HEADER_SECTION_LINKS]

export default function Header() {
  const [activeHref, setActiveHref] = useState('#home')

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

  return (
    <header className="site_header">
      <nav className="site_header__navigation" aria-label="주요 탐색">
        {/* 텍스트를 세로로 읽게 하기보다 아이콘 중심 컨트롤러로 줄여서 화면 분위기를 해치지 않게 유지합니다. */}
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
