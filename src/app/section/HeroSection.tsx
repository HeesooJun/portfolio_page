// src/app/section/HeroSection.tsx
export default function HeroSection() {
  return (
    <section id="home" className="mx-auto max-w-5xl py-24">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Hi, I&apos;m</p>
      <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
        Heesoo Jun
      </h1>
      <p className="mt-4 text-2xl text-slate-700">
        A developer who enjoys crafting visible results on the web
      </p>
      <p className="mt-3 text-sm font-medium text-slate-500">
        현재 SSAFY 14기로 학습하며 React와 TypeScript로 인터페이스를 만들고, 사용자가 신뢰할 수 있는 경험을 설계합니다.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />1998.12.15
        </span>
        <a className="transition hover:text-[var(--accent)]" href="mailto:acesk123@gmail.com">
          acesk123@gmail.com
        </a>
        <a
          className="transition hover:text-[var(--accent)]"
          href="https://tabby-shade-7bc.notion.site/7e54e99599774e74a5d659730efb0fd3?pvs=73"
          target="_blank"
          rel="noreferrer"
        >
          Notion Profile ↗
        </a>
        <a
          className="transition hover:text-[var(--accent)]"
          href="https://github.com/HeesooJun"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </section>
  );
}
