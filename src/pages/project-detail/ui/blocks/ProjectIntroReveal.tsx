interface ProjectIntroRevealProps {
  type: string
  title: string
  summary: string
  role: string
  date: string
  image: string
  imageAlt: string
  imagePosition: string
}

export default function ProjectIntroReveal({
  type,
  title,
  summary,
  role,
  date,
  image,
  imageAlt,
  imagePosition,
}: ProjectIntroRevealProps) {
  const metaItems = [
    { label: 'Summary', value: summary },
    { label: 'Role', value: role },
    { label: 'Date', value: date },
  ]

  return (
    <section className="portfolio_detail_intro" aria-labelledby="project_detail_title">
      <div className="portfolio_detail_intro__inner">
        <div className="portfolio_detail_intro__copy">
          <p>{type}</p>
          <h1 id="project_detail_title">{title}</h1>
        </div>
        <div className="portfolio_detail_intro__meta" aria-label="Project metadata">
          <dl>
            {metaItems.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <figure className="portfolio_detail_intro__visual">
        <img src={image} alt={imageAlt} style={{ objectPosition: imagePosition }} />
      </figure>
    </section>
  )
}
