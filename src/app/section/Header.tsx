// src/app/section/Header.tsx
const NAV_LINKS = [
  { href: "#experience", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#tech", label: "Tech" },
];

const EXTERNAL_LINKS = [
  { href: "https://acesk123.tistory.com/", label: "Blog" },
];

export default function Header() {
  return (
    <header className="site-header">
      <nav className="site-header__nav">
        <a href="#home" className="site-header__brand">
          Heesoo Jun
        </a>
        <div className="site-header__links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="site-header__link">
              {link.label}
            </a>
          ))}
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="site-header__link"
            >
              {link.label}
            </a>
          ))}
          <a
            className="site-header__link"
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
