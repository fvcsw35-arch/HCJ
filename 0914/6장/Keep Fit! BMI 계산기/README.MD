# Body Metric Engine - BMI & 체중 분석기

사용자의 신체 정보를 바탕으로 현재 BMI 지수를 계산하고, 설정된 목표 BMI별 달성 체중 및 가감해야 할 체중 수치를 산출해 주는 웹 애플리케이션입니다.

---

## 주요 기능

* **성별 선택 기능**: 남성 및 여성 성별 구분 입력 지원
* **신체 수치 입력 및 유효성 검사**:
  * **키 (cm)**: $50\text{ cm} \sim 250\text{ cm}$ 범위 내 입력 ($0.1\text{ cm}$ 단위)
  * **몸무게 (kg)**: $10\text{ kg} \sim 400\text{ kg}$ 범위 내 입력 ($0.1\text{ kg}$ 단위)
* **현재 BMI 지수 산출 및 비만도 상태 표시**: 입력받은 키와 몸무게를 기반으로 현재 BMI 수치 및 상태(예: 정상 등) 안내[cite: 3]
* **목표 BMI별 체중 분석 가이드**:
  * 목표 BMI 수치 카드 제공 (BMI 90, BMI 100, BMI 110)[cite: 3]
  * 각 목표 BMI 도달에 필요한 **목표 체중(kg)** 표시[cite: 3]
  * 현재 체중 대비 증감해야 하는 **체중 차이(kg)** 계산 및 안내[cite: 3]

---

## 기술 스택

* **Frontend**: HTML5, CSS3, JavaScript[cite: 3]
* **UI & Web Fonts**:
  * Google Fonts (`Outfit`, `Noto Sans KR`)[cite: 3]
  * Font Awesome 6.4.0 (아이콘 라이브러리)[cite: 3]
* **Design Styles**: Glassmorphism (글래스모피즘 효과 적용)[cite: 3]

---

## 프로젝트 구조

```text
.
├── index_3.html     # 메인 HTML UI 구조
├── style.css        # 스타일시트 (글래스모피즘 및 응답형 디자인)
└── script.js        # BMI 연산 및 DOM 업데이트 제어 스크립트
