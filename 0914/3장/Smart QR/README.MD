# ⚡ Smart QR - Ultimate Studio

> **입력한 URL을 감성적이고 정교한 QR 코드로 즉시 변환해 주는 클라이언트 사이드 웹 애플리케이션입니다.**  
> 마우스 추적 네온 오라, 다이내믹 그래디언트 구체, 글래스모피즘(Glassmorphism) 카드 디자인을 적용하여 인터랙티브한 사용자 경험을 제공합니다.

---

## 📌 프로젝트 개요

본 프로젝트는 사용자가 입력한 웹사이트 URL을 실시간 QR 코드로 생성하고, 클릭 한 번으로 JPG 이미지 저장이 가능하도록 구현된 웹 도구입니다[cite: 10].

- **즉시 생성 (Instant Generator)**: URL 입력 후 생성 버튼 클릭 시 브라우저 내에서 즉각적인 QR 코드 생성[cite: 10].
- **원클릭 다운로드**: 생성된 QR 코드를 클릭하면 바로 JPG 이미지로 내려받을 수 있는 사용자 편의 기능[cite: 10].
- **모던 비주얼 디자인**: 마우스 추적 커서 glow 및 글래스모피즘 기반의 감성적인 UI/UX 제공[cite: 10].

---

## 🛠️ 기술 스택 (Tech Stack)

* **HTML5**: 시맨틱 태그 구조 및 네이티브 폼 컨트롤 활용[cite: 10]
* **CSS3**: `style.css` 연동, 글래스모피즘, 배경 애니메이션(Orbs), 마우스 추적 커서 효과 (`.cursor-glow`)[cite: 10]
* **JavaScript (Vanilla JS)**: `script.js` 기반의 DOM 제어, 이벤트 처리 및 다운로드 로직[cite: 10]
* **QRCode.js (v1.0.0)**: CDN 방식의 클라이언트 사이드 QR 코드 생성 외부 라이브러리[cite: 10]

---

## ✨ 주요 기능 및 UI 구성

### 1. 비주얼 애니메이션 & 레이아웃
- **마우스 추적 네온 오라**: 커서 동선을 따라다니는 빛 효과 (`#cursorGlow`)[cite: 10].
- **다이내믹 그래디언트 구체**: 배경에서 유기적으로 움직이는 3가지 그래디언트 보컬 볼 (`.orb-primary`, `.orb-secondary`, `.orb-accent`)[cite: 10].
- **상단 브랜딩 헤더**: 로고 이미지(`logo.png`) 및 서비스 타이틀 노출[cite: 10].

### 2. URL 입력 및 QR 생성 폼
- **URL 입력 폼 (`#urlInput`)**: 자동 완성 끄기(`autocomplete="off"`) 및 필수 입력(`required`) 속성 적용[cite: 10].
- **생성 버튼 (`#generateBtn`)**: 글로우 효과와 SVG 화살표 아이콘이 결합된 인라인 제출 버튼[cite: 10].

### 3. QR 코드 출력 및 저장
- **QR 코드 출력 영역 (`#qrcode`)**: 입력된 URL을 바탕으로 라이브러리가 QR 코드를 렌더링[cite: 10].
- **JPG 이미지 다운로드**: 생성된 QR 코드를 클릭하면 JPG 형태로 자동 내려받기 기능 수행[cite: 10].

---

## ⚙️ 외부 라이브러리 및 리소스

| 리소스명 | 종류 | URL / 경로 | 용도 |
| :--- | :--- | :--- | :--- |
| **QRCode.js** | JS Library | `https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js` | QR 코드 인코딩 및 렌더링[cite: 10] |
| **style.css** | CSS | `./style.css` | UI 디자인, 글래스모피즘, 애니메이션[cite: 10] |
| **script.js** | JS | `./script.js` | 이벤트 핸들링 및 QR 코드 생성/다운로드 로직[cite: 10] |
| **logo.png** | Image | `./logo.png` | 상단 브랜드 로고[cite: 10] |

---

## 📂 디렉토리 구조

```text
.
├── index_10.html      # 메인 HTML 구조[cite: 10]
├── style.css          # 스타일시트[cite: 10]
├── script.js          # 자바스크립트 로직[cite: 10]
├── logo.png           # 서비스 로고 이미지[cite: 10]
└── README.md          # 프로젝트 안내 문서
