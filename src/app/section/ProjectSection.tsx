import Image from "next/image";

interface ProjectCard {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const PROJECTS: ProjectCard[] = [
  {
    title: "Fienmee – 행사/축제 커뮤니티",
    description: "전국 행사 정보를 한 곳에 모으고 타임테이블로 관리할 수 있는 플랫폼의 화면 일부입니다.",
    image: "/exPage/1.png",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Helper – 여행 추천",
    description: "OpenAI와 공공데이터를 활용해 맞춤 일정을 제안하는 서비스 프로토타입.",
    image: "/exPage/2.png",
    tags: ["React", "Firebase"],
  },
  {
    title: "Beyond Imagination",
    description: "동아리 웹사이트 개선 작업과 실험 중인 UI 스냅샷.",
    image: "/exPage/3.png",
    tags: ["Next.js", "Contentful"],
  },
];

export default function ProjectSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl space-y-10 py-24">
      <h2 className="section-heading">Projects</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
        디자인 배치.
      </p>
      <div className="project-grid">
        {PROJECTS.map((project) => (
          <article key={project.title} className="project-card">
            <Image
              src={project.image}
              alt={project.title}
              width={960}
              height={600}
              className="h-full w-full object-cover"
            />
            <div className="project-meta">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span>{project.tags.join(" · ")}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
