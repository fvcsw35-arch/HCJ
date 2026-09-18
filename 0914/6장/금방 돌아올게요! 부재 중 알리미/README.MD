# 부재중 안내 모드 (Away Mode / Away Display)

자리를 비우는 동안 모니터 화면에 부재 사유, 복귀 예정 시간, 실시간 카운트다운 및 안내 문구를 전체 화면으로 띄워둘 수 있는 웹 기반 부재중 안내 디스플레이입니다.

---

## 주요 기능

* **자리 비움 정보 설정 (Setup View)**:
  * **주요 일정 / 사유**: 외부 회의, 점심 식사, 휴게 중 등 부재 사유 입력
  * **복귀 예정 시간**: 시간 선택(`input type="time"`)을 통한 복귀 시간 지정
  * **기타 안내 문구**: 연락처 안내나 전달사항 등 부가 텍스트 입력
* **전체 화면 부재 안내 디스플레이 (Display View)**:
  * **상태 표시**: `CURRENTLY AWAY` 펄스 애니메이션 배지 탑재[cite: 6]
  * **메인 일정 강조**: 입력한 주요 일정을 대형 텍스트로 시각적 강조[cite: 6]
  * **시간 및 카운트다운**: 복귀 예정 시간 및 남은 시간(`00:00:00`) 실시간 표시[cite: 6]
  * **다이내믹 오로라 배경**: 오로라 그라데이션 및 블롭(Blob) 애니메이션 배경 연출[cite: 6]
  * **화면 종료 기능**: 우측 상단 닫기 버튼 또는 `Esc` 키로 안내 화면 종료 가능[cite: 6]

---

## 기술 스택

* **Frontend**: HTML5, CSS3, JavaScript[cite: 6]
* **UI & Web Fonts**:
  * Google Fonts (`Outfit`, `Noto Sans KR`)[cite: 6]
  * Font Awesome 6.4.0 (아이콘 라이브러리)[cite: 6]
* **Visual Effects**: Glassmorphism & Aurora Dynamic Animation[cite: 6]

---

## 프로젝트 구조

```text
.
├── index_6.html     # 설정 화면 및 부재중 안내 화면 레이아웃
├── style.css        # 오로라 배경 애니메이션 및 풀스크린 UI 스타일시트
└── script.js        # 입력 값 처리, 카운트다운 타이머 및 화면 전환 로직
