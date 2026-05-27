interface ProjectIntroRevealProps {
  title: string
  summary: string
  role: string
  date: string
  repository: string
  image: string
  imageAlt: string
  imagePosition: string
}

export default function ProjectIntroReveal({
  title,
  summary,
  role,
  date,
  repository,
  image,
  imageAlt,
  imagePosition,
}: ProjectIntroRevealProps) {
  const roles = role
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)
  const metaItems = [
    { label: 'About', value: [summary] },
    { label: roles.length > 1 ? 'Roles' : 'Role', value: roles },
    { label: 'Date', value: [date] },
  ]

  return (
    <section className="portfolio_detail_intro" aria-labelledby="project_detail_title">
      <div className="portfolio_detail_intro__inner">
        <div className="portfolio_detail_intro__copy">
          <h1 id="project_detail_title">{title}</h1>
        </div>
        <div className="portfolio_detail_intro__meta" aria-label="Project metadata">
          <dl>
            {metaItems.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  {item.value.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </dd>
              </div>
            ))}
            <div>
              <dt>Links</dt>
              <dd>
                <a href={`https://${repository}`} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <figure className="portfolio_detail_intro__visual">
        <img src={image} alt={imageAlt} style={{ objectPosition: imagePosition }} />
      </figure>
    </section>
  )
}
