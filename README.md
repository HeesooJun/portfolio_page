# Heesoo Jun Portfolio

프론트엔드 개발자 전희수의 포트폴리오입니다. 

## ✨ 주요 영역
- **Header**: Projects / About / Tech 내비와 Notion, Blog, GitHub 외부 링크
- **Hero**: 자기소개, 핵심 역량, 이메일·Notion·GitHub 연결
- **Projects**: 참고 스크린샷을 활용한 갤러리형 프로젝트 카드
- **About**: 일하는 방식과 강점을 요약한 3개의 원칙 카드
- **Tech**: Front-End / Back-End & Data / Collaboration & Tools 분류
- **Footer**: 연락 수단과 외부 링크, 저작권 문구

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

## 📌 다음 작업 메모
- Vercel 자동 배포 구성

