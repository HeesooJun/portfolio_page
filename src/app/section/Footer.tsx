import { FOOTER_EXTERNAL_LINKS } from "@/content/portfolio-content";

export default function Footer() {
  return (
    <footer className="site_footer">
      <div className="site_footer__content">
        <p className="site_footer__title">Heesoo Jun · Frontend Developer</p>
        <div className="site_footer__links">
          {FOOTER_EXTERNAL_LINKS.map((link) => {
            const isEmailLink = link.href.startsWith("mailto:");

            return (
              <a
                key={link.href}
                className="site_footer__link"
                href={link.href}
                target={isEmailLink ? undefined : "_blank"}
                rel={isEmailLink ? undefined : "noreferrer"}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <p className="site_footer__copyright">
          © {new Date().getFullYear()} Heesoo Jun
        </p>
      </div>
    </footer>
  );
}
