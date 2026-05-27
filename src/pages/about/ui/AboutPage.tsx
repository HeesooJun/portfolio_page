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

export default function AboutPage() {
  return (
    <main className="portfolio_shell__scroll portfolio_about" aria-label="About">
      <section className="portfolio_about__statement">
        <p>About</p>
        <h1>화면의 첫인상과 실제 기능의 흐름을 같은 방향으로 설계합니다.</h1>
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
