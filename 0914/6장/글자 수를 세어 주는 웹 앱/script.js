// DOM 요소
const textInput = document.getElementById("text-input");
const byteCountEl = document.getElementById("byte-count");
const charWithSpaceEl = document.getElementById("char-with-space");
const charNoSpaceEl = document.getElementById("char-no-space");
const btnClear = document.getElementById("btn-clear");
const btnCopy = document.getElementById("btn-copy");

// 바이트 계산 함수 (한글: 2Byte, 나머지: 1Byte)
function getCustomByteLength(str) {
    let byte = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        // 한글 완성형 및 조합형 영역 체크 (가-힣, ㄱ-ㅎ, ㅏ-ㅣ)
        if (
            (charCode >= 0xac00 && charCode <= 0xd7a3) ||
            (charCode >= 0x1100 && charCode <= 0x11ff) ||
            (charCode >= 0x3131 && charCode <= 0x318e)
        ) {
            byte += 2; // 한글 2byte
        } else {
            byte += 1; // 영문, 숫자, 공백, 특수문자, 줄바꿈 등 1byte
        }
    }
    return byte;
}

// 카운트 업데이트 함수
function updateCounts() {
    const text = textInput.value;

    // 1. 바이트 계산
    const bytes = getCustomByteLength(text);

    // 2. 공백 포함 글자 수
    const totalChars = text.length;

    // 3. 공백 제외 글자 수 (공백, 탭, 줄바꿈 등 제거)
    const noSpaceChars = text.replace(/\s/g, "").length;

    // 화면 업데이트 (천 단위 쉼표 포맷팅)
    byteCountEl.innerHTML = `${bytes.toLocaleString()} <small>Bytes</small>`;
    charWithSpaceEl.innerHTML = `${totalChars.toLocaleString()} <small>자</small>`;
    charNoSpaceEl.innerHTML = `${noSpaceChars.toLocaleString()} <small>자</small>`;
}

// 이벤트 리스너: 입력 시 실시간 업데이트
textInput.addEventListener("input", updateCounts);

// 초기화 버튼
btnClear.addEventListener("click", () => {
    textInput.value = "";
    updateCounts();
    textInput.focus();
});

// 복사하기 버튼
btnCopy.addEventListener("click", () => {
    if (!textInput.value) return;

    navigator.clipboard.writeText(textInput.value).then(() => {
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = `<i class="fa-solid fa-check"></i> 복사 완료!`;

        setTimeout(() => {
            btnCopy.innerHTML = originalText;
        }, 1500);
    });
});