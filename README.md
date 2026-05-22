# Heesoo Jun Portfolio

Vite + React + TypeScript 기반 포트폴리오 웹사이트입니다.

## 기술 스택

- Vite 8 + React 19 + TypeScript 6
- Tailwind CSS 4 + `prettier-plugin-tailwindcss`
- ESLint 9 + Prettier + Husky + lint-staged

## 실행

```bash
npm install
npm run dev
```

## 품질 검사

```bash
npm run lint
npm run typecheck
npm run build
```

한 번에 확인할 때는 아래 명령을 사용합니다.

```bash
npm run verify
```

`verify`는 `lint + typecheck + build`를 순서대로 수행합니다.

## 커밋 전 자동 검사

- `pre-commit`에서 `lint-staged`가 실행됩니다.
- staged 된 파일에만 `prettier --write`와 `eslint --fix`가 적용됩니다.
- Tailwind 유틸리티 클래스는 `prettier-plugin-tailwindcss`가 자동 정렬합니다.
- 무거운 검사는 훅에 넣지 않고 수동 검증 명령으로 분리합니다.

## Vercel 배포

```bash
npx vercel deploy -y
```
