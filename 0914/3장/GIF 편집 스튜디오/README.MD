# ✨ Smart GIF Studio

> **GIF 이미지의 편집, 크기 조절, 자르기, 속도 변경, 용량 최적화를 한 곳에서 처리할 수 있는 웹 기반 GIF 전문 에디터입니다.**  
> FontAwesome 아이콘과 Google Fonts(Poppins, Noto Sans KR)를 적용한 세련되고 직관적인 UI/UX를 제공합니다.

---

## 📌 프로젝트 개요

본 프로젝트는 사용자가 업로드한 GIF 애니메이션의 상태(용량, 해상도, 프레임, FPS)를 실시간으로 확인하고, 다양한 서브 도구를 활용하여 원하는 형태로 편집 후 결과물을 손쉽게 다운로드할 수 있는 웹 애플리케이션입니다[cite: 9].

- **직관적인 에디터 워크스페이스**: GIF 프리뷰 및 메타 정보 배지와 편집 옵션 패널을 2열 레이아웃으로 배치[cite: 9].
- **4가지 주요 GIF 편집 도구**: 크기 조절, 자르기, 속도 조절, 용량 최적화 기능 제공[cite: 9].
- **드래그 앤 드롭 업로드**: 파일 선택 버튼뿐만 아니라 드롭존을 통한 편리한 GIF 파일 업로드 지원[cite: 9].

---

## 🛠️ 기술 스택 (Tech Stack)

* **HTML5**: 시맨틱 태그 구조 및 유연한 폼 컨트롤 구성[cite: 9]
* **CSS3**: `style.css` 외부 스타일시트 연동, 반응형 그리드 및 그래디언트 디자인[cite: 9]
* **JavaScript (Vanilla JS)**: `script.js` 기반의 DOM 제어, 패널 뷰 전환 및 파일 이벤트 핸들링[cite: 9]
* **Fonts & Icons**: 
  * FontAwesome v6.4.0 (웹 아이콘)[cite: 9]
  * Google Fonts (Poppins & Noto Sans KR)[cite: 9]

---

## ✨ 주요 기능 및 UI 구성

### 1. 업로드 영역 (Upload Section)
- 드래그 앤 드롭 드롭존 (`#drop-zone`) 지원[cite: 9].
- 파일 선택 버튼 (`#btn-choose`) 및 GIF 전용 파일 인풋 (`accept="image/gif"`)[cite: 9].

### 2. 프리뷰 및 정보 배지 (Preview & Info Badges)
- GIF 실시간 미리보기 이미지 (`#gif-preview`)[cite: 9].
- 파일 상태를 한눈에 파악할 수 있는 4가지 메타 정보 배지 제공[cite: 9]:
  - **용량**: `#info-size` (예: 0 MB)[cite: 9]
  - **해상도**: `#info-dimensions` (예: 0 × 0 px)[cite: 9]
  - **총 프레임 수**: `#info-frames` (예: 30 Frames)[cite: 9]
  - **FPS**: `#info-fps` (예: 15 FPS)[cite: 9]

### 3. 편집 도구 패널 (Tools Panel)
작업 선택 화면에서 각 버튼 클릭 시 개별 서브 옵션 뷰로 전환됩니다[cite: 9].

- 📐 **크기 조절 (Resize)**:
  - 가로/세로 수치 직접 입력 (`px`) 및 비율 고정(Lock) 토글 버튼[cite: 9]
  - 가로 및 세로 각각을 조절할 수 있는 슬라이더 제공[cite: 9]
- ✂️ **자르기 (Crop)**:
  - 자르기 영역 배경 스타일 선택 (투명 / 색상 채우기)[cite: 9]
  - 색상 채우기 선택 시 컬러 피커(`color input`) 동적 노출[cite: 9]
- ⚡ **속도 조절 (Speed)**:
  - 0.25x ~ 3.0x 범위 (0.25 단위) 재생 속도 슬라이더 및 배율 텍스트 실시간 반영[cite: 9]
- 🚀 **용량 최적화 (Optimize)**:
  - 3단계 압축 수준 선택 (기본 압축 / 권장 압축 / 강한 압축)[cite: 9]

### 4. 하단 동작 바 (Action Bar)
- **다른 파일 선택**: 현재 작업을 초기화하고 새 GIF를 불러오는 기능[cite: 9]
- **결과물 다운로드**: 편집이 완료된 GIF 파일 다운로드 링크[cite: 9]

---

## ⚙️ 외부 리소스 및 라이브러리

| 리소스명 | 종류 | URL / 경로 | 용도 |
| :--- | :--- | :--- | :--- |
| **FontAwesome** | CSS | `https://cdnjs.cloudflare.com/.../font-awesome/6.4.0/css/all.min.css` | UI 아이콘[cite: 9] |
| **Google Fonts** | CSS | `https://fonts.googleapis.com/.../css2?family=Noto+Sans+KR...` | 타이포그래피[cite: 9] |
| **style.css** | CSS | `./style.css` | 애플리케이션 디자인 및 레이아웃[cite: 9] |
| **script.js** | JS | `./script.js` | UI 인터랙션 및 GIF 편집 로직[cite: 9] |

---

## 📂 디렉토리 구조

```text
.
├── index_9.html       # 메인 HTML 구조[cite: 9]
├── style.css          # 외부 스타일시트[cite: 9]
├── script.js          # 자바스크립트 로직[cite: 9]
└── README.md          # 프로젝트 안내 문서
