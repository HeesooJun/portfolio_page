# Hero Sequence Session Handoff

## 목적

- 다른 툴/세션에서 현재 `Hero -> Projects` 전환 작업을 바로 이어서 진행할 수 있도록 상태를 정리한다.
- 특히 "코드는 바뀌었는데 화면상으로는 빈 화면/2컷처럼 보이는 문제"를 우선 전달한다.

## 현재 결론

- 현재 방향은 `도시 + 고양이 시퀀스 -> 마지막 handoff 컷 -> 공중 프로젝트 패널 -> Projects 섹션` 구조다.
- 이미지 자산은 어느 정도 정리되었지만, 실제 브라우저 체감 결과는 사용자가 원하는 것과 다르다.
- 사용자가 체감한 문제:
  - `6컷이 아니라 2컷처럼 보인다`
  - `중간이 그냥 그라데이션/빈 화면처럼 보인다`
  - `프로젝트가 공중에 떠 있는 느낌이 아니라 어색하다`
- 따라서 다음 세션의 핵심은 "코드가 맞는지"보다 "실제 UI가 어떻게 보이는지"를 직접 확인하면서 조정하는 것이다.

## 현재 코드 상태

수정된 주요 파일:

- [AGENTS.md](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/AGENTS.md)
- [HeroSection.tsx](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/app/section/HeroSection.tsx)
- [hero-section.css](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/styles/hero-section.css)
- [ProjectSection.tsx](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/app/section/ProjectSection.tsx)
- [projects-section.css](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/styles/projects-section.css)

현재 구현 의도:

- `HeroSection` 안에서 6장의 컷을 스크롤 진행률에 따라 교차 전환
- 마지막 구간에서 featured project 패널 1개를 공중에 띄워 보여줌
- 실제 `Projects` 섹션은 그 아래에서 별도 전시 목록처럼 이어짐

## 검증 상태

마지막으로 통과한 명령:

```bash
npm run lint
npm run typecheck
npm run build
```

즉, 현재 문제는 타입/빌드가 아니라 UI/연출 품질 문제다.

## 현재 git 상태 요약

현재 워크트리 기준 변경 사항:

```text
M AGENTS.md
M src/app/section/HeroSection.tsx
M src/app/section/ProjectSection.tsx
D src/assets/HeroSection.png
M src/styles/hero-section.css
M src/styles/projects-section.css
?? src/assets/hero/
```

주의:

- `src/assets/HeroSection.png`는 삭제가 아니라 [HeroSection_legacy.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/archive/HeroSection_legacy.png) 로 이동된 상태다.
- 새 자산은 전부 `src/assets/hero/` 아래로 재구성했다.

## 자산 구조

### 1. 실제 시퀀스 후보

현재 선택된 컷:

- [scene_01_rooftop_opening.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/round_01_selected/scene_01_rooftop_opening.png)
- [scene_02_cat_forward_walk.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/round_01_selected/scene_02_cat_forward_walk.png)
- [scene_03_cat_rooftop_crossing.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/round_01_selected/scene_03_cat_rooftop_crossing.png)
- [scene_04_cat_bridge_path.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/round_01_selected/scene_04_cat_bridge_path.png)
- [scene_05_cat_handoff_view.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/round_01_selected/scene_05_cat_handoff_view.png)
- [scene_06_project_handoff.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/round_01_selected/scene_06_project_handoff.png)

설명:

- `scene_01 ~ scene_03`는 고양이가 도시 안으로 이동하는 컷
- `scene_04`는 길이 열리는 브릿지 컷
- `scene_05`는 잠깐 멈춰 시선을 정리하는 handoff 컷
- `scene_06`는 실제 프로젝트가 나타나도 되는 여백을 가진 마지막 컷

### 2. 캐릭터/무드 기준 이미지

- [cat_character_primary.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/references/cat_character_primary.png)
- [cat_character_secondary.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/references/cat_character_secondary.png)
- [cat_mood_rooftop.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/references/cat_mood_rooftop.png)

설명:

- `cat_character_primary`는 이후 생성에서 메인 캐릭터 기준으로 사용
- `cat_mood_rooftop`는 도시/고양이 공존 무드 참고용

### 3. 패널 후보

- [panel_candidate_glass_frame.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/panel_candidates/panel_candidate_glass_frame.png)
- [panel_candidate_soft_atmosphere.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/review/panel_candidates/panel_candidate_soft_atmosphere.png)

설명:

- 둘 다 직접 자산으로 쓰기보다는 참고용
- 현재 판단은 "패널 이미지를 또 생성하는 것"보다 "패널은 CSS/DOM으로 만들고 배경은 기존 scene_06 위에 얹는 것"이 더 낫다

### 4. 아카이브

- [HeroSection_legacy.png](/C:/Users/SSAFY/Desktop/PR/Portpolio/portfolio_page/src/assets/hero/archive/HeroSection_legacy.png)
- 기타 초반 레이어 실험용 자산들:
  - `hero_sky.png`
  - `hero_city_far.png`
  - `hero_city_front.png`
  - `hero_atmosphere.png`
  - `hero_city_spotlight.png`
  - `mood_crow_scene.png`

설명:

- 초기에는 단일 배경/레이어 파랄랙스를 시도했지만 사용자가 "할루시네이션 같은 화면"이라고 느껴 폐기했다.

## 무엇이 잘 안 됐는가

### 1. 레이어 파랄랙스 방식 실패

- 도시 레이어를 동시에 조금씩 움직이는 방식은 "순차적인 진행"보다 "겹쳐진 배경"처럼 느껴졌다.
- 사용자는 Shopify Editions Winter 2026 같은 "장면이 전개되는" 느낌을 원했다.

### 2. 시퀀스 컷은 생겼지만 체감 전환이 약함

- 코드상으로는 6컷이 돌아가지만, 사용자는 실제로는 2컷처럼 느낀다고 피드백했다.
- 가능한 원인:
  - 컷 간 구도/색감 차이가 작음
  - 전환 오버랩이 커서 중간 컷이 묻힘
  - 실제 브라우저에서 hero 높이 대비 전환 구간이 체감상 짧음

### 3. Hero와 Projects 연결 방식이 여러 번 어긋남

이전 실패 흐름:

- Projects 섹션을 hero 위로 끌어올려 겹치게 만들었음
- 그 결과 사용자는 "그냥 빈 화면/그라데이션"처럼 느꼈음
- 이후 구조를 다시 바꿔:
  - `Hero 내부에서 공중 패널 등장`
  - `Projects는 그 아래 평면 섹션`
    로 나눔

하지만 사용자는 아직도 결과가 맞지 않는다고 느끼고 있다.

### 4. 사용자가 원하는 프로젝트 등장 방식

중요한 사용자 의도:

- "프로젝트 패널이 hero 마지막 컷 위 공중에 떠 있는 느낌"
- "고양이가 옥상에서 그걸 올려다보는 느낌"
- "Projects 섹션 카드가 그냥 기울어져 있는 건 의도와 다름"

즉, 현재 구현에서 가장 중요한 건:

- `scene_06` 자체를 무대로 유지
- 그 위에 작은 수의 floating object/panel만 등장
- Projects 전체 섹션을 바로 덮어 올리지 않기

## 현재 보류 중인 질문

- 정말 6컷 전부 유지할지, 아니면 3~4컷으로 강하게 압축할지
- floating project panel을 hero 안에서 1개만 먼저 보여줄지
- 실제 `Projects` 섹션은 지금처럼 아래 목록으로 둘지, 아니면 hero 내 전시 패널 구조를 확장할지

현재 사용자 발화 기준으로는:

- "6컷이 제대로 보이지 않는다"
- "공중 프로젝트 패널을 기대했는데 그렇지 않다"

따라서 다음 세션에서는 "더 많이 만들기"보다 "더 적고 선명한 구조" 쪽이 유리할 가능성이 높다.

## 다음 세션 우선순위

### 가장 먼저 할 일

1. 실제 실행 화면을 직접 볼 수 있는 툴/환경에서 현재 UI를 확인
2. hero 마지막 구간만 집중해서 다음 세 가지를 검증

- `scene_04`, `scene_05`, `scene_06`가 눈에 띄게 구분되는가
- `scene_06` 위 floating project panel이 실제로 보이는가
- Projects 섹션 진입이 여전히 그라데이션/빈 화면처럼 느껴지는가

### 추천 리셋 전략

만약 UI를 직접 보니 여전히 이상하면, 아래 순서로 단순화 추천:

1. `scene_01 ~ scene_03`를 버리라는 뜻은 아니지만, 우선 `scene_04 ~ scene_06`만 테스트
2. `scene_06` 위에 featured project panel 1개만 공중에 띄우기
3. Projects 섹션은 일단 평면 카드로 되돌리거나 최소화
4. 전환이 읽히는지 먼저 확인한 뒤 다시 확장

### 구현 관점에서 중요한 포인트

- 현재 문제는 기능보다 "읽히는가" 문제다
- CSS만 만지는 것보다 실제 브라우저 화면을 보면서 조정해야 한다
- `IntersectionObserver` 기반 사이드바는 살아 있지만, hero가 매우 길어서 대부분 `#home` 상태일 수 있다
- hero 시퀀스 자체를 별도 디버그 표시 없이 조정 중이므로, UI 도구가 없으면 체감 문제를 잡기 어렵다

## 사용자가 명시한 선호

- 단순 파랄랙스보다 스토리형 진행
- 도시 안에서 고양이가 이동하며 안내하는 구조
- 하수구/문 같은 과한 스토리 장치는 비선호
- 프로젝트는 "공중에 뜨는 전시 패널/액자" 쪽이 더 적합
- 결과가 예쁜 것보다 실제로 "진행되는 것처럼 읽히는지"가 더 중요

## 인계 메모

- 이 세션에서는 코드 수정/에셋 정리/프롬프트 설계는 꽤 진행됐지만, 실제 화면 확인이 안 되어 체감 UX 문제를 끝까지 잡지 못했다.
- 다음 툴에서 이어갈 때는 이 문서를 먼저 읽고, 그 다음 실제 실행 화면을 보면서:
  - hero 마지막 구간
  - floating panel
  - Projects 섹션 첫 등장
    세 지점만 집중해서 손보는 것이 좋다.
