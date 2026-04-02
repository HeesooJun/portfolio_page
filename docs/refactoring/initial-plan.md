# 리팩토링 초안

이 문서는 현재 포트폴리오 페이지의 리팩토링 결과와 남은 후속 작업을 빠르게 확인하기 위한 메모입니다.

## 이번 단계에서 완료한 항목

- Next.js 기반 단일 페이지를 Vite + React 구조로 전환했습니다.
- 패키지 매니저는 `npm`을 유지했습니다.
- `package-lock.json`을 새 의존성 기준으로 갱신했습니다.
- `ESLint`, `Prettier`, `Husky`, `lint-staged`를 연결했습니다.
- `prettier-plugin-tailwindcss`를 연결해 Tailwind 유틸리티 클래스 순서를 자동 정리합니다.
- 기본 검증 명령을 `npm run lint`, `npm run typecheck`, `npm run build`, `npm run verify` 기준으로 정리했습니다.

## 현재 개발 환경 방향

- 개발 서버는 `vite`를 사용합니다.
- 빌드는 `tsc --noEmit && vite build` 조합으로 검증합니다.
- Tailwind CSS 4는 `@tailwindcss/vite` 플러그인으로 연결합니다.
- `@` alias는 `src`를 가리키도록 유지합니다.

## 현재 QC 구성

- `ESLint`: React 훅 규칙과 Vite HMR 관련 규칙 포함
- `Prettier`: 저장소 전반 포맷 정리
- `prettier-plugin-tailwindcss`: Tailwind 유틸리티 클래스 자동 정렬
- `Husky`: `pre-commit` 훅 진입점
- `lint-staged`: staged 파일만 골라서 `eslint --fix`, `prettier --write` 실행
- `TypeScript typecheck`: `tsc --noEmit`

## 이번 단계에서 확인한 사항

- `npm run lint` 통과
- `npm run typecheck` 통과
- `npm run build` 통과
- 현재 빌드 결과에서 가장 무거운 자산은 `HeroSection.png`입니다.

## 남은 후속 작업

### 1. 이미지 최적화

- 첫 화면 Hero 배경 이미지 용량을 줄입니다.
- 필요하면 WebP/AVIF나 해상도 분리 전략을 검토합니다.

### 2. 콘텐츠 정리

- 자기소개 문구와 프로젝트 설명을 실제 포트폴리오 방향에 맞게 다시 다듬습니다.
- 섹션별 우선순위를 다시 정리해 정보 전달 순서를 더 선명하게 맞춥니다.

### 3. 애니메이션 설계

- 현재 단계에서는 보류합니다.
- 이후 시작할 때도 핵심 섹션 2~3개만 우선 적용합니다.

## 작업 원칙

### 코드 주석

- 새로 추가하거나 구조를 바꾸는 코드에는 한글 주석을 충분히 남깁니다.
- 주석은 왜 이렇게 구성했는지, 어떤 제약 때문에 분리했는지까지 드러나게 작성합니다.
- 단순 대입이나 JSX 구조를 그대로 읽어주는 주석은 피하고, 유지보수에 필요한 설명을 우선합니다.

### 커밋 단위

- 변경 범위가 커지면 중간 커밋으로 나눕니다.
- 커밋 메시지는 `feat: ...`, `refactor: ...`, `chore: ...`, `docs: ...` 형식을 우선 사용합니다.
- 한 커밋에는 하나의 목적만 담기도록 유지합니다.

### 검증 원칙

- 작업 도중 의미 있는 단위가 끝날 때마다 검증 명령을 실행합니다.
- QC 설정 변경 후에는 최소 한 번 이상 `lint`, `typecheck`, `build`를 확인합니다.
- 훅에 너무 많은 검사를 몰아 넣지 않고, 무거운 검사는 필요하면 별도 단계로 둡니다.
