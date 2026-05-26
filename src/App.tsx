import { useEffect, useMemo, useState } from 'react'

import heygentImage from '@/assets/project-main/heygent.png'
import lifesaviorImage from '@/assets/project-main/lifesavior.png'
import piviewImage from '@/assets/project-main/piview.png'

interface ProjectMeta {
  label: string
  value: string
}

interface ProjectCaseStudy {
  title: string
  text: string
}

interface PortfolioProject {
  slug: string
  title: string
  subtitle: string
  year: string
  type: string
  date: string
  role: string
  tools: string
  image: string
  repository: string
  summary: string
  contribution: string
  meta: ProjectMeta[]
  caseStudy: ProjectCaseStudy[]
}

type PortfolioView =
  | { name: 'home' }
  | { name: 'index' }
  | { name: 'about' }
  | { name: 'project'; slug: string }

const AUTOPLAY_SECONDS = 12

const PROJECTS: PortfolioProject[] = [
  {
    slug: 'heygent',
    title: 'HeyGent',
    subtitle: '멀티 디바이스 AI 오케스트레이션',
    year: '2026',
    type: 'AI Orchestration / Web / Mobile / IoT',
    date: '2026.04 - 2026.05',
    role: 'AI Lead / Orchestration / FE Integration / Docs',
    tools: 'Spring Boot, FastAPI, React, Android, MQTT',
    image: heygentImage,
    repository: 'github.com/HeesooJun/S-Free',
    summary:
      '사용자의 요청을 여러 작업 단위로 나누고, 웹과 모바일 화면에 실행 상태를 실시간으로 되돌려 주는 AI 작업 실행 플랫폼입니다.',
    contribution:
      'TaskRun과 StepRun 실행 모델을 설계하고, WebSocket 이벤트 흐름과 에이전트 작업 보드의 상태 표현을 연결했습니다.',
    meta: [
      { label: 'Platform', value: 'Web · Mobile · IoT' },
      { label: 'Focus', value: 'Task orchestration' },
      { label: 'Stack', value: 'Spring Boot · FastAPI · React' },
    ],
    caseStudy: [
      {
        title: '작업을 대화가 아니라 실행 단위로 바꾸기',
        text: '단순 채팅 응답 대신 요청, 단계, 이벤트를 분리해 사용자가 지금 어떤 일이 처리되는지 따라갈 수 있게 정리했습니다.',
      },
      {
        title: '여러 화면에 같은 진행 상태를 전달하기',
        text: '웹, 모바일, IoT 디스플레이가 같은 작업 맥락을 공유하도록 이벤트와 상태 명명을 맞추고 실시간 반영 흐름을 구성했습니다.',
      },
      {
        title: 'AI 도구 호출을 제품 화면에 맞게 번역하기',
        text: '터미널, 파일, 브라우저, 외부 서비스 실행 결과를 사용자가 읽을 수 있는 로그와 카드 형태로 정리했습니다.',
      },
    ],
  },
  {
    slug: 'piview',
    title: 'PiView',
    subtitle: '스킨케어 큐레이션과 추천 검색',
    year: '2026',
    type: 'Big Data / Recommendation / AI Chatbot',
    date: '2026.02 - 2026.03',
    role: 'AI / Backend Integration',
    tools: 'Spring Boot, Next.js, FastAPI, ChromaDB',
    image: piviewImage,
    repository: 'github.com/HeesooJun/S-bigdata',
    summary:
      '피부 상태와 설문 응답을 바탕으로 제품을 분석하고, 검색과 추천, 루틴 관리를 하나의 흐름으로 묶은 스킨케어 플랫폼입니다.',
    contribution:
      '피부 분석, 추천 검색, RAG 챗봇, 상품 비교 로직을 연결해 사용자가 왜 이 제품을 봐야 하는지 설명되는 흐름을 만들었습니다.',
    meta: [
      { label: 'Platform', value: 'Web' },
      { label: 'Focus', value: 'Recommendation flow' },
      { label: 'Stack', value: 'Spring Boot · Next.js · AI' },
    ],
    caseStudy: [
      {
        title: '피부 상태를 추천 기준으로 정리하기',
        text: '피부 타입, 고민, 성분 정보를 단순 필터가 아니라 추천 점수와 설명의 기준으로 사용할 수 있게 구조화했습니다.',
      },
      {
        title: '검색 결과에 이유를 붙이기',
        text: '상품명 검색, 벡터 검색, 정확 검색을 함께 사용해 결과가 나오고, 챗봇이 그 이유를 설명하는 흐름을 설계했습니다.',
      },
      {
        title: '루틴 관리까지 이어지는 화면 흐름',
        text: '추천에서 끝나는 화면이 아니라 저장, 비교, 루틴 편집으로 이어지도록 주요 사용자 행동을 한 방향으로 묶었습니다.',
      },
    ],
  },
  {
    slug: 'lifesavior',
    title: 'Lifesavior',
    subtitle: '오프라인 구조 지원 서비스',
    year: '2026',
    type: 'Android / Offline Rescue / BLE Mesh',
    date: '2026.02 - 2026.05',
    role: 'Mobile rescue flow / Offline communication',
    tools: 'Kotlin, Jetpack Compose, BLE, UWB',
    image: lifesaviorImage,
    repository: 'github.com/HeesooJun/S-mobile',
    summary:
      '인터넷이 끊긴 재난 상황에서도 BLE 기반 주변 단말을 거쳐 구조 신호를 전달하고 구조자가 우선순위를 판단하도록 돕는 앱입니다.',
    contribution:
      '피구조자와 구조자 앱 흐름을 분리하고, SOS 전송, 주변 탐색, 거리 추정, 긴급 모드 화면을 실제 현장 사용 기준으로 정리했습니다.',
    meta: [
      { label: 'Platform', value: 'Android' },
      { label: 'Focus', value: 'Offline emergency UX' },
      { label: 'Stack', value: 'Kotlin · Compose · BLE' },
    ],
    caseStudy: [
      {
        title: '연결이 없는 상황을 기본값으로 두기',
        text: '긴급 화면은 네트워크가 없다는 전제를 먼저 두고, 구조 신호와 상태 피드백이 끊기지 않도록 구성했습니다.',
      },
      {
        title: '구조자와 피구조자의 화면을 분리하기',
        text: '피구조자는 SOS와 상태 전달에 집중하고, 구조자는 주변 사람 목록과 거리, 위험도를 빠르게 판단하도록 화면을 나눴습니다.',
      },
      {
        title: '신뢰 가능한 패킷 흐름 만들기',
        text: 'TTL, 중복 제거, 재전송, 서명 검증을 고려해 오프라인 구간에서도 구조 신호가 안전하게 이어지도록 설계했습니다.',
      },
    ],
  },
]

const ABOUT_COLUMNS = [
  {
    title: 'Experience',
    items: ['SSAFY product projects', 'AI service integration', 'Mobile emergency UX'],
  },
  {
    title: 'Stack',
    items: ['React / TypeScript', 'Spring Boot / FastAPI', 'Kotlin / Jetpack Compose'],
  },
  {
    title: 'Tools',
    items: ['GitHub', 'Figma', 'Notion', 'Mattermost'],
  },
]

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

function getViewLabel(view: PortfolioView) {
  if (view.name === 'project') {
    const project = PROJECTS.find((item) => item.slug === view.slug)
    return project?.title ?? 'Project'
  }

  if (view.name === 'index') {
    return 'Index'
  }

  if (view.name === 'about') {
    return 'About'
  }

  return 'Home'
}

function navigateTo(hash: string) {
  window.location.hash = hash
}

function romanize(index: number) {
  return ['I', 'II', 'III'][index] ?? `${index + 1}`
}

export default function App() {
  const [view, setView] = useState<PortfolioView>(() => resolveViewFromHash(window.location.hash))
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
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
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    if (view.name !== 'home') {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveProjectIndex((currentIndex) => (currentIndex + 1) % PROJECTS.length)
    }, AUTOPLAY_SECONDS * 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [view.name])

  useEffect(() => {
    document.querySelector('.portfolio_shell__scroll')?.scrollTo({ top: 0 })
  }, [view])

  return (
    <div className={`portfolio_shell portfolio_shell--${view.name}`}>
      <SiteHeader view={view} />
      {view.name === 'home' ? (
        <HomeView
          activeProjectIndex={activeProjectIndex}
          setActiveProjectIndex={setActiveProjectIndex}
        />
      ) : null}
      {view.name === 'index' ? <IndexView activeProjectSlug={currentProject.slug} /> : null}
      {view.name === 'about' ? <AboutView /> : null}
      {view.name === 'project' ? (
        <ProjectDetailView project={currentProject} nextProject={nextProject} />
      ) : null}
    </div>
  )
}

function SiteHeader({ view }: { view: PortfolioView }) {
  return (
    <header className="portfolio_header">
      <button type="button" className="portfolio_header__brand" onClick={() => navigateTo('home')}>
        <span>HS</span>
        <span>{getViewLabel(view)}</span>
      </button>
      <nav className="portfolio_header__nav" aria-label="Portfolio navigation">
        <button type="button" onClick={() => navigateTo('index')}>
          Index
        </button>
        <button type="button" onClick={() => navigateTo('about')}>
          About
        </button>
      </nav>
    </header>
  )
}

function HomeView({
  activeProjectIndex,
  setActiveProjectIndex,
}: {
  activeProjectIndex: number
  setActiveProjectIndex: (index: number) => void
}) {
  const project = PROJECTS[activeProjectIndex]

  return (
    <main className="portfolio_home" aria-label="Home">
      <div className="portfolio_home__media_stage">
        {PROJECTS.map((item, index) => (
          <img
            key={item.slug}
            src={item.image}
            alt=""
            className={`portfolio_home__image ${
              index === activeProjectIndex ? 'portfolio_home__image--active' : ''
            }`}
            aria-hidden={index !== activeProjectIndex}
          />
        ))}
      </div>
      <section className="portfolio_home__center" aria-labelledby="home_project_title">
        <p className="portfolio_home__kicker">Selected project</p>
        <h1 id="home_project_title">{project.title}</h1>
        <button type="button" onClick={() => navigateTo(`project/${project.slug}`)}>
          Discover project
        </button>
      </section>
      <div className="portfolio_home__bottom">
        <div className="portfolio_home__count">
          <span>{romanize(activeProjectIndex)}</span>
          <span>{romanize(PROJECTS.length - 1)}</span>
        </div>
        <div className="portfolio_home__progress" key={project.slug} aria-hidden="true">
          <span />
        </div>
        <div className="portfolio_home__controls" aria-label="Project controls">
          {PROJECTS.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`${item.title} 보기`}
              className={index === activeProjectIndex ? 'portfolio_home__dot--active' : ''}
              onClick={() => setActiveProjectIndex(index)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function IndexView({ activeProjectSlug }: { activeProjectSlug: string }) {
  const [previewSlug, setPreviewSlug] = useState(activeProjectSlug)
  const previewProject = PROJECTS.find((project) => project.slug === previewSlug) ?? PROJECTS[0]

  return (
    <main className="portfolio_shell__scroll portfolio_index" aria-label="Project index">
      <section className="portfolio_index__intro">
        <p>Index</p>
        <h1>Selected Projects</h1>
      </section>
      <section className="portfolio_index__list" aria-label="Project list">
        {PROJECTS.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className="portfolio_index__row"
            onMouseEnter={() => setPreviewSlug(project.slug)}
            onFocus={() => setPreviewSlug(project.slug)}
            onClick={() => navigateTo(`project/${project.slug}`)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{project.title}</strong>
            <span>{project.type}</span>
            <span>{project.year}</span>
          </button>
        ))}
      </section>
      <aside className="portfolio_index__preview" aria-hidden="true">
        <img src={previewProject.image} alt="" />
      </aside>
      <footer className="portfolio_index__footer">
        <span>Frontend portfolio</span>
        <span>Jeon Heesoo</span>
        <span>GitHub / Blog / Email</span>
      </footer>
    </main>
  )
}

function AboutView() {
  return (
    <main className="portfolio_shell__scroll portfolio_about" aria-label="About">
      <section className="portfolio_about__statement">
        <p>About</p>
        <h1>
          화면의 첫인상과 실제 기능의 흐름이 같은 방향을 향하도록 설계하는 프론트엔드 개발자입니다.
        </h1>
      </section>
      <section className="portfolio_about__body">
        <p>
          사용자가 무엇을 먼저 이해해야 하는지, 어떤 상태를 확인해야 하는지, 다음 행동으로 어떻게
          넘어가야 하는지를 화면 구조와 인터랙션으로 정리합니다. 프로젝트에서는 AI, 추천, 모바일
          구조 서비스처럼 복잡한 기능을 사용자가 읽을 수 있는 제품 화면으로 바꾸는 역할을
          맡았습니다.
        </p>
        <a href="https://github.com/HeesooJun" target="_blank" rel="noreferrer">
          github.com/HeesooJun
        </a>
      </section>
      <section className="portfolio_about__columns" aria-label="Profile details">
        {ABOUT_COLUMNS.map((column) => (
          <article key={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  )
}

function ProjectDetailView({
  project,
  nextProject,
}: {
  project: PortfolioProject
  nextProject: PortfolioProject
}) {
  return (
    <main
      className="portfolio_shell__scroll portfolio_detail"
      aria-label={`${project.title} detail`}
    >
      <section className="portfolio_detail__hero">
        <div>
          <p>{project.type}</p>
          <h1>{project.title}</h1>
        </div>
        <p>{project.summary}</p>
      </section>
      <section className="portfolio_detail__meta" aria-label="Project metadata">
        <dl>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{project.date}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{project.tools}</dd>
          </div>
        </dl>
      </section>
      <section className="portfolio_detail__visual">
        <img src={project.image} alt={`${project.title} 대표 화면`} />
      </section>
      <section className="portfolio_detail__narrative">
        <p>{project.subtitle}</p>
        <h2>{project.contribution}</h2>
      </section>
      <section className="portfolio_detail__case_grid">
        {project.caseStudy.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <section className="portfolio_detail__wide_media">
        <img src={project.image} alt="" />
      </section>
      <section className="portfolio_detail__metrics">
        {project.meta.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>
      <section className="portfolio_detail__repository">
        <p>Repository</p>
        <a href={`https://${project.repository}`} target="_blank" rel="noreferrer">
          {project.repository}
        </a>
      </section>
      <button
        type="button"
        className="portfolio_detail__next"
        onClick={() => navigateTo(`project/${nextProject.slug}`)}
      >
        <span>Next Project</span>
        <strong>{nextProject.title}</strong>
      </button>
    </main>
  )
}
