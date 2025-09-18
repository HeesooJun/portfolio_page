// src/app/section/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-slate-900">Heesoo Jun · Frontend Developer</p>
        <div className="flex flex-wrap gap-4 uppercase tracking-wide">
          <a className="transition hover:text-[var(--accent)]" href="mailto:acesk123@gmail.com">
            Email
          </a>
          <a className="transition hover:text-[var(--accent)]" href="https://github.com/HeesooJun" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            className="transition hover:text-[var(--accent)]"
            href="https://acesk123.tistory.com/"
            target="_blank"
            rel="noreferrer"
          >
            Blog
          </a>
          <a
            className="transition hover:text-[var(--accent)]"
            href="https://tabby-shade-7bc.notion.site/7e54e99599774e74a5d659730efb0fd3?pvs=73"
            target="_blank"
            rel="noreferrer"
          >
            Notion
          </a>
        </div>
        <p className="text-xs uppercase tracking-[0.2em]">© {new Date().getFullYear()} Heesoo Jun</p>
      </div>
    </footer>
  );
}
