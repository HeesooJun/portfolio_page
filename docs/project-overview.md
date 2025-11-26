# 프로젝트 개요

## 기술 스택
- Next.js 15(App Router) + React 19 + TypeScript 5
- Tailwind CSS 4: `@import "tailwindcss"`를 `globals.css`에서 사용
- next/font로 Inter 적용, ESLint는 `next/core-web-vitals` 기반

## 주요 구조
- `src/app/layout.tsx`: 글로벌 폰트, 배경/텍스트 컬러, 기본 래퍼
- `src/app/page.tsx`: Header → Hero → Projects → About → Skills → Footer 순서로 조합
- 섹션 컴포넌트(`src/app/section/*`): 정적 배열 데이터로 카드/리스트 렌더링
- 스타일(`src/styles/*.css`): Tailwind `@layer components`로 정의, 공통 포인트 컬러 `--accent: #f43f5e`와 부드러운 스크롤 마진 설정(`globals.css`)

## 콘텐츠 상태 메모
- Hero 소개 문구에 플레이스홀더 존재: "내 자기소개 한줄 멘트"
- Projects 이미지 경로 `/exPage/*.png`는 public에 필요하나 저장소에는 없음 (빌드/미리보기 시 추가 필요)
- 자산: `src/assets/HeroSection.png` 포함, 색상 팔레트 기록은 `docs/color.md`에 있음

## 실행
```bash
npm install
npm run dev
```
