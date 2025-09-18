// src/app/section/Header.tsx
const NAV_LINKS = [
  { href: "#experience", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#tech", label: "Tech" },
];

const EXTERNAL_LINKS = [
  { href: "https://acesk123.tistory.com/", label: "Blog" },
  {
    href: "https://tabby-shade-7bc.notion.site/7e54e99599774e74a5d659730efb0fd3?pvs=73",
    label: "Notion",
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 text-sm uppercase tracking-wide text-slate-600">
        <a href="#home" className="text-base font-semibold text-slate-900">
          Heesoo Jun
        </a>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-[var(--accent)]">
              {link.label}
            </a>
          ))}
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
          <a
            className="transition hover:text-[var(--accent)]"
            href="https://github.com/HeesooJun"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
