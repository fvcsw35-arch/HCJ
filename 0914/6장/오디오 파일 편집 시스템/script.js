document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const workspace = document.getElementById('workspace');

    const fileNameEl = document.getElementById('file-name');
    const btnPlay = document.getElementById('btn-play');
    const timeDisplay = document.getElementById('time-display');
    const canvas = document.getElementById('waveform-canvas');
    const ctx = canvas.getContext('2d');

    const trimStartInput = document.getElementById('trim-start');
    const trimEndInput = document.getElementById('trim-end');
    const trimRangeText = document.getElementById('trim-range-text');

    const volumeRange = document.getElementById('volume-range');
    const volumeVal = document.getElementById('volume-val');
    const formatSelect = document.getElementById('format-select');
    const btnExport = document.getElementById('btn-export');

    // 오디오 컨텍스트 상태 관리
    let audioCtx = null;
    let audioBuffer = null;
    let currentSource = null;
    let isPlaying = false;
    let startTime = 0;
    let playbackAnimation = null;

    // 업로드 이벤트 핸들링
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            loadAudioFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            loadAudioFile(e.target.files[0]);
        }
    });

    // 오디오 디코딩 및 불러오기
    async function loadAudioFile(file) {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        fileNameEl.textContent = file.name;
        const arrayBuffer = await file.arrayBuffer();

        try {
            audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
            initWorkspace();
        } catch (err) {
            alert('오디오 파일을 불러올 수 없습니다. 올바른 포맷인지 확인해 주세요.');
        }
    }

    // 워크스페이스 초기화
    function initWorkspace() {
        workspace.classList.remove('hidden');
        const duration = audioBuffer.duration;

        trimStartInput.max = duration;
        trimEndInput.max = duration;
        trimStartInput.value = 0;
        trimEndInput.value = duration.toFixed(1);

        updateTrimText();
        drawWaveform();
        updateTimeDisplay(0, duration);
    }

    // 오디오 파형 그리기 (시각화)
    function drawWaveform() {
        const width = canvas.width;
        const height = canvas.height;
        const rawData = audioBuffer.getChannelData(0);
        const step = Math.ceil(rawData.length / width);
        const amp = height / 2;

        ctx.clearRect(0, 0, width, height);

        // 파형 배경 가이드라인
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);

        // 자르기 구간 하이라이트 계산
        const startRatio = parseFloat(trimStartInput.value) / audioBuffer.duration;
        const endRatio = parseFloat(trimEndInput.value) / audioBuffer.duration;

        const startX = startRatio * width;
        const endX = endRatio * width;

        // 선택 해제 영역 어둡게 처리
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, startX, height);
        ctx.fillRect(endX, 0, width - endX, height);

        // 파형 라인 그리기
        ctx.beginPath();
        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 1.5;

        for (let i = 0; i < width; i++) {
            let min = 1.0;
            let max = -1.0;

            for (let j = 0; j < step; j++) {
                const datum = rawData[i * step + j];
                if (datum < min) min = datum;
                if (datum > max) max = datum;
            }

            // 선택 영역 파형 강조
            if (i >= startX && i <= endX) {
                ctx.strokeStyle = '#a855f7';
            } else {
                ctx.strokeStyle = '#475569';
            }

            ctx.moveTo(i, (1 + min) * amp);
            ctx.lineTo(i, (1 + max) * amp);
        }
        ctx.stroke();
    }

    // 시간 컨트롤 업데이트
    function updateTrimText() {
        const start = parseFloat(trimStartInput.value).toFixed(1);
        const end = parseFloat(trimEndInput.value).toFixed(1);
        trimRangeText.textContent = `${start}초 ~ ${end}초`;
        drawWaveform();
    }

    trimStartInput.addEventListener('input', () => {
        if (parseFloat(trimStartInput.value) >= parseFloat(trimEndInput.value)) {
            trimStartInput.value = (parseFloat(trimEndInput.value) - 0.1).toFixed(1);
        }
        updateTrimText();
    });

    trimEndInput.addEventListener('input', () => {
        if (parseFloat(trimEndInput.value) <= parseFloat(trimStartInput.value)) {
            trimEndInput.value = (parseFloat(trimStartInput.value) + 0.1).toFixed(1);
        }
        updateTrimText();
    });

    volumeRange.addEventListener('input', (e) => {
        volumeVal.textContent = `${e.target.value}%`;
    });

    // 재생 및 일시정지 제어
    btnPlay.addEventListener('click', () => {
        if (isPlaying) {
            stopAudio();
        } else {
            playAudio();
        }
    });

    function playAudio() {
        if (!audioBuffer) return;

        const start = parseFloat(trimStartInput.value);
        const end = parseFloat(trimEndInput.value);
        const duration = end - start;

        currentSource = audioCtx.createBufferSource();
        currentSource.buffer = audioBuffer;

        // 볼륨 적용 노드 연결
        const gainNode = audioCtx.createGain();
        const volRatio = parseFloat(volumeRange.value) / 100;
        gainNode.gain.value = volRatio;

        currentSource.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        currentSource.start(0, start, duration);
        isPlaying = true;
        btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i> 정지';

        currentSource.onended = () => {
            stopAudio();
        };
    }

    function stopAudio() {
        if (currentSource) {
            currentSource.stop();
            currentSource.disconnect();
            currentSource = null;
        }
        isPlaying = false;
        btnPlay.innerHTML = '<i class="fa-solid fa-play"></i> 재생';
    }

    function updateTimeDisplay(current, total) {
        const formatSec = (s) => {
            const m = Math.floor(s / 60);
            const sec = Math.floor(s % 60);
            return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        };
        timeDisplay.textContent = `${formatSec(current)} / ${formatSec(total)}`;
    }

    // 내보내기 & 다운로드 (Web Audio API 버퍼 연산)
    btnExport.addEventListener('click', () => {
        if (!audioBuffer) return;

        const start = parseFloat(trimStartInput.value);
        const end = parseFloat(trimEndInput.value);
        const volume = parseFloat(volumeRange.value) / 100;
        const format = formatSelect.value;

        const sampleRate = audioBuffer.sampleRate;
        const channels = audioBuffer.numberOfChannels;
        const startFrame = Math.floor(start * sampleRate);
        const endFrame = Math.floor(end * sampleRate);
        const frameCount = endFrame - startFrame;

        // OfflineAudioContext를 이용한 가속 렌더링
        const offlineCtx = new OfflineAudioContext(channels, frameCount, sampleRate);
        const bufferSource = offlineCtx.createBufferSource();
        bufferSource.buffer = audioBuffer;

        const gainNode = offlineCtx.createGain();
        gainNode.gain.value = volume;

        bufferSource.connect(gainNode);
        gainNode.connect(offlineCtx.destination);

        bufferSource.start(0, start, end - start);

        offlineCtx.startRendering().then((renderedBuffer) => {
            // WAV 인코딩
            const wavBlob = bufferToWave(renderedBuffer, frameCount);
            const url = URL.createObjectURL(wavBlob);

            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `edited_audio.${format}`;
            anchor.click();
            URL.revokeObjectURL(url);
        });
    });

    // AudioBuffer를 WAV 파일 인코딩 함수
    function bufferToWave(abuffer, len) {
        const numOfChan = abuffer.numberOfChannels;
        const length = len * numOfChan * 2 + 44;
        const buffer = new ArrayBuffer(length);
        const view = new DataView(buffer);
        const channels = [];
        let sample = 0;
        let offset = 0;
        let pos = 0;

        function setUint16(data) {
            view.setUint16(pos, data, true);
            pos += 2;
        }

        function setUint32(data) {
            view.setUint32(pos, data, true);
            pos += 4;
        }

        // WAV 헤더 작성
        setUint32(0x46464952); // "RIFF"
        setUint32(length - 8);
        setUint32(0x45564157); // "WAVE"
        setUint32(0x20746d66); // "fmt " chunk
        setUint32(16);         // length = 16
        setUint16(1);          // PCM
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2); // block-align
        setUint16(16);         // 16-bit
        setUint32(0x61746164); // "data" chunk
        setUint32(length - pos - 4);

        for (let i = 0; i < abuffer.numberOfChannels; i++) {
            channels.push(abuffer.getChannelData(i));
        }

        while (offset < len) {
            for (let i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][offset]));
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++;
        }

        return new Blob([buffer], { type: 'audio/wav' });
    }
});