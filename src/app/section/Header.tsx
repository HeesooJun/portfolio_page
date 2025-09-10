// src/app/section/Header.tsx
export default function Header() {
  return (
    <header className="top-0 inset-x-0 bg-white shadow z-50">
      <nav className="flex gap-6 p-4">
        <a href="#home">Heesoo Jun</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#tech">Tech</a>
        <a
          href="https://acesk123.tistory.com/"
          target="_blank"
          rel="noreferrer"
        >
          Blog
        </a>
      </nav>
    </header>
  );
}
