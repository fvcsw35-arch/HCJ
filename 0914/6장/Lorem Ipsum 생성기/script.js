// 원본 로렘 입숨 데이터소스
const loremBase = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tiddunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Proin dui dropped, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.`;

// DOM 엘리먼트 참조
const slider = document.getElementById('char-slider');
const charCountDisplay = document.getElementById('char-count-display');
const outputText = document.getElementById('output-text');
const actualCharCount = document.getElementById('actual-char-count');
const actualWordCount = document.getElementById('actual-word-count');
const btnCopy = document.getElementById('btn-copy');
const copyText = document.getElementById('copy-text');
const presetButtons = document.querySelectorAll('.btn-preset');

// 충분한 길이의 로렘 입숨 텍스트를 미리 확보
function getExtendedLoremText(targetLength) {
    let extended = loremBase;
    while (extended.length < targetLength + 200) {
        extended += ' ' + loremBase;
    }
    return extended;
}

// 텍스트 생성 및 UI 업데이트
function generateText() {
    const targetLength = parseInt(slider.value, 10);
    charCountDisplay.textContent = targetLength.toLocaleString();

    let rawText = getExtendedLoremText(targetLength).slice(0, targetLength);

    // 단어가 중간에 어색하게 잘리지 않도록 문장부호 처리 후 마감
    if (rawText.length > 0 && rawText.slice(-1) === ' ') {
        rawText = rawText.slice(0, -1) + '.';
    }

    outputText.value = rawText;

    // 실제 정보 업데이트
    actualCharCount.textContent = rawText.length.toLocaleString();

    const words = rawText.trim().split(/\s+/).filter(w => w.length > 0);
    actualWordCount.textContent = words.length.toLocaleString();

    // 프리셋 버튼 활성화 상태 업데이트
    presetButtons.forEach(btn => {
        if (parseInt(btn.dataset.value, 10) === targetLength) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 슬라이더 변경 이벤트 Handling
slider.addEventListener('input', generateText);

// 프리셋 버튼 클릭 이벤트 Handling
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        slider.value = btn.dataset.value;
        generateText();
    });
});

// 복사 기능
btnCopy.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputText.value);

        // 버튼 텍스트 일시 변경
        copyText.textContent = '복사 완료!';
        btnCopy.style.borderColor = '#34d399';
        btnCopy.style.color = '#34d399';

        setTimeout(() => {
            copyText.textContent = '복사하기';
            btnCopy.style.borderColor = '';
            btnCopy.style.color = '';
        }, 1500);
    } catch (err) {
        alert('클립보드 복사에 실패했습니다.');
    }
});

// 초기 실행 (기본 150자 생성)
generateText();