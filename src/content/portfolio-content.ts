import projectBeyondImage from '@/assets/project-beyond.svg'
import projectFienmeeImage from '@/assets/project-fienmee.svg'
import projectHelperImage from '@/assets/project-helper.svg'

export interface NavigationLink {
  href: string
  label: string
}

export interface ExternalLink {
  href: string
  label: string
}

export interface PortfolioProject {
  title: string
  description: string
  image: string
  tags: string[]
}

export interface TechCategory {
  title: string
  description: string
  items: string[]
}

export interface HeroMetaItem {
  label: string
  value: string
}

export const HEADER_SECTION_LINKS: NavigationLink[] = [
  { href: '#about', label: 'About' },
  { href: '#tech', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
]

export const HEADER_EXTERNAL_LINKS: ExternalLink[] = [
  { href: 'https://acesk123.tistory.com/', label: 'Blog' },
  { href: 'https://github.com/HeesooJun', label: 'GitHub' },
]

export const PROJECT_ITEMS: PortfolioProject[] = [
  {
    title: 'Fienmee · 대여/예약 커뮤니티',
    description: '중고 물품 대여와 공간 예약을 한 번에 처리할 수 있는 플랫폼의 화면 일부입니다.',
    image: projectFienmeeImage,
    tags: ['Next.js', 'TypeScript'],
  },
  {
    title: 'Helper · 일정 추천',
    description: 'OpenAI의 추천모델을 활용해 일정을 제안하는 웹 애플리케이션입니다.',
    image: projectHelperImage,
    tags: ['React', 'Firebase'],
  },
  {
    title: 'Beyond Imagination',
    description: '이미지 생성 프로젝트 홍보를 위한 랜딩 페이지 작업물입니다.',
    image: projectBeyondImage,
    tags: ['Next.js', 'Contentful'],
  },
]

export const HERO_SCENE_LABEL = 'Scene 01 · Rooftop Signal'

export const HERO_TITLE = 'Signal Before Dawn'

export const HERO_DESCRIPTION =
  '도시의 표면에서 신호를 감지하고, 유리와 안개 사이로 작업 아카이브를 현실 레이어로 끌어올리는 프런트엔드 제품 엔지니어 포트폴리오입니다.'

export const HERO_META_ITEMS: HeroMetaItem[] = [
  { label: 'Role', value: 'Frontend Product Engineer' },
  { label: 'Focus', value: 'React · TypeScript · Interface Systems' },
  { label: 'Mode', value: 'Calm Blue UI with Layered Motion' },
]

export const ABOUT_INTRODUCTION =
  '사용자 경험은 보기 좋은 화면보다, 무엇을 먼저 이해시키고 어떤 흐름으로 행동하게 만드는지에서 결정된다고 생각합니다. 그래서 화면 구조와 인터랙션 명분을 함께 설계하는 프런트엔드 작업을 선호합니다.'

export const ABOUT_PROFILE_NOTES = [
  '문제 정의와 인터페이스 구조를 함께 정리합니다.',
  '협업 과정의 의사결정과 기록을 남겨 다음 작업 속도를 높입니다.',
  '완성도와 일정 사이에서 실제 서비스 기준의 우선순위를 세웁니다.',
]

export const TECH_INTRODUCTION =
  '기능 구현만이 아니라, 제품 문맥 안에서 어떤 기술 조합이 가장 안정적으로 경험을 지지하는지까지 고려하며 선택합니다.'

export const PROJECTS_INTRODUCTION =
  '히어로에서 떠오른 아카이브가 실제 작업 기록으로 이어지도록, 주요 작업을 같은 재질 언어 안에서 다시 정리했습니다.'

export const ABOUT_PRINCIPLES = [
  '사용자의 문제를 이해하고 해결책을 빠르게 제시합니다.',
  '협업 과정에서 열린 소통과 기록을 중요하게 생각합니다.',
  '마감을 지키면서도 완성도를 높이는 방법을 찾아갑니다.',
]

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    title: 'Front-End',
    description: 'UI와 사용자 흐름을 고려한 클라이언트 개발 경험입니다.',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML/CSS'],
  },
  {
    title: 'Back-End & Data',
    description: '필요한 기능을 빠르게 연동하기 위한 서버/데이터 처리 경험입니다.',
    items: ['Node.js', 'Express', 'PHP', 'MySQL', 'Firebase'],
  },
  {
    title: 'Collaboration & Tools',
    description: '원활한 협업과 운영을 돕는 도구들입니다.',
    items: ['Git', 'Figma', 'Contentful', 'Storybook', 'Notion'],
  },
]

export const FOOTER_EXTERNAL_LINKS: ExternalLink[] = [
  { href: 'mailto:acesk123@gmail.com', label: 'Email' },
  { href: 'https://github.com/HeesooJun', label: 'GitHub' },
  { href: 'https://acesk123.tistory.com/', label: 'Blog' },
]
