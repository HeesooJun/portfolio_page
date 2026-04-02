# 프로젝트 개요

## 기술 스택

- Vite 8 + React 19 + TypeScript 6
- Tailwind CSS 4: `@tailwindcss/vite` 플러그인과 `@import "tailwindcss"` 조합 사용
- ESLint 9 + Prettier + Husky + lint-staged
- `prettier-plugin-tailwindcss`: Tailwind 유틸리티 클래스 자동 정렬

## 주요 구조

- `src/main.tsx`: React 진입점과 전역 스타일 연결
- `src/App.tsx`: Header → Hero → Projects → About → Tech → Footer 순서로 단일 페이지 조합
- 섹션 컴포넌트(`src/app/section/*`): 정적 배열 데이터로 카드와 리스트 렌더링
- 스타일(`src/styles/*.css`): Tailwind `@layer components`로 정의, 공통 포인트 컬러 `--accent: #2563eb` 사용

## 콘텐츠 상태 메모

- Hero 소개 문구와 프로젝트 설명은 정적 콘텐츠 기반입니다.
- 자산: `src/assets/HeroSection.png` 포함, 색상 팔레트 기록은 `docs/color.md`에 있음
- 현재 빌드 산출물 기준 가장 큰 자산은 Hero 배경 이미지이며, 추후 최적화 후보입니다.

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
