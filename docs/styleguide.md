# 스타일 가이드

## 명명 규칙
- 컴포넌트 파일/컴포넌트 이름은 PascalCase로 통일합니다. 예) `Header.tsx`, `HeroSection`.
- CSS 클래스는 snake_case를 기본으로 하고, 재사용 하위 파트가 많을 때는 BEM 형태의 `block__element--modifier`를 씁니다. 예) `hero_section__title`, `projects_section__details_tags`.
- CSS Modules를 쓸 경우 `styles.class_name` 점 표기로 접근합니다.
- 약어/축약은 지양하고 의미가 드러나는 단어를 사용하며, 동일 개념에는 동일 용어를 일관되게 사용합니다. 예) `description` 사용, `desc` 지양.
