import nameLogoImage from '@/assets/name-logo3.png'

interface SiteHeaderProps {
  isHidden: boolean
}

export default function SiteHeader({ isHidden }: SiteHeaderProps) {
  return (
    <header className="portfolio_header" data-hidden={isHidden}>
      <a href="#home" className="portfolio_header__brand">
        <img className="portfolio_header__logo" src={nameLogoImage} alt="Heesoo Jun" />
      </a>
      <nav className="portfolio_header__nav" aria-label="Portfolio navigation">
        <a href="#index">Index</a>
        <a href="#about">About</a>
      </nav>
    </header>
  )
}
