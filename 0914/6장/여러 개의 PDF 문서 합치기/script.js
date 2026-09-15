// 메모리에 보유할 업로드 파일 데이터 배열
let pdfFiles = [];

// DOM 엘리먼트 참조
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileListCard = document.getElementById('file-list-card');
const fileListEl = document.getElementById('file-list');
const fileCountEl = document.getElementById('file-count');
const btnClear = document.getElementById('btn-clear');
const btnMerge = document.getElementById('btn-merge');
const loadingBox = document.getElementById('loading-box');

// SortableJS 초기화 (드래그 앤 드롭으로 리스트 순서 변경)
const sortable = new Sortable(fileListEl, {
    animation: 150,
    handle: '.drag-handle',
    ghostClass: 'sortable-ghost',
    onEnd: function () {
        // 드래그 후 UI 순서에 맞게 pdfFiles 배열 순서 재정렬
        const newOrderFiles = [];
        const items = fileListEl.querySelectorAll('.file-item');
        items.forEach(item => {
            const id = item.dataset.id;
            const found = pdfFiles.find(f => f.id === id);
            if (found) newOrderFiles.push(found);
        });
        pdfFiles = newOrderFiles;
    }
});

// 파일 업로드 이벤트 핸들러
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
        addFiles(Array.from(e.dataTransfer.files));
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        addFiles(Array.from(e.target.files));
        fileInput.value = ''; // 동일 파일 재선택 가능 처리
    }
});

// 파일 추가 처리
function addFiles(files) {
    const validFiles = files.filter(file => file.name.toLowerCase().endsWith('.pdf'));

    if (validFiles.length === 0) {
        alert('PDF 파일만 업로드할 수 있습니다.');
        return;
    }

    validFiles.forEach(file => {
        pdfFiles.push({
            id: 'pdf-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9),
            file: file
        });
    });

    renderFileList();
}

// 파일 목록 UI 렌더링
function renderFileList() {
    fileListEl.innerHTML = '';

    if (pdfFiles.length === 0) {
        fileListCard.style.display = 'none';
        return;
    }

    fileListCard.style.display = 'block';
    fileCountEl.textContent = `${pdfFiles.length}개`;

    pdfFiles.forEach(item => {
        const li = document.createElement('li');
        li.className = 'file-item';
        li.dataset.id = item.id;

        const sizeInKB = (item.file.size / 1024).toFixed(1);

        li.innerHTML = `
            <div class="file-info-group">
                <i class="fa-solid fa-grip-vertical drag-handle" title="순서 변경"></i>
                <i class="fa-solid fa-file-pdf pdf-icon"></i>
                <span class="file-name" title="${item.file.name}">${item.file.name}</span>
                <span class="file-size">(${sizeInKB} KB)</span>
            </div>
            <button type="button" class="btn-remove" title="삭제">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        // 단일 삭제 버튼 이벤트
        li.querySelector('.btn-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            pdfFiles = pdfFiles.filter(f => f.id !== item.id);
            renderFileList();
        });

        fileListEl.appendChild(li);
    });
}

// 전체 삭제
btnClear.addEventListener('click', () => {
    pdfFiles = [];
    renderFileList();
});

// PDF 병합 로직 (pdf-lib 활용)
btnMerge.addEventListener('click', async () => {
    if (pdfFiles.length < 2) {
        alert('병합하려면 최소 2개 이상의 PDF 파일이 필요합니다.');
        return;
    }

    loadingBox.style.display = 'block';
    btnMerge.disabled = true;

    try {
        // 새 빈 PDF 문서 생성
        const mergedPdf = await PDFLib.PDFDocument.create();

        for (const item of pdfFiles) {
            const arrayBuffer = await item.file.arrayBuffer();
            const pdfToMerge = await PDFLib.PDFDocument.load(arrayBuffer);

            // 해당 PDF의 모든 페이지 복사
            const copiedPages = await mergedPdf.copyPages(
                pdfToMerge,
                pdfToMerge.getPageIndices()
            );

            // 새 PDF 문서에 페이지 추가
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }

        // 병합된 PDF 바이너리 데이터 저장
        const mergedPdfBytes = await mergedPdf.save();

        // Blob 생성 및 다운로드 트리거
        const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'merged_document.pdf';
        link.click();

        URL.revokeObjectURL(link.href);

    } catch (error) {
        console.error('PDF 병합 중 오류 발생:', error);
        alert('PDF 병합 실패: 손상되었거나 암호가 걸린 파일인지 확인해 주세요.');
    } finally {
        loadingBox.style.display = 'none';
        btnMerge.disabled = false;
    }
});