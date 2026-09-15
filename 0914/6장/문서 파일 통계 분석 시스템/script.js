// PDF.js 워커 엔진 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// DOM 엘리먼트 참조
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileInfo = document.getElementById('file-info');
const fileNameEl = document.getElementById('file-name');
const fileSizeEl = document.getElementById('file-size');
const btnReset = document.getElementById('btn-reset');
const loadingBox = document.getElementById('loading-box');

// 통계 지표 엘리먼트
const charWithSpaceEl = document.getElementById('char-with-space');
const charNoSpaceEl = document.getElementById('char-no-space');
const wordCountEl = document.getElementById('word-count');
const spaceCountEl = document.getElementById('space-count');
const imageCountEl = document.getElementById('image-count');

// 드래그 앤 드롭 및 클릭 이벤트
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// 초기화 버튼 이벤트
btnReset.addEventListener('click', resetAll);

// 파일 분기 처리 함수
async function handleFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
        alert('PDF 또는 DOCX 확장자의 문서 파일만 가능합니다.');
        return;
    }

    // UI 상태 업데이트
    fileNameEl.textContent = file.name;
    fileSizeEl.textContent = (file.size / 1024).toFixed(1) + ' KB';
    fileInfo.style.display = 'flex';
    loadingBox.style.display = 'block';

    try {
        if (ext === 'pdf') {
            await parsePDF(file);
        } else if (ext === 'docx') {
            await parseDOCX(file);
        }
    } catch (error) {
        console.error(error);
        alert('문서를 해석하는 중 오류가 발생했습니다.');
    } finally {
        loadingBox.style.display = 'none';
    }
}

// PDF 파서
async function parsePDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    let imageCount = 0;

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        // 텍스트 추출
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';

        // 이미지 오퍼레이터 수 체크
        const operatorList = await page.getOperatorList();
        for (let j = 0; j < operatorList.fnArray.length; j++) {
            const fn = operatorList.fnArray[j];
            if (fn === pdfjsLib.SVGGraphics.OPS.paintImageXObject ||
                fn === pdfjsLib.SVGGraphics.OPS.paintInlineImageXObject) {
                imageCount++;
            }
        }
    }

    updateMetrics(fullText, imageCount);
}

// DOCX 파서
async function parseDOCX(file) {
    const arrayBuffer = await file.arrayBuffer();

    // 텍스트 추출
    const textResult = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    const fullText = textResult.value;

    // 이미지 카운팅
    let imageCount = 0;
    await mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(result => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(result.value, 'text/html');
        imageCount = doc.querySelectorAll('img').length;
    });

    updateMetrics(fullText, imageCount);
}

// 카운팅 계산 및 렌더링
function updateMetrics(text, imageCount) {
    const charWithSpace = text.length;
    const charNoSpace = text.replace(/\s/g, '').length;
    const spaceCount = charWithSpace - charNoSpace;

    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = text.trim() === '' ? 0 : words.length;

    charWithSpaceEl.textContent = charWithSpace.toLocaleString();
    charNoSpaceEl.textContent = charNoSpace.toLocaleString();
    wordCountEl.textContent = wordCount.toLocaleString();
    spaceCountEl.textContent = spaceCount.toLocaleString();
    imageCountEl.textContent = imageCount.toLocaleString();
}

// 초기화
function resetAll() {
    fileInput.value = '';
    fileInfo.style.display = 'none';
    loadingBox.style.display = 'none';

    charWithSpaceEl.textContent = '0';
    charNoSpaceEl.textContent = '0';
    wordCountEl.textContent = '0';
    spaceCountEl.textContent = '0';
    imageCountEl.textContent = '0';
}