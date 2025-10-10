// src/app/section/Footer.tsx
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__title">Heesoo Jun · Frontend Developer</p>
        <div className="site-footer__links">
          <a className="site-footer__link" href="mailto:acesk123@gmail.com">
            Email
          </a>
          <a className="site-footer__link" href="https://github.com/HeesooJun" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            className="site-footer__link"
            href="https://acesk123.tistory.com/"
            target="_blank"
            rel="noreferrer"
          >
            Blog
          </a>
        </div>
        <p className="site-footer__copy">© {new Date().getFullYear()} Heesoo Jun</p>
      </div>
    </footer>
  );
}
