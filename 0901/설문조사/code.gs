const SHEET_NAME = '설문응답';

/**
 * Google Apps Script 웹앱 진입점
 */
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('서비스 만족도 설문조사')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 설문 응답을 Google Sheets에 저장합니다.
 */
function submitSurvey(data) {
  if (!data) {
    throw new Error('전송된 응답 데이터가 없습니다.');
  }

  const required = ['q1', 'q2', 'q3', 'q4', 'q5'];
  required.forEach(function(key) {
    if (!data[key]) {
      throw new Error('필수 문항이 누락되었습니다: ' + key);
    }
  });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      '제출일시',
      '전반적 만족도',
      '사용 편의성',
      '정보 탐색 용이성',
      '가장 만족스러운 부분',
      '추천 의향',
      '개선 의견',
      '이메일'
    ]);
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(),
    sanitize_(data.q1),
    sanitize_(data.q2),
    sanitize_(data.q3),
    sanitize_(data.q4),
    sanitize_(data.q5),
    sanitize_(data.q6),
    sanitize_(data.email)
  ]);

  return { success: true };
}

/**
 * 스프레드시트 수식 주입을 방지합니다.
 */
function sanitize_(value) {
  if (value === null || value === undefined) return '';
  const text = String(value).trim();

  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }
  return text;
}
