# Heesoo Jun Portfolio

프런트엔드 개발자 전희수의 포트폴리오입니다. SSAFY 14기에서 학습한 내용과 동아리/사이드 프로젝트 경험을 정리해, 한 눈에 읽을 수 있는 단일 페이지 형태로 구성했습니다. 참고 UI 무드(./exPage)를 기반으로 화이트 톤과 포인트 컬러를 활용했습니다.

## ✨ 주요 영역
- **Header**: Projects / About / Tech 내비와 Notion, Blog, GitHub 외부 링크
- **Hero**: 자기소개, 핵심 역량, 이메일·Notion·GitHub 연결
- **Projects**: 참고 스크린샷을 활용한 갤러리형 프로젝트 카드
- **About**: 일하는 방식과 강점을 요약한 3개의 원칙 카드
- **Tech**: Front-End / Back-End & Data / Collaboration & Tools 분류
- **Footer**: 연락 수단과 외부 링크, 저작권 문구

각 섹션의 카피는 `/src/app/section` 디렉터리에서 바로 수정할 수 있습니다.

## 🛠️ 사용 기술
- Next.js 15 (App Router)
- React 19 + TypeScript 5
- Tailwind CSS 4
- next/font (Google Inter)

## 📂 프로젝트 구조
```
├─ public/
│  └─ exPage/        # 참고용 스크린샷 자산
├─ src/
│  └─ app/
│     ├─ layout.tsx  # 전역 폰트 및 배경
│     ├─ page.tsx    # 섹션 조합
│     └─ section/    # Hero, Projects, About, Tech, Footer 컴포넌트
├─ prd.md            # 기획 초안
└─ to_do.md          # TODO 및 진행 현황
```

## 🚀 실행 방법
```bash
npm install
npm run dev
```

기본 포트는 `http://localhost:3000`입니다. 코드 정적 분석은 `npm run lint`로 실행할 수 있습니다.

## 📌 다음 작업 메모
- Vercel 자동 배포 구성
- 콘텐츠 업데이트 가이드 작성
- 다국어/접근성 (Lighthouse) 점검
- 실제 프로젝트별 상세 성과/지표 보강

## 📤 배포 팁
Vercel과 연결할 때는 배포 대상 브랜치를 지정하면 자동으로 빌드됩니다. 샘플 이미지는 `public/exPage`에 있으니 실제 화면으로 교체하고 싶다면 동일 경로에 덮어쓰면 됩니다.
