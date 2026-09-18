# 🏛️ GYEONGJU MT 2박 3일 (Team Retreat Guide)

> **부산 출발 2박 3일 경주 MT/팀 리트릿을 위한 올인원 인터랙티브 웹 가이드입니다.**  
> 경주의 밤풍경을 모티브로 한 풀스크린 히어로 디자인과 일정표, 체크리스트, 예산 계획 및 불꽃 파티클 인터랙션을 제공합니다.

---

## 📌 프로젝트 소개

본 프로젝트는 동아리, 팀, 또는 단체가 부산에서 출발하여 경주에서 진행하는 2박 3일 MT 일정을 효율적으로 안내하고 준비할 수 있도록 제작된 단일 페이지 웹 애플리케이션(SPA)입니다.

경주의 대표 상징물인 **첨성대와 왕릉 능선, 밤하늘**을 모션 그래픽 스타일의 HTML5/CSS3/JS로 시각화하였으며, 모바일과 PC 환경에 최적화된 반응형 UI 및 인터랙티브 요소를 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend & Styling
- **HTML5**: semantic 구조화, SVG 애니메이션 (`<svg>`, `<animate>`)[cite: 4]
- **CSS3**: Modern CSS (Flexbox, CSS Grid, Clamp, CSS Variables, Glassmorphism, Keyframe Animations)[cite: 4]
- **JavaScript (Vanilla ES6+)**: 
  - Canvas API (스프라이트 캐싱 기반 클릭 파티클 효과)[cite: 4]
  - Intersection Observer API (스크롤에 따른 카드 등장 효과)[cite: 4]
  - Smooth Scrolling & Parallax Effect (rAF 스로틀링 적용)[cite: 4]
- **Typography**: Google Fonts (Noto Sans KR)[cite: 4]

---

## ✨ 주요 기능 및 특징

1. **풀스크린 히어로 애니메이션 (Gyeongju Night)**
   - SVG 기반 **첨성대 실루엣** 및 반짝이는 **별/보름달/반딧불이/모닥불** CSS 애니메이션[cite: 4]
   - 마우스 이동에 반응하는 패럴랙스(Parallax) 인터랙션[cite: 4]
   - 주요 키워드가 지속적으로 흐르는 티커(Ticker) 애니메이션[cite: 4]

2. **2박 3일 세부 일정 안내 (Day 1 ~ Day 3)**
   - **DAY 1**: 부산 출발 → 황리단길 → 대릉원/첨성대 → 마트 장보기 → 바비큐 파티 → 레크리에이션 1부[cite: 4]
   - **DAY 2**: 보문호수 액티비티 → 쌈밥거리 점심 → 사진 미션 러닝맨 → 조별 요리대회 → 메인 레크리에이션 & 불멍[cite: 4]
   - **DAY 3**: 펜션 대청소 → 해장 점심 → MVP 시상식 → 부산 복귀[cite: 4]

3. **실용적인 MT 정보 제공**
   - **STAY (숙박 가이드)**: 보문단지/천북면 단체 펜션 예약 팁 및 체크리스트[cite: 4]
   - **BUDGET (예산)**: 20인 기준 인당 예상 경비 정리 (교통, 숙박, 식비, 액티비티 포함 약 11만원)[cite: 4]
   - **CHECKLIST**: 인터랙티브 체크박스를 통한 개인/단체 준비물 점검 기능[cite: 4]
   - **PLAN B (대안 코스)**: 남해/사천(바다 감성), 밀양(계곡 물놀이) 대안 코스 제시[cite: 4]

4. **인터랙티브 파티클 캔버스**
   - 화면을 클릭/터치할 때 불꽃 링 및 MT 관련 이모지(`🔥`, `✨`, `🏕️`, `🍖`, `⭐`, `🎉`)가 튀어나오는 Canvas 렌더링 효과[cite: 4]

---

## 📂 파일 구조

```text
.
├── index_4.html        # MT 안내 페이지 메인 소스코드 (HTML/CSS/JS)[cite: 4]
└── README.md           # 프로젝트 문서
