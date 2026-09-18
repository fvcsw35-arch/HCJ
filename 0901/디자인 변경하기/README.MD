# 🎓 Education Satisfaction & Material Request Form (Form Journey)

> **교육 만족도 조사 및 강의 자료 신청을 위한 모던 WebGL 배경 인터랙티브 설문 웹 애플리케이션입니다.**  
> 글래스모피즘(Glassmorphism) UI와 실시간 WebGL 셰이더 배경, 동적 프로그레스 바 및 폼 전환 인터랙션을 제공합니다.

---

## 📌 프로젝트 소개

본 프로젝트는 단일 페이지 웹 애플리케이션(SPA)으로, 교육 수강생의 피드백을 수집하고 자료 신청을 접수받기 위해 개발되었습니다.

- **Glassmorphism UI**: 배경 흐림(blur)과 반투명 카드를 활용한 유기적이고 현대적인 디자인.
- **WebGL Animated Background**: Canvas 위에 구현된 고성능 파스텔 톤 GLSL 셰이더 애니메이션.
- **Responsive Navigation**: 상단 App Bar와 모바일용 하단 Navigation Bar 지원.
- **Interactive Form State**: 폼 제출 시 비동기 반응 및 성공 애니메이션(SVG Checkmark) 전환 효과[cite: 5].

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend & Styling
- **HTML5**: Semantic 구조, SVG 애니메이션 (`<svg>`, `<path>`, `<circle>`)[cite: 5]
- **Tailwind CSS**: CDN 기반 스타일링 (`forms`, `container-queries` 플러그인)[cite: 5]
- **Typography & Icons**: 
  - Google Fonts (`Plus Jakarta Sans`, `Hanken Grotesk`)[cite: 5]
  - Google Material Symbols Outlined[cite: 5]

### Scripting & Graphics
- **JavaScript (Vanilla ES6+)**:
  - WebGL API (Custom GLSL Vertex/Fragment Shader)[cite: 5]
  - DOM Event Handler & Dynamic Progress Logic[cite: 5]

---

## ✨ 주요 기능 및 특징

### 1. WebGL 파스텔 셰이더 배경 (`#bg-canvas`)
- WebGL 캔버스를 통해 화면 전체에 은은한 파스텔 톤(Peach, Mint, Blue, Cream)의 유동적인 마블링 애니메이션을 실시간 렌더링합니다[cite: 5].

### 2. 설문 및 자료 신청 폼 (`#survey-form`)
- **소속 / 성함**: 필수 텍스트 입력[cite: 5]
- **자료받을 이메일**: 필수 이메일 형식 검증[cite: 5]
- **강의 만족도 (5점 라이커트 척도)**: Material Symbol 아이콘과 연동된 커스텀 라디오 버튼 라벨 (아쉬워요, 보통이에요, 최고예요 등)[cite: 5]
- **피드백 / 유익했던 점**: 멀티라인 텍스트 입력 (`textarea`)[cite: 5]
- **다음 교육 희망 주제**: 선택적 텍스트 입력[cite: 5]

### 3. 인터랙션 & 상태 변화
- **상태 프로그레스 바**: 입력값 변경에 맞춰 그래디언트 바의 길이가 동적으로 변화합니다[cite: 5].
- **제출 및 비동기 처리**: 제출 버튼 클릭 시 로딩 애니메이션 실행 후, 메인 카드 폼이 전환되어 체크마크 SVG 애니메이션이 포함된 완료 화면으로 전환됩니다[cite: 5].
- **폼 리셋**: '새로운 설문 작성' 버튼을 통해 폼 상태 초기화 및 화면 복구가 가능합니다[cite: 5].

---

## 📂 파일 구조

```text
.
├── index_5.html        # 메인 웹 페이지 (HTML/Tailwind/WebGL/JS 통합)[cite: 5]
└── README.md           # 프로젝트 안내 문서
