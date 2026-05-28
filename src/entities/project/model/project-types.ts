export interface ProjectMeta {
  label: string
  value: string
}

export interface ProjectCaseStudy {
  title: string
  text: string
}

export type ProjectEvidenceKind = 'wide' | 'pair' | 'phone'

export type MediaSourceResolver = (source: string) => string

export interface ProjectEvidence {
  src: string
  alt: string
  caption: string
  kind: ProjectEvidenceKind
  objectPosition?: string
}

export interface PortfolioProject {
  slug: string
  title: string
  subtitle: string
  mobileDescription: string
  year: string
  type: string
  date: string
  role: string
  tools: string
  homeImage: string
  homeMobileImage: string
  homeVideo?: string
  homeMobileVideo?: string
  heroImage: string
  heroVideo?: string
  detailLogoImage?: string
  contextImage?: string
  contextImageAlt?: string
  homePosition: string
  homeMobilePosition: string
  heroPosition: string
  evidence: ProjectEvidence[]
  repository: string
  summary: string
  contribution: string
  meta: ProjectMeta[]
  caseStudy: ProjectCaseStudy[]
}
