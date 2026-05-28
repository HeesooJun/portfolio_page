import heygentMainSceneImage from '@/assets/main/heygent-main2-poster.webp'
import heygentMainSceneVideo from '@/assets/main/heygent-main2.webm'
import lifesaviorHomeImage from '@/assets/main/lifesavior-main-poster.webp'
import lifesaviorHomeVideo from '@/assets/main/lifesavior-main.webm'
import piviewHomeImage from '@/assets/main/piview-main.png'
import piviewHomeVideo from '@/assets/main/piview-main2.webm'
import heygentProjectMainImage from '@/assets/project-main/heygent.png'
import lifesaviorProjectMainImage from '@/assets/project-main/lifesavior.png'
import piviewProjectMainImage from '@/assets/project-main/piview.png'
import heygentLogoImage from '@/assets/logo/heygent.png'
import lifesaviorLogoImage from '@/assets/logo/lifesavior-charcoal.png'
import piviewBrownLogoImage from '@/assets/logo/piview-brown.png'
import heygentDashboardImage from '@/assets/project-evidence/heygent/dashboard.gif'
import heygentLocalBridgeImage from '@/assets/project-evidence/heygent/local-bridge.gif'
import heygentOfficeImage from '@/assets/project-evidence/heygent/office-visualization.png'
import heygentWorkboardImage from '@/assets/project-evidence/heygent/work-board.png'
import heygentWorkboardInputImage from '@/assets/project-evidence/heygent/workboard-input.gif'
import lifesaviorBrandImage from '@/assets/project-evidence/lifesavior/brand-mockup.png'
import lifesaviorInterfaceImage from '@/assets/project-evidence/lifesavior/ui-mockup.png'
import lifesaviorEvidenceLogoImage from '@/assets/project-evidence/lifesavior/ptt-logo.png'
import piviewAnalysisImage from '@/assets/project-evidence/piview/ai-analysis.gif'
import piviewOcrImage from '@/assets/project-evidence/piview/ocr.gif'
import piviewProductAiImage from '@/assets/project-evidence/piview/product-ai.gif'
import piviewSkinAnalysisImage from '@/assets/project-evidence/piview/ai-skin-analysis.png'
import piviewCompareImage from '@/assets/project-evidence/piview/product-compare.png'

import type { PortfolioProject } from './project-types'

export const AUTOPLAY_SECONDS = 12

// 프로젝트 설명 블록은 안정적으로 유지하고, 메인/목록 노출 순서만 여기서 조정합니다.
const PROJECT_DISPLAY_ORDER: Record<string, number> = {
  lifesavior: 0,
  piview: 1,
  heygent: 2,
}

const PROJECT_ENTRIES: PortfolioProject[] = [
  {
    slug: 'heygent',
    title: 'HeyGent',
    subtitle: '멀티 디바이스 AI 오케스트레이션',
    mobileDescription:
      '사용자의 요청을 AI가 작업으로 나누고, 웹 화면, 모바일 앱, 갤럭시 워치, IoT 디스플레이, 로컬 브릿지까지 연결하는 멀티 디바이스 AI 작업 실행 플랫폼입니다.',
    year: '2026',
    type: 'AI Orchestration / Web / Mobile / IoT',
    date: '2026.04 - 2026.05',
    role: 'AI Lead / Orchestration / FE Integration / Docs',
    tools: 'Spring Boot, FastAPI, React, Android, MQTT',
    homeImage: heygentMainSceneImage,
    homeMobileImage: heygentMainSceneImage,
    homeVideo: heygentMainSceneVideo,
    homeMobileVideo: heygentMainSceneVideo,
    heroImage: heygentProjectMainImage,
    heroVideo: heygentMainSceneVideo,
    detailLogoImage: heygentLogoImage,
    homePosition: 'center center',
    homeMobilePosition: '57% center',
    heroPosition: 'center center',
    evidence: [
      {
        src: heygentOfficeImage,
        alt: 'HeyGent 오피스 공간 시각화 화면',
        caption: 'Connected office visualization',
        kind: 'wide',
      },
      {
        src: heygentDashboardImage,
        alt: 'HeyGent 대시보드 실행 화면',
        caption: 'Live task dashboard',
        kind: 'pair',
      },
      {
        src: heygentWorkboardImage,
        alt: 'HeyGent 작업 보드 화면',
        caption: 'Agent work board',
        kind: 'pair',
      },
      {
        src: heygentLocalBridgeImage,
        alt: 'HeyGent 로컬 브리지 실행 장면',
        caption: 'Local bridge flow',
        kind: 'pair',
      },
      {
        src: heygentWorkboardInputImage,
        alt: 'HeyGent 작업 보드 입력 장면',
        caption: 'Workboard input loop',
        kind: 'wide',
      },
    ],
    repository: 'github.com/HeesooJun/S-Free',
    summary:
      '사용자의 요청을 여러 작업 단위로 나누고, 웹과 모바일 화면에 실행 상태를 실시간으로 되돌려 주는 AI 작업 실행 플랫폼입니다.',
    contribution:
      'TaskRun과 StepRun 실행 모델을 설계하고, WebSocket 이벤트 흐름과 에이전트 작업 보드의 상태 표현을 연결했습니다.',
    meta: [
      { label: 'Platform', value: 'Web · Mobile · IoT' },
      { label: 'Focus', value: 'Task orchestration' },
      { label: 'Stack', value: 'Spring Boot · FastAPI · React' },
    ],
    caseStudy: [
      {
        title: '작업을 대화가 아니라 실행 단위로 바꾸기',
        text: '단순 채팅 응답 대신 요청, 단계, 이벤트를 분리해 사용자가 지금 어떤 일이 처리되는지 따라갈 수 있게 정리했습니다.',
      },
      {
        title: '여러 화면에 같은 진행 상태를 전달하기',
        text: '웹, 모바일, IoT 디스플레이가 같은 작업 맥락을 공유하도록 이벤트와 상태 명명을 맞추고 실시간 반영 흐름을 구성했습니다.',
      },
      {
        title: 'AI 도구 호출을 제품 화면에 맞게 번역하기',
        text: '터미널, 파일, 브라우저, 외부 서비스 실행 결과를 사용자가 읽을 수 있는 로그와 카드 형태로 정리했습니다.',
      },
    ],
  },
  {
    slug: 'piview',
    title: 'PiView',
    subtitle: '스킨케어 큐레이션과 추천 검색',
    mobileDescription:
      '피부 타입 분석부터 화장품 추천, 루틴 관리까지 이어지는 스마트 뷰티 플랫폼입니다.',
    year: '2026',
    type: 'Big Data / Recommendation / AI Chatbot',
    date: '2026.02 - 2026.03',
    role: 'AI / Backend Integration',
    tools: 'Spring Boot, Next.js, FastAPI, ChromaDB',
    homeImage: piviewHomeImage,
    homeMobileImage: piviewHomeImage,
    homeVideo: piviewHomeVideo,
    homeMobileVideo: piviewHomeVideo,
    heroImage: piviewProjectMainImage,
    heroVideo: piviewHomeVideo,
    detailLogoImage: piviewBrownLogoImage,
    homePosition: 'center center',
    homeMobilePosition: '27% center',
    heroPosition: 'center center',
    evidence: [
      {
        src: piviewAnalysisImage,
        alt: 'PiView AI 분석 흐름',
        caption: 'AI skin analysis flow',
        kind: 'phone',
      },
      {
        src: piviewSkinAnalysisImage,
        alt: 'PiView 피부 분석 결과 화면',
        caption: 'Skin result screen',
        kind: 'phone',
      },
      {
        src: piviewCompareImage,
        alt: 'PiView 상품 비교 화면',
        caption: 'Product comparison',
        kind: 'phone',
      },
      {
        src: piviewOcrImage,
        alt: 'PiView OCR 분석 흐름',
        caption: 'OCR routine capture',
        kind: 'phone',
      },
      {
        src: piviewProductAiImage,
        alt: 'PiView 상품 AI 분석 흐름',
        caption: 'Product AI explanation',
        kind: 'phone',
      },
    ],
    repository: 'github.com/HeesooJun/S-bigdata',
    summary:
      '피부 상태와 설문 응답을 바탕으로 제품을 분석하고, 검색과 추천, 루틴 관리를 하나의 흐름으로 묶은 스킨케어 플랫폼입니다.',
    contribution:
      '피부 분석, 추천 검색, RAG 챗봇, 상품 비교 로직을 연결해 사용자가 왜 이 제품을 봐야 하는지 설명되는 흐름을 만들었습니다.',
    meta: [
      { label: 'Platform', value: 'Web' },
      { label: 'Focus', value: 'Recommendation flow' },
      { label: 'Stack', value: 'Spring Boot · Next.js · AI' },
    ],
    caseStudy: [
      {
        title: '피부 상태를 추천 기준으로 정리하기',
        text: '피부 타입, 고민, 성분 정보를 단순 필터가 아니라 추천 점수와 설명의 기준으로 사용할 수 있게 구조화했습니다.',
      },
      {
        title: '검색 결과에 이유를 붙이기',
        text: '상품명 검색, 벡터 검색, 정확 검색을 함께 사용해 결과가 나오고, 챗봇이 그 이유를 설명하는 흐름을 설계했습니다.',
      },
      {
        title: '루틴 관리까지 이어지는 화면 흐름',
        text: '추천에서 끝나는 화면이 아니라 저장, 비교, 루틴 편집으로 이어지도록 주요 사용자 행동을 한 방향으로 묶었습니다.',
      },
    ],
  },
  {
    slug: 'lifesavior',
    title: 'Lifesavior',
    subtitle: '오프라인 구조 지원 서비스',
    mobileDescription:
      '재난 상황에서 인터넷과 기지국이 끊겨도 BLE로 연결된 주변 단말을 거쳐 구조 신호를 전달하는 오프라인 구조 지원 앱입니다.',
    year: '2026',
    type: 'Android / Offline Rescue / BLE Mesh',
    date: '2026.02 - 2026.05',
    role: 'Mobile rescue flow / Offline communication',
    tools: 'Kotlin, Jetpack Compose, BLE, UWB',
    homeImage: lifesaviorHomeImage,
    homeMobileImage: lifesaviorHomeImage,
    homeVideo: lifesaviorHomeVideo,
    homeMobileVideo: lifesaviorHomeVideo,
    heroImage: lifesaviorProjectMainImage,
    heroVideo: lifesaviorHomeVideo,
    detailLogoImage: lifesaviorLogoImage,
    homePosition: 'center center',
    homeMobilePosition: '28% center',
    heroPosition: 'center center',
    evidence: [
      {
        src: lifesaviorBrandImage,
        alt: 'Lifesavior 브랜드 목업',
        caption: 'Rescue brand system',
        kind: 'wide',
      },
      {
        src: lifesaviorInterfaceImage,
        alt: 'Lifesavior 구조자와 피구조자 앱 화면',
        caption: 'Responder interface',
        kind: 'pair',
      },
      {
        src: lifesaviorEvidenceLogoImage,
        alt: 'Lifesavior PTT 로고 화면',
        caption: 'Emergency identity',
        kind: 'pair',
      },
    ],
    repository: 'github.com/HeesooJun/S-mobile',
    summary:
      '인터넷이 끊긴 재난 상황에서도 BLE 기반 주변 단말을 거쳐 구조 신호를 전달하고 구조자가 우선순위를 판단하도록 돕는 앱입니다.',
    contribution:
      '피구조자와 구조자 앱 흐름을 분리하고, SOS 전송, 주변 탐색, 거리 추정, 긴급 모드 화면을 실제 현장 사용 기준으로 정리했습니다.',
    meta: [
      { label: 'Platform', value: 'Android' },
      { label: 'Focus', value: 'Offline emergency UX' },
      { label: 'Stack', value: 'Kotlin · Compose · BLE' },
    ],
    caseStudy: [
      {
        title: '연결이 없는 상황을 기본값으로 두기',
        text: '긴급 화면은 네트워크가 없다는 전제를 먼저 두고, 구조 신호와 상태 피드백이 끊기지 않도록 구성했습니다.',
      },
      {
        title: '구조자와 피구조자의 화면을 분리하기',
        text: '피구조자는 SOS와 상태 전달에 집중하고, 구조자는 주변 사람 목록과 거리, 위험도를 빠르게 판단하도록 화면을 나눴습니다.',
      },
      {
        title: '신뢰 가능한 패킷 흐름 만들기',
        text: 'TTL, 중복 제거, 재전송, 서명 검증을 고려해 오프라인 구간에서도 구조 신호가 안전하게 이어지도록 설계했습니다.',
      },
    ],
  },
]

export const PROJECTS: PortfolioProject[] = PROJECT_ENTRIES.sort(
  (currentProject, nextProject) =>
    (PROJECT_DISPLAY_ORDER[currentProject.slug] ?? Number.MAX_SAFE_INTEGER) -
    (PROJECT_DISPLAY_ORDER[nextProject.slug] ?? Number.MAX_SAFE_INTEGER),
)

export const HOME_PRELOAD_SOURCES = Array.from(
  new Set(
    PROJECTS.flatMap((project) => [
      project.homeImage,
      project.homeMobileImage,
      project.homeVideo,
      project.homeMobileVideo,
    ]).filter((source): source is string => Boolean(source)),
  ),
)
