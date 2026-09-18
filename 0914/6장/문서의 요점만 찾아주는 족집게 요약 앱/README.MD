# TextRank 핵심 요약기 (Summary Engine)

TextRank 그래프 기반 추출 요약 알고리즘을 활용하여 텍스트 및 문서에서 핵심 문장만을 정확하게 추출해 주는 웹 애플리케이션입니다.

---

## 주요 기능

* **다양한 입력 방식 지원**:
  * **파일 업로드**: `.txt` 파일 드래그 앤 드롭 및 선택 업로드
  * **텍스트 직접 입력**: 텍스트 상자(`textarea`)에 원하는 문장을 직접 붙여넣어 요약 가능
* **슬라이더 기반 요약 분량 조절**:
  * 슬라이드바를 이용해 추출할 핵심 문장 수를 $1\text{문장}$부터 $5\text{문장}$까지 설정 가능
* **TextRank 기반 추출 요약**:
  * 입력된 문서의 중요도 점수 및 순위를 계산하여 상위 핵심 문장 출력
  * 요약 결과에 대한 총 단어 수 통계 제공[cite: 9]
* **결과 복사 기능**:
  * 생성된 요약문을 원클릭으로 클립보드에 복사할 수 있는 상단 복사 버튼 제공[cite: 9]

---

## 지원 파일 형식

* **텍스트 파일**: `.txt`[cite: 9]

---

## 기술 스택

* **Frontend**: HTML5, CSS3, JavaScript[cite: 9]
* **UI & Web Fonts**:
  * Google Fonts (`Plus Jakarta Sans`, `Noto Sans KR`)[cite: 9]
  * Font Awesome 6.4.0 (아이콘 라이브러리)[cite: 9]

---

## 프로젝트 구조

```text
.
├── index_9.html     # 요약기 메인 HTML 레이아웃
├── style.css        # 워크스페이스 패널 및 responsive UI 스타일시트
└── script.js        # TextRank 알고리즘, 슬라이더 제어 및 파일 읽기 로직
