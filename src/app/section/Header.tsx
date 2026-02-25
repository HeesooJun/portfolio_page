// src/app/section/Header.tsx
import {
  HEADER_EXTERNAL_LINKS,
  HEADER_SECTION_LINKS,
} from "@/content/portfolio-content";

export default function Header() {
  return (
    <header className="site_header">
      <nav className="site_header__navigation">
        <a href="#home" className="site_header__brand">
          Heesoo Jun
        </a>
        <div className="site_header__links">
          {HEADER_SECTION_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="site_header__link">
              {link.label}
            </a>
          ))}
          {HEADER_EXTERNAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="site_header__link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
