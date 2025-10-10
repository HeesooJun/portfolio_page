import Image from "next/image";

interface ProjectCard {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const PROJECTS: ProjectCard[] = [
  {
    title: "Fienmee · 대여/예약 커뮤니티",
    description: "중고 물품 대여와 공간 예약을 한 번에 처리할 수 있는 플랫폼의 화면 일부입니다.",
    image: "/exPage/1.png",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Helper · 일정 추천",
    description: "OpenAI의 추천모델을 활용해 일정을 제안하는 웹 애플리케이션입니다.",
    image: "/exPage/2.png",
    tags: ["React", "Firebase"],
  },
  {
    title: "Beyond Imagination",
    description: "이미지 생성 프로젝트 홍보를 위한 랜딩 페이지 작업물입니다.",
    image: "/exPage/3.png",
    tags: ["Next.js", "Contentful"],
  },
];

export default function ProjectSection() {
  return (
    <section id="experience" className="projects-section">
      <h2 className="projects-section__heading">Projects</h2>
      <p className="projects-section__intro">
        최근에 참여했던 작업입니다.
      </p>
      <div className="projects-section__grid">
        {PROJECTS.map((project) => (
          <article key={project.title} className="projects-section__card">
            <Image
              src={project.image}
              alt={project.title}
              width={960}
              height={600}
              className="projects-section__image"
            />
            <div className="projects-section__meta">
              <h3 className="projects-section__meta-title">{project.title}</h3>
              <p className="projects-section__meta-desc">{project.description}</p>
              <span className="projects-section__meta-tags">{project.tags.join(" · ")}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
