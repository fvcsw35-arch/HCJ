# 💻 전산실 장비 및 환경 만족도 조사 (Computer Lab Survey)

> **전산실 내 컴퓨팅 장비, 네트워크, 이용 환경 점검 및 유지보수/교체 우선순위 수집을 위한 웹 설문 시스템입니다.**  
> Google Apps Script(`google.script.run`) 연동 및 순수 HTML/CSS/Vanilla JS 기반의 반응형 단일 페이지 웹 애플리케이션(SPA)입니다.

---

## 📌 프로젝트 소개

본 프로젝트는 전산실을 이용하는 사용자들의 실제 사용 경험을 바탕으로 장비 성능, 물리적 환경, 장애 관리 만족도를 조사하기 위해 제작되었습니다[cite: 6]. 

수집된 데이터는 전산실 노후 장비 교체 및 유지보수 지원의 우선순위를 산정하는 기초 자료로 활용됩니다[cite: 6].

---

## 🛠️ 기술 스택 (Tech Stack)

* **Frontend**: HTML5, CSS3 (Modern CSS Custom Properties / Variables, Flexbox, CSS Grid)[cite: 6]
* **Scripting**: Vanilla JavaScript (ES6+)[cite: 6]
* **Backend Interoperability**: Google Apps Script (`google.script.run` API 연동 구조)[cite: 6]
* **Design/UI**: Apple System Font / Noto Sans KR 기반 반응형 및 모바일 최적화 웹 디자인[cite: 6]

---

## ✨ 주요 기능 및 특징

### 1. 실시간 필수 문항 진행률 (Progress Bar)
* 필수 라디오 버튼 항목( 총 13개 ) 응답 시 dynamic하게 퍼센트(`0%` ~ `100%`)와 프로그레스 바 길이가 실시간 연동되어 업데이트됩니다[cite: 6].

### 2. 폼 유효성 검사 (Form Validation)
* 제출 시 필수 응답 문항 미선택 항목을 감지하여 에러 메시지 표시[cite: 6].
* 응답이 누락된 첫 번째 질문 위치로 부드럽게 스크롤 자동 이동 (`scrollIntoView({ behavior: 'smooth' })`)[cite: 6].

### 3. 사용자 경험 (UX/UI) 최적화
* **커스텀 라디오 타일**: 기본 Radio UI 대신 모바일/데스크톱 모두 터치/클릭이 용이한 카드 형태 라벨 UI 구현[cite: 6].
* **제출 상태 바인딩**: 제출 클릭 시 버튼 비활성화 및 로딩 텍스트 변화로 중복 제출 방지[cite: 6].
* **완료 화면 전환**: 제출 완료 시 폼 및 진행률 바가 숨겨지고 체크 아이콘과 함께 감사 메시지 렌더링[cite: 6].

---

## 📝 설문 구성 내용 (총 16문항)

본 설문은 총 3개 섹션의 13개 필수 문항 및 3개 선택 문항으로 구성되어 있습니다[cite: 6].

### 1. 전산실 장비 만족도 (필수)
- **Q1.** 컴퓨터 전반적인 상태[cite: 6]
- **Q2.** 컴퓨터 속도 및 성능[cite: 6]
- **Q3.** 모니터 화면 상태 및 크기[cite: 6]
- **Q4.** 키보드 상태 및 사용감[cite: 6]
- **Q5.** 마우스 상태 및 사용감[cite: 6]
- **Q6.** 프린터 등 주변기기 상태 (사용하지 않음 옵션 포함)[cite: 6]

### 2. 전산실 이용 환경 (필수)
- **Q7.** 인터넷 및 네트워크 속도/안정성[cite: 6]
- **Q8.** 책상, 의자 등 이용 환경[cite: 6]
- **Q9.** 장비 청결 및 관리 상태[cite: 6]

### 3. 장애 및 개선 사항
- **Q10.** (필수) 최근 고장/불편 경험 여부[cite: 6]
- **Q11.** (필수) 장애 발생 시 지원 및 처리 적절성[cite: 6]
- **Q12.** (필수) 최우선 교체/개선 필요 장비 (본체, 모니터, 키보드, 마우스, 주변기기, 네트워크, 환경 등)[cite: 6]
- **Q13.** (필수) 전산실 가장 필요한 개선 영역[cite: 6]
- **Q14.** (선택) 구체적 불편 장비/고장 사례 (자유 서술형 Textarea)[cite: 6]
- **Q15.** (선택) 추가 의견 및 개선 제안 (자유 서술형 Textarea)[cite: 6]
- **Q16.** (선택) 추가 확인을 위한 연락처 이메일[cite: 6]

---

## ⚙️ 백엔드 연동 가이드 (Google Apps Script)

본 HTML 파일은 Google Apps Script 웹 앱 환경에 최적화되어 있습니다[cite: 6].

### Apps Script (`Code.gs`) 작성예시

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index_6');
}

function submitSurvey(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    data.q1, data.q2, data.q3, data.q4, data.q5,
    data.q6, data.q7, data.q8, data.q9, data.q10,
    data.q11, data.q12, data.q13, data.q14, data.q15,
    data.email
  ]);
  return { status: 'success' };
}
