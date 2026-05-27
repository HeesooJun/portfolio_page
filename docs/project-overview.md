# 프로젝트 개요

## 기술 스택

- Vite 8 + React 19 + TypeScript 6
- Tailwind CSS 4: `@tailwindcss/vite` 플러그인과 `@import "tailwindcss"` 조합 사용
- ESLint 9 + Prettier + Husky + lint-staged
- `prettier-plugin-tailwindcss`: Tailwind 유틸리티 클래스 자동 정렬

## 주요 구조

- `src/main.tsx`: React 진입점과 전역 스타일 연결
- `src/app/App.tsx`: hash 기반 뷰 전환, 홈 자동 전환, 헤더 노출 상태를 조합하는 앱 루트
- `src/widgets/*`: `PortfolioShell`, `SiteHeader`처럼 화면 전역 레이아웃을 담당하는 큰 블록
- `src/pages/*`: home, project index, project detail, about 화면 단위 UI
- `src/entities/project/model/*`: 프로젝트 타입과 실제 프로젝트 데이터
- `src/shared/*`: 화면 간 공통으로 쓰는 라우팅/표기 유틸리티
- 스타일은 현재 `src/styles/portfolio-shell.css`에 Tailwind `@layer components`로 통합되어 있습니다.

## 콘텐츠 상태 메모

- 프로젝트 설명과 상세 페이지 내용은 `src/entities/project/model/project-data.ts`의 정적 데이터 기반입니다.
- 현재 실사용 자산은 `src/assets/main`, `src/assets/project-main`, `src/assets/project-evidence`, `src/assets/name-logo3.png`에 모아 둡니다.
- 사용하지 않는 3D/GSAP/Lenis/Theatre 실험 런타임과 예전 섹션 구조는 제거했습니다.

## 실행

```bash
npm install
npm run dev
```

## 검증

```bash
npm run lint
npm run typecheck
npm run build
```

필요하면 `npm run verify`로 세 검증을 한 번에 실행할 수 있습니다.
