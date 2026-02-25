import type { StaticImageData } from "next/image";

import projectBeyondImage from "@/assets/project-beyond.svg";
import projectFienmeeImage from "@/assets/project-fienmee.svg";
import projectHelperImage from "@/assets/project-helper.svg";

export interface NavigationLink {
  href: string;
  label: string;
}

export interface ExternalLink {
  href: string;
  label: string;
}

export interface PortfolioProject {
  title: string;
  description: string;
  image: StaticImageData;
  tags: string[];
}

export interface TechCategory {
  title: string;
  description: string;
  items: string[];
}

export const HEADER_SECTION_LINKS: NavigationLink[] = [
  { href: "#experience", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#tech", label: "Tech" },
];

export const HEADER_EXTERNAL_LINKS: ExternalLink[] = [
  { href: "https://acesk123.tistory.com/", label: "Blog" },
  { href: "https://github.com/HeesooJun", label: "GitHub" },
];

export const PROJECT_ITEMS: PortfolioProject[] = [
  {
    title: "Fienmee · 대여/예약 커뮤니티",
    description:
      "중고 물품 대여와 공간 예약을 한 번에 처리할 수 있는 플랫폼의 화면 일부입니다.",
    image: projectFienmeeImage,
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Helper · 일정 추천",
    description:
      "OpenAI의 추천모델을 활용해 일정을 제안하는 웹 애플리케이션입니다.",
    image: projectHelperImage,
    tags: ["React", "Firebase"],
  },
  {
    title: "Beyond Imagination",
    description: "이미지 생성 프로젝트 홍보를 위한 랜딩 페이지 작업물입니다.",
    image: projectBeyondImage,
    tags: ["Next.js", "Contentful"],
  },
];

export const ABOUT_PRINCIPLES = [
  "사용자의 문제를 이해하고 해결책을 빠르게 제시합니다.",
  "협업 과정에서 열린 소통과 기록을 중요하게 생각합니다.",
  "마감을 지키면서도 완성도를 높이는 방법을 찾아갑니다.",
];

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    title: "Front-End",
    description: "UI와 사용자 흐름을 고려한 클라이언트 개발 경험입니다.",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML/CSS"],
  },
  {
    title: "Back-End & Data",
    description:
      "필요한 기능을 빠르게 연동하기 위한 서버/데이터 처리 경험입니다.",
    items: ["Node.js", "Express", "PHP", "MySQL", "Firebase"],
  },
  {
    title: "Collaboration & Tools",
    description: "원활한 협업과 운영을 돕는 도구들입니다.",
    items: ["Git", "Figma", "Contentful", "Storybook", "Notion"],
  },
];

export const FOOTER_EXTERNAL_LINKS: ExternalLink[] = [
  { href: "mailto:acesk123@gmail.com", label: "Email" },
  { href: "https://github.com/HeesooJun", label: "GitHub" },
  { href: "https://acesk123.tistory.com/", label: "Blog" },
];
