document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 요소 참조 ---
    const uploadContainer = document.getElementById('upload-container');
    const editorContainer = document.getElementById('editor-container');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const btnChoose = document.getElementById('btn-choose');

    const btnChangeFile = document.getElementById('btn-change-file');
    const changeFileInput = document.getElementById('change-file-input');
    const gifPreview = document.getElementById('gif-preview');
    const btnDownload = document.getElementById('btn-download');

    // 파일 정보 표시 요소를 위한 참조
    const infoSize = document.getElementById('info-size');
    const infoDimensions = document.getElementById('info-dimensions');
    const infoFrames = document.getElementById('info-frames');
    const infoFps = document.getElementById('info-fps');

    // 패널 뷰 전환 요소
    const mainToolsView = document.getElementById('main-tools-view');
    const toolContainers = document.querySelectorAll('.tool-options-container');

    // 리사이즈 컨트롤 요소
    const resizeXNum = document.getElementById('resize-x-num');
    const resizeYNum = document.getElementById('resize-y-num');
    const resizeXSlider = document.getElementById('resize-x-slider');
    const resizeYSlider = document.getElementById('resize-y-slider');
    const btnAspectLock = document.getElementById('btn-aspect-lock');
    const lockIcon = document.getElementById('lock-icon');

    // 작업 상태 변수
    let currentObjectUrl = null;
    let aspectRatio = 1;
    let isAspectLocked = true;

    // --- 이벤트: 파일 업로드 처리 ---
    btnChoose.addEventListener('click', () => fileInput.click());
    btnChangeFile.addEventListener('click', () => changeFileInput.click());

    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    changeFileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    // 드래그 앤 드롭 이벤트
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });

    // 파일 처리 핵심 로직
    function handleFiles(files) {
        const file = files[0];
        if (!file || file.type !== 'image/gif') {
            alert('올바른 GIF 이미지 파일을 업로드해주세요.');
            return;
        }

        // 이전 사용한 ObjectURL 해제 (메모리 누수 방지)
        if (currentObjectUrl) {
            URL.revokeObjectURL(currentObjectUrl);
        }

        currentObjectUrl = URL.createObjectURL(file);

        // 이미지 프리뷰 및 다운로드 링크 업데이트
        gifPreview.src = currentObjectUrl;
        btnDownload.href = currentObjectUrl;
        btnDownload.download = file.name;

        // 용량 표시
        infoSize.textContent = formatBytes(file.size);

        // 이미지 메타데이터(가로, 세로) 추출
        const img = new Image();
        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            aspectRatio = height > 0 ? width / height : 1;

            infoDimensions.textContent = `${width} × ${height} px`;
            initResizeControls(width, height);
        };
        img.src = currentObjectUrl;

        // 메타데이터 가상 바인딩
        infoFrames.textContent = '감지됨 (~30)';
        infoFps.textContent = '15 fps';

        // 뷰 전환
        showMainTools();
        uploadContainer.style.display = 'none';
        editorContainer.style.display = 'flex';
    }

    // --- 도구 뷰 전환 함수 ---
    document.querySelectorAll('.btn-tool').forEach(btn => {
        btn.addEventListener('click', () => {
            const tool = btn.getAttribute('data-tool');
            showToolOptions(tool);
        });
    });

    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => {
            showMainTools();
        });
    });

    function showToolOptions(toolName) {
        mainToolsView.style.display = 'none';
        toolContainers.forEach(container => container.style.display = 'none');

        const target = document.getElementById(`${toolName}-options-view`);
        if (target) {
            target.style.display = 'flex';
        }
    }

    function showMainTools() {
        toolContainers.forEach(container => container.style.display = 'none');
        mainToolsView.style.display = 'block';
    }

    // --- 리사이즈 컨트롤 조작 ---
    function initResizeControls(width, height) {
        resizeXNum.value = width;
        resizeYNum.value = height;

        resizeXSlider.min = Math.max(1, Math.round(width * 0.1));
        resizeXSlider.max = width * 2;
        resizeXSlider.value = width;

        resizeYSlider.min = Math.max(1, Math.round(height * 0.1));
        resizeYSlider.max = height * 2;
        resizeYSlider.value = height;
    }

    // 비율 고정 토글
    btnAspectLock.addEventListener('click', () => {
        isAspectLocked = !isAspectLocked;
        btnAspectLock.classList.toggle('locked', isAspectLocked);
        lockIcon.className = isAspectLocked ? 'fa-solid fa-lock' : 'fa-solid fa-lock-open';
    });

    resizeXNum.addEventListener('input', () => updateWidth(parseInt(resizeXNum.value) || 1));
    resizeXSlider.addEventListener('input', () => updateWidth(parseInt(resizeXSlider.value)));

    resizeYNum.addEventListener('input', () => updateHeight(parseInt(resizeYNum.value) || 1));
    resizeYSlider.addEventListener('input', () => updateHeight(parseInt(resizeYSlider.value)));

    function updateWidth(newWidth) {
        resizeXNum.value = newWidth;
        resizeXSlider.value = newWidth;

        if (isAspectLocked && aspectRatio > 0) {
            const newHeight = Math.max(1, Math.round(newWidth / aspectRatio));
            resizeYNum.value = newHeight;
            resizeYSlider.value = newHeight;
        }
    }

    function updateHeight(newHeight) {
        resizeYNum.value = newHeight;
        resizeYSlider.value = newHeight;

        if (isAspectLocked && aspectRatio > 0) {
            const newWidth = Math.max(1, Math.round(newHeight * aspectRatio));
            resizeXNum.value = newWidth;
            resizeXSlider.value = newWidth;
        }
    }

    // --- 속도 슬라이더 바인딩 ---
    const speedSlider = document.getElementById('speed-slider');
    const speedValText = document.getElementById('speed-val-text');
    if (speedSlider && speedValText) {
        speedSlider.addEventListener('input', (e) => {
            speedValText.textContent = `${parseFloat(e.target.value).toFixed(2)}x`;
        });
    }

    // --- 자르기 채우기 옵션 선택 ---
    const cropFillRadios = document.querySelectorAll('input[name="crop-fill"]');
    const cropColorPicker = document.getElementById('crop-color-picker');
    cropFillRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            cropColorPicker.style.display = e.target.value === 'color' ? 'flex' : 'none';
        });
    });

    // --- 실행 버튼 공통 알림 ---
    document.querySelectorAll('.btn-go').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('GIF 처리를 진행합니다.');
        });
    });

    // --- 파일 용량 포맷 유틸리티 ---
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
});