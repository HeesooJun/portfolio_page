import Image from "next/image";

import { PROJECT_ITEMS } from "@/content/portfolio-content";

export default function ProjectSection() {
  return (
    <section id="experience" className="projects_section">
      <div className="projects_section__container">
        <h2 className="projects_section__heading">Projects</h2>
        <p className="projects_section__introduction">
          최근에 참여했던 작업입니다.
        </p>
        <div className="projects_section__grid">
          {PROJECT_ITEMS.map((project) => (
            <article key={project.title} className="projects_section__card">
              <Image
                src={project.image}
                alt={project.title}
                sizes="(min-width: 768px) 48vw, 100vw"
                loading="lazy"
                className="projects_section__image"
              />
              <div className="projects_section__details">
                <h3 className="projects_section__details_title">
                  {project.title}
                </h3>
                <p className="projects_section__details_description">
                  {project.description}
                </p>
                <span className="projects_section__details_tags">
                  {project.tags.join(" · ")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
