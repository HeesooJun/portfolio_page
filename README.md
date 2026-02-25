# Heesoo Jun Portfolio

Next.js 15(App Router) 기반 포트폴리오 웹사이트입니다.

## 기술 스택

- Next.js 15 + React 19 + TypeScript 5
- Tailwind CSS 4
- next/font (Google Inter)

## 실행

```bash
npm install
npm run dev
```

## 배포 전 검증

```bash
npm run verify
```

`verify`는 `lint + typecheck + build`를 순서대로 수행합니다.

## Vercel 배포

```bash
npx vercel deploy -y
```

도메인이 있는 경우 `NEXT_PUBLIC_SITE_URL` 환경변수를 설정하면 메타데이터 canonical/Open Graph URL에 반영됩니다.
