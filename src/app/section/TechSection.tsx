// src/app/section/TechSection.tsx
interface TechCategory {
  title: string;
  description: string;
  items: string[];
}

const TECH_STACK: TechCategory[] = [
  {
    title: "Front-End",
    description: "사용자 경험을 빠르게 실험하고 전달하기 위해 매일 사용하는 기술들입니다.",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML/CSS"],
  },
  {
    title: "Back-End & Data",
    description: "필요한 기능을 직접 만들어보기 위해 다뤄 본 서버와 데이터베이스 경험입니다.",
    items: ["Node.js", "Express", "PHP", "MySQL", "Firebase"],
  },
  {
    title: "Collaboration & Tools",
    description: "팀과 흐름을 공유하고 더 나은 산출물을 만들 때 자주 사용하는 도구입니다.",
    items: ["Git", "Figma", "Contentful", "Storybook", "Notion"],
  },
];

export default function TechSection() {
  return (
    <section id="tech" className="mx-auto max-w-5xl space-y-6 py-24">
      <h2 className="section-heading">Skills</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
        프런트엔드를 중심으로 하지만, 필요한 경우 백엔드와 데이터 처리까지 직접 다루며 서비스를 완성도 있게 만들고자 합니다.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {TECH_STACK.map((category) => (
          <article
            key={category.title}
            className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600"
          >
            <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{category.description}</p>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
