# 🌊 釜山 案内 (BUSAN GUIDE)

> **일본인 관광객 및 일본어 사용자를 위한 부산 여행·관광 웹 가이드 서비스입니다.**  
> React와 TypeScript를 기반으로 구축되었으며, 세련된 웹 폰트 스타일과 SPA(Single Page Application) 구조를 통해 쾌적한 부산 관광 정보를 제공합니다.

---

## 📌 프로젝트 소개

본 프로젝트는 한국 부산의 다양한 매력과 관광지 정보를 일본어로 제공하는 글로벌 웹 가이드 서비스입니다.  
React와 Vite 환경을 활용하여 빠른 로딩 속도를 구현하였으며, Google Fonts의 일본어 특화 폰트(Shippori Mincho, M PLUS Rounded 1c) 및 영문 세리프 폰트를 적용하여 시각적으로 완성도 높은 디자인을 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

### Development & Framework
- **Core:** React 18+[cite: 3]
- **Language:** TypeScript (`/src/main.tsx`)[cite: 3]
- **Build Tool:** Vite[cite: 3]
- **Language/i18n Target:** 일본어 (Japanese, `ja`)[cite: 3]

### UI & Styling
- **HTML5 / CSS3**[cite: 3]
- **Typography (Google Fonts):**
  - `Shippori Mincho`: 전통적이고 명조 특유의 정갈한 느낌을 주는 일본어 폰트[cite: 3]
  - `M PLUS Rounded 1c`: 가독성 높고 친근한 둥근 고딕 느낌의 일본어 폰트[cite: 3]
  - `Instrument Serif`: 세련된 타이포그래피 표현을 위한 영문 세리프 폰트[cite: 3]

---

## ✨ 주요 특징 및 요소

1. **일본어 맞춤형 Web UI/UX**
   - HTML `lang="ja"` 속성을 지정하여 일본어 검색 엔진 최적화 및 브라우저 렌더링 최적화[cite: 3]
   - 프리넥트(`preconnect`)를 적용한 Google Fonts 사전 로딩 기법으로 폰트 플리커링 현상 방지 및 웹 성능 최적화[cite: 3]

2. **React + TypeScript 기반의 모던 웹**
   - Single Page Application(SPA) 방식을 채택하여 진입점 파일(`src/main.tsx`)을 통한 유연한 컴포넌트 확장 가능[cite: 3]
   - 타입 안정성을 갖춘 TypeScript로 반응형 가이드 인터페이스 구축[cite: 3]

---

## 📂 프로젝트 구조 (Directory Structure)

```text
.
├── public/
│   └── favicon.svg       # 웹 사이트 파비콘[cite: 3]
├── src/
│   ├── main.tsx          # React 애플리케이션 진입점 (Entry Point)[cite: 3]
│   └── ...               # 컴포넌트 및 페이지 관련 소스 파일
├── index_3.html          # 메인 HTML 템플릿[cite: 3]
└── README.md             # 프로젝트 안내 문서
