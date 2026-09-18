# Lorem Ipsum Generator

슬라이더 조절 및 프리셋 버튼을 통해 원하는 글자 수만큼 더미 텍스트(Lorem Ipsum)를 손쉽게 생성하고 복사할 수 있는 웹 기반 텍스트 생성기입니다.

---

## 주요 기능

* **슬라이더 기반 글자 수 조절**:
  * 슬라이더를 이용해 $10\text{자}$부터 $5000\text{자}$까지 세밀하게 목표 글자 수를 설정 가능
  * 현재 설정된 글자 수를 실시간 배지로 확인
* **원클릭 프리셋 버튼**:
  * 자주 사용하는 글자 수($50\text{자}$, $150\text{자}$, $500\text{자}$, $1000\text{자}$, $3000\text{자}$)를 빠르게 선택
* **텍스트 출력 및 통계**:
  * 생성된 더미 텍스트를 전용 텍스트 영역(`textarea`)에 출력[cite: 4]
  * 공백 포함 실시간 글자 수 및 단어 수 통계 제공[cite: 4]
* **클립보드 복사**:
  * 복사하기 버튼을 눌러 생성된 텍스트를 클립보드에 바로 저장[cite: 4]

---

## 기술 스택

* **Frontend**: HTML5, CSS3, JavaScript[cite: 4]
* **UI & Web Fonts**:
  * Google Fonts (`Outfit`, `Noto Sans KR`)[cite: 4]
  * Font Awesome 6.4.0 (아이콘 라이브러리)[cite: 4]
* **Design Styles**: Glassmorphism (배경 글래스모피즘 효과 적용)[cite: 4]

---

## 프로젝트 구조

```text
.
├── index_4.html     # 메인 HTML UI 레이아웃
├── style.css        # 스타일시트 (글래스모피즘 및 반응형 UI)
└── script.js        # 텍스트 생성, 슬라이더 제어 및 복사 기능 로직
