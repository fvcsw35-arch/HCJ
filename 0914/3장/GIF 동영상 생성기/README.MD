# 🎬 Video to GIF Converter

> **웹 브라우저에서 동영상 파일을 손쉽게 GIF 애니메이션으로 변환할 수 있는 클라이언트 사이드 웹 애플리케이션입니다.**  
> 별도의 서버 업로드 없이 브라우저 내부에서 빠르고 안전하게 동영상 변환 작업을 처리합니다.

---

## 📌 프로젝트 개요

본 프로젝트는 사용자가 드래그 앤 드롭 또는 파일 선택을 통해 업로드한 동영상 파일(MP4, WebM, MOV 등)을 GIF 애니메이션으로 변환해주는 프론트엔드 도구입니다[cite: 8].

- **보안 및 프라이버시**: 모든 변환 작업이 사용자의 브라우저 내에서 완료되므로 외부 서버로 영상 데이터가 전송될 위험이 없습니다[cite: 8].
- **다중 파일 대응**: 여러 동영상 파일을 한 번에 선택하여 처리할 수 있는 변환 작업 목록 구조를 갖추고 있습니다[cite: 8].
- **반응형 디자인**: 모바일 및 데스크톱 등 다양한 화면 크기에 최적화된 카드형 UI를 제공합니다[cite: 8].

---

## 🛠️ 기술 스택 (Tech Stack)

* **HTML5**: 시맨틱 태그 (`<header>`, `<main>`, `<label>` 등)를 활용한 표준 구조 설계[cite: 8]
* **CSS3**: `style.css`를 통한 외부 스타일 정의, 반응형 카드 UI 및 드롭존 디자인[cite: 8]
* **JavaScript (Vanilla JS)**: DOM 조작, 이벤트 핸들링 및 외부 라이브러리 지연 로딩 처리 (`script.js`)[cite: 8]
* **gif.js (v0.2.0)**: 브라우저 환경에서 동영상 프레임을 추출해 GIF 이미지로 인코딩하는 라이브러리[cite: 8]

---

## ✨ 주요 기능 및 특징

### 1. 드래그 앤 드롭 & 파일 업로드
- 동영상 파일을 지정된 드롭존 (`#dropZone`)에 직접 드래그 앤 드롭하거나, 버튼을 클릭하여 선택 가능[cite: 8].
- **지원 포맷**: MP4, WebM, MOV 등 주요 비디오 확장자 지원[cite: 8].
- **제한 사항**: 최대 29 FPS (Frames Per Second) 제한 적용[cite: 8].

### 2. 변환 작업 목록 (Process Container)
- 다중 파일 선택 (`multiple` 속성)을 지원하며, 변환 중인 작업 목록을 확인할 수 있는 영역 (`#fileList`) 제공[cite: 8].

### 3. 대체 이미지(Fallback) 처리 로고
- [nanalab.kr](https://nanalab.kr) 상단 로고 이미지 링크 제공[cite: 8].
- 로고 이미지 (`logo.png`) 로드 실패 시 `onerror` 핸들러를 통해 대체 렌더링(Placeholder)으로 자동 전환되는 안전 장치 적용[cite: 8].

---

## ⚙️ 외부 라이브러리 및 리소스

| 리소스명 | 종류 | URL / 경로 | 목적 및 설명 |
| :--- | :--- | :--- | :--- |
| **gif.js** | JS Library | `https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js` | 비디오 프레임을 GIF로 변환 (`defer` 로딩)[cite: 8] |
| **style.css** | CSS | `./style.css` | UI 레이아웃 및 스타일 정의[cite: 8] |
| **script.js** | JS | `./script.js` | 파일 처리, GIF 변환, DOM 제어 로직 (`defer` 로딩)[cite: 8] |

---

## 📂 디렉토리 구조

```text
.
├── index_8.html       # 메인 HTML 구조[cite: 8]
├── style.css          # 외부 스타일시트[cite: 8]
├── script.js          # 자바스크립트 스크립트[cite: 8]
└── README.md          # 프로젝트 안내 문서
