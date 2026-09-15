document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const processContainer = document.getElementById("processContainer");
    const fileList = document.getElementById("fileList");

    // 7, 8. 29 FPS 제한 (프레임당 약 34.4ms 간격)
    const MAX_FPS = 29;
    const FRAME_INTERVAL = 1 / MAX_FPS;

    // 드래그 앤 드롭 이벤트
    ['dragenter', 'dragover'].forEach(name => {
        dropZone.addEventListener(name, (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(name => {
        dropZone.addEventListener(name, (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
        });
    });

    dropZone.addEventListener('drop', (e) => {
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        const videoFiles = Array.from(files).filter(f => f.type.startsWith("video/"));
        if (!videoFiles.length) {
            alert("비디오 파일만 업로드할 수 있습니다.");
            return;
        }

        processContainer.classList.add("active");
        videoFiles.forEach(file => {
            convertVideoToGif(file);
        });
    }

    // 6, 7. 비디오를 프레임으로 잘라 GIF로 변환하는 핵심 기능
    async function convertVideoToGif(file) {
        const fileId = "vid_" + Math.random().toString(36).substr(2, 9);

        // UI 생성
        const item = document.createElement("div");
        item.className = "file-item";
        item.id = fileId;
        item.innerHTML = `
      <video class="thumb-video" id="thumb_${fileId}" muted playsinline></video>
      <div class="item-info">
        <div class="item-title-row">
          <span class="item-name">${file.name}</span>
          <span class="item-status" id="status_${fileId}">비디오 로딩 중...</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" id="progress_${fileId}"></div>
        </div>
      </div>
      <button class="download-btn" id="btn_${fileId}" disabled>다운로드</button>
    `;
        fileList.prepend(item);

        const videoEl = document.getElementById(`thumb_${fileId}`);
        const statusText = document.getElementById(`status_${fileId}`);
        const progressBar = document.getElementById(`progress_${fileId}`);
        const downloadBtn = document.getElementById(`btn_${fileId}`);

        const fileUrl = URL.createObjectURL(file);
        videoEl.src = fileUrl;

        videoEl.onloadedmetadata = async () => {
            statusText.innerText = "프레임 추출 중 (29 FPS)...";

            // 캔버스 설정
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // 인코딩 속도를 극대화하기 위해 해상도 비율 조정 (최대 가로 480px 제한)
            const scale = Math.min(1, 480 / videoEl.videoWidth);
            canvas.width = Math.round(videoEl.videoWidth * scale);
            canvas.height = Math.round(videoEl.videoHeight * scale);

            // GIF 인코더 초기화
            const gif = new GIF({
                workers: 2,
                quality: 10,
                width: canvas.width,
                height: canvas.height,
                workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js'
            });

            const duration = videoEl.duration;
            let currentTime = 0;

            // 동영상에서 29 FPS 간격으로 프레임 캡처
            while (currentTime < duration) {
                videoEl.currentTime = currentTime;

                await new Promise((resolve) => {
                    videoEl.onseeked = resolve;
                });

                ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
                gif.addFrame(ctx, { copy: true, delay: FRAME_INTERVAL * 1000 });

                currentTime += FRAME_INTERVAL;

                // 프레임 추출 진행률 (전체 작업의 50% 비중)
                const extractProgress = Math.round((currentTime / duration) * 50);
                progressBar.style.width = `${extractProgress}%`;
                statusText.innerText = `프레임 추출 중 (${Math.min(100, extractProgress * 2)}%)`;
            }

            statusText.innerText = "GIF 인코딩 중...";

            // gif.js 인코딩 진행률 이벤트
            gif.on('progress', (p) => {
                const encodeProgress = 50 + Math.round(p * 50);
                progressBar.style.width = `${encodeProgress}%`;
                statusText.innerText = `GIF 생성 중 (${encodeProgress}%)`;
            });

            // 완료 시 다운로드 처리
            gif.on('finished', (blob) => {
                progressBar.style.width = "100%";
                statusText.innerText = "변환 완료";
                statusText.style.color = "#10b981";

                downloadBtn.classList.add("active");
                downloadBtn.disabled = false;

                const gifName = file.name.substring(0, file.name.lastIndexOf('.')) + '.gif';

                downloadBtn.addEventListener("click", () => {
                    const downloadUrl = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = gifName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(downloadUrl);
                });

                URL.revokeObjectURL(fileUrl);
            });

            // GIF 렌더링 시작
            gif.render();
        };
    }
});