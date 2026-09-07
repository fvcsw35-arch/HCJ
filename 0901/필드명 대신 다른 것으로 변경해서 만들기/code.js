/**
 * 교육 만족도 & 자료 신청 통합 스크립트 (Code.gs)
 */

// 웹앱 접속 시 index.html을 연다
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('교육 만족도 조사 및 자료 신청')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 폼 데이터를 구글 시트에 저장
function saveData(formData) {
  var lock = LockService.getScriptLock();
  
  try {
    // 동시 제출 충돌 방지 (최대 10초 대기)
    lock.waitLock(10000);

    // 필수 항목 서버 단 검증
    if (!formData || !formData.name || !formData.email || !formData.rating) {
      return { success: false, error: '필수 항목(이름, 이메일, 만족도)을 모두 채워주세요.' };
    }

    // ⚠️ 본인의 실제 Google Sheet ID를 입력하세요.
    var SPREADSHEET_ID = '1piPPLnSLxuNC4bmyA8LA61CIEKko_kNC9a-vAUuEQ5k';
    
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getActiveSheet();

    // 시트에 데이터가 없으면 첫 줄에 제목(헤더) 작성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '소속/성함', 
        '이메일', 
        '강의 만족도', 
        '가장 좋았던 점/피드백', 
        '추후 희망 교육 주제', 
        '제출 시간'
      ]);
    }

    // 작성 시간 정제 (한국 시간 기준)
    var timeZone = ss.getSpreadsheetTimeZone() || 'Asia/Seoul';
    var formattedDate = Utilities.formatDate(new Date(), timeZone, 'yyyy-MM-dd HH:mm:ss');

    // 데이터 행 추가
    sheet.appendRow([
      formData.name.trim(),
      formData.email.trim(),
      formData.rating,
      formData.feedback ? formData.feedback.trim() : '',
      formData.futureTopic ? formData.futureTopic.trim() : '',
      formattedDate
    ]);

    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };

  } finally {
    lock.releaseLock();
  }
}