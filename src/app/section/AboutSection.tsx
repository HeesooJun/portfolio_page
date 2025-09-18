// src/app/section/AboutSection.tsx
const PRINCIPLES = [
  "눈에 보이는 결과물을 빠르게 만들어 팀의 속도를 유지합니다.",
  "한 번 맡은 일은 끝까지 책임지는 집요함을 강점으로 삼습니다.",
  "배운 것을 기록하고 공유하며 성장의 흐름을 기록합니다.",
];

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-5xl space-y-6 py-24">
      <h2 className="section-heading">About</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
        컴퓨터공학 전공을 바탕으로 프런트엔드에서 눈에 보이는 결과를 만드는 일에 매력을 느꼈습니다. React와 TypeScript를 주로 사용하며,
        인터페이스 구현뿐 아니라 기획·디자인과 함께 제품 목표를 맞추는 과정을 즐깁니다.
      </p>
      <ul className="grid gap-3 text-sm text-slate-600 md:grid-cols-3">
        {PRINCIPLES.map((item) => (
          <li key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
