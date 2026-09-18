# DocuStats - 문서 통계 분석기

PDF 및 DOCX 문서 파일을 업로드하여 글자 수, 단어 수, 공백, 이미지 개수 등을 정밀하게 분석할 수 있는 웹 기반 문서 분석 도구입니다.

---

## 주요 기능

* **문서 파일 업로드 (Drop Zone)**:
  * 드래그 앤 드롭 방식을 이용한 편리한 파일 업로드 지원
  * 클릭을 통한 직접 파일 선택 지원 (`.pdf`, `.docx`)
* **파일 상세 정보 및 로딩 현황 제공**:
  * 업로드된 파일명, 파일 크기(KB) 표시 및 초기화 버튼 제공
  * 파싱 진행 시 실시간 애니메이션 스피너 출력[cite: 8]
* **정밀 문서 통계 지표 분석**:
  * **총 글자 수 (공백 포함)**[cite: 8]
  * **총 글자 수 (공백 제외)**[cite: 8]
  * **단어 수 (Word Count)**[cite: 8]
  * **공백 개수 (Spaces)**[cite: 8]
  * **포함된 이미지 개수**[cite: 8]

---

## 지원 파일 형식

* **PDF 문서**: `.pdf`[cite: 8]
* **Word 문서**: `.docx`[cite: 8]

---

## 기술 스택 및 외부 라이브러리

* **Frontend**: HTML5, CSS3, JavaScript[cite: 8]
* **External Libraries**:
  * **PDF.js (`v3.11.174`)**: PDF 문서 구조 분석 및 텍스트/미디어 파싱[cite: 8]
  * **Mammoth.js (`v1.6.0`)**: DOCX 파일 내 텍스트 및 이미지 요소 추출[cite: 8]
* **UI & Web Fonts**:
  * Google Fonts (`Outfit`, `Noto Sans KR`)[cite: 8]
  * Font Awesome 6.4.0 (아이콘 라이브러리)[cite: 8]

---

## 프로젝트 구조

```text
.
├── index_8.html     # 분석기 메인 HTML 레이아웃 및 CDN 연결
├── style.css        # 드롭존, 통계 카드 그리드 및 애니메이션 스타일시트
└── script.js        # PDF/DOCX 파싱 및 실시간 수치 계산 로직
