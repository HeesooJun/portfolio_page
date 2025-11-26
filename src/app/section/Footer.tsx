// src/app/section/Footer.tsx
export default function Footer() {
  return (
    <footer className="site_footer">
      <div className="site_footer__content">
        <p className="site_footer__title">Heesoo Jun · Frontend Developer</p>
        <div className="site_footer__links">
          <a className="site_footer__link" href="mailto:acesk123@gmail.com">
            Email
          </a>
          <a className="site_footer__link" href="https://github.com/HeesooJun" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            className="site_footer__link"
            href="https://acesk123.tistory.com/"
            target="_blank"
            rel="noreferrer"
          >
            Blog
          </a>
        </div>
        <p className="site_footer__copyright">
          © {new Date().getFullYear()} Heesoo Jun
        </p>
      </div>
    </footer>
  );
}
