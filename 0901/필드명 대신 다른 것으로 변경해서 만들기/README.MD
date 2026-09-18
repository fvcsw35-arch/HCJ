# 📚 교육 만족도 및 자료 신청 웹 폼 (Education Satisfaction & Material Request)

> **교육 참가자들의 피드백 수집과 강의 자료 발송 신청을 동시에 처리하는 심플하고 직관적인 Light UI 기반 단일 페이지 웹 애플리케이션(SPA)입니다.**  
> Google Apps Script(`google.script.run`) 연동을 지원하며 타임아웃 예외 처리, 비동기 상태 바인딩 및 사용자 친화적 UI를 제공합니다.

---

## 📌 프로젝트 소개

본 프로젝트는 오프라인/온라인 교육 종료 후 수강생의 만족도 및 피드백을 수집하고, 자료 수령용 이메일을 접수받기 위해 제작되었습니다[cite: 7].

- **Clean & Light UI**: 깔끔한 카체 형태의 카드 레이아웃과 직관적인 라디오 버튼 라벨 UI 제공[cite: 7].
- **Google Apps Script 연동**: 구글 스프레드시트 또는 메일 발송 로직과 손쉽게 연동 가능한 `google.script.run` 지원[cite: 7].
- **안정적인 예외 처리**: 15초 응답 타임아웃, 예외 발생 시 안내 메시지 처리 및 비동기 제출 로딩 상태 제어[cite: 7].

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend
* **HTML5**: Semantic Form 구조, Meta Viewport 모바일 최적화[cite: 7]
* **CSS3**: Modern Flexbox Layout, CSS Transitions & Focus State UI[cite: 7]
* **JavaScript (Vanilla ES6+)**: DOM Event Handling, Async Callback Processing, Timeout Management[cite: 7]

### Backend Integration
* **Google Apps Script API**: `google.script.run`을 통한 비동기 데이터 전달 (`saveData`)[cite: 7]

---

## ✨ 주요 기능 및 특징

### 1. 직관적인 폼 구성
* **소속 / 성함 (필수)**: Text Input[cite: 7]
* **자료받을 이메일 (필수)**: Email Validation Input[cite: 7]
* **오늘 강의 만족도 (필수)**: 4점 척도 커스텀 라디오 버튼 (`매우만족`, `만족`, `보통`, `아쉬움`)[cite: 7]
* **유익했던 점 / 피드백 (선택)**: Textarea (개선 의견 수집)[cite: 7]
* **희망하는 다음 교육 주제 (선택)**: Text Input (추후 교육 개설 참고용)[cite: 7]

### 2. 사용자 경험 (UX) 최적화
* **커스텀 평가 버튼**: 라디오 버튼 클릭 시 파란색 배경으로 강조되는 신속한 인터랙션[cite: 7].
* **제출 상태 바인딩**: 제출 클릭 시 버튼 비활성화 및 `제출 중입니다...` 텍스트 표시로 중복 제출 방지[cite: 7].
* **동적 성공 화면 전환**: 제출 성공 시 폼 영역이 숨겨지고 완료 안내 문구와 축하 이모지가 포함된 안내 메시지 표시[cite: 7].

### 3. 안정성 및 예외 처리
* **클라이언트 단 필수값 검증**: 필수 항목 미입력 시 경고창(`alert`) 출력[cite: 7].
* **15초 타임아웃 기능**: 네트워크 지연 발생 시 15초 후 자동으로 세션을 복구하고 재시도를 안내[cite: 7].
* **에러 핸들링**: 백엔드 오류 발생 시 원인을 경고창으로 출력하고 버튼을 다시 활성화[cite: 7].

---

## 📝 입력 폼 명세 (Form Specifications)

| 필드명 | 타입 | 필수 여부 | 설명 |
| :--- | :--- | :---: | :--- |
| **`name`** | Text | 필수 (`*`) | 제출자 소속 및 성함 (예: 홍길동 (OO학과/OO팀))[cite: 7] |
| **`email`** | Email | 필수 (`*`) | 강의 자료를 수령할 이메일 주소[cite: 7] |
| **`rating`** | Radio | 필수 (`*`) | 5점(매우만족), 4점(만족), 3점(보통), 2점(아쉬움)[cite: 7] |
| **`feedback`** | Textarea | 선택 | 유익했던 내용 및 개선 의견[cite: 7] |
| **`futureTopic`**| Text | 선택 | 개설 희망 다음 교육 주제[cite: 7] |

---

## ⚙️ 백엔드 연동 가이드 (Google Apps Script)

Google Apps Script 프로젝트 내 `Code.gs` 파일에 아래와 같이 `saveData` 함수를 구현하여 연결합니다[cite: 7].

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index_7')
    .setTitle('교육 만족도 및 자료 신청');
}

function saveData(formData) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      formData.name,
      formData.email,
      formData.rating,
      formData.feedback,
      formData.futureTopic
    ]);
    
    // (선택) 신청자에게 강의 자료 자동 이메일 발송 로직 추가 가능
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
