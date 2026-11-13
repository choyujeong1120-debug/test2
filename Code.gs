const SPREADSHEET_ID = '1dkPAOIbdIFVPzGDF5sPz6SG6RMn6-nIu-V7wN_ZtTwo';

// 웹 앱 접속 시 HTML 화면 출력
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('동아리 활동 기록지')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 폼에서 전달받은 데이터를 시트에 저장
function saveRecord(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheets()[0]; // 첫 번째 시트 사용

    // 시트가 완전히 비어있다면 헤더(제목 행) 자동 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['제출일시', '이름', '활동날짜', '분야', '활동주제', '활동내용']);
    }

    // 데이터 한 줄 추가
    sheet.appendRow([
      new Date(),        // 시스템 기록 시간
      data.name,         // 이름
      data.date,         // 활동 날짜
      data.category,     // 분야 (화학, 물리, 생명, 공학)
      data.topic,        // 활동 주제
      data.content       // 상세 활동 내용
    ]);

    return { success: true };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}
