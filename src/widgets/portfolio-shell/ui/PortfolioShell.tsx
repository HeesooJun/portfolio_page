import type { ReactNode } from 'react'

import SiteHeader from '@/widgets/site-header/ui/SiteHeader'

interface PortfolioShellProps {
  viewName: string
  isHeaderHidden: boolean
  children: ReactNode
}

export default function PortfolioShell({
  viewName,
  isHeaderHidden,
  children,
}: PortfolioShellProps) {
  return (
    <div className={`portfolio_shell portfolio_shell--${viewName}`}>
      <SiteHeader isHidden={isHeaderHidden} />
      {children}
    </div>
  )
}
