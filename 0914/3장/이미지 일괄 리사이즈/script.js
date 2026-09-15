document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const ratioBtns = document.querySelectorAll(".ratio-btn");
    const customRatioInputs = document.getElementById("customRatioInputs");
    const customWidthInput = document.getElementById("customWidth");
    const customHeightInput = document.getElementById("customHeight");
    const modeRadios = document.querySelectorAll("input[name='resizeMode']");
    const colorPickerGroup = document.getElementById("colorPickerGroup");
    const bgColorInput = document.getElementById("bgColor");
    const processContainer = document.getElementById("processContainer");
    const fileList = document.getElementById("fileList");
    const downloadAllBtn = document.getElementById("downloadAllBtn");

    let selectedRatio = "1:1";
    let processedFiles = [];

    // 1. 비율 선택 조작
    ratioBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            ratioBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedRatio = btn.dataset.ratio;

            if (selectedRatio === "custom") {
                customRatioInputs.classList.add("active");
            } else {
                customRatioInputs.classList.remove("active");
            }
        });
    });

    // 2. Padding/Crop 옵션 전환 조작
    modeRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            if (e.target.value === "padding") {
                colorPickerGroup.classList.add("active");
            } else {
                colorPickerGroup.classList.remove("active");
            }
        });
    });

    // 3. 드래그 앤 드롭 업로드
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
        const images = Array.from(files).filter(f => f.type.startsWith("image/"));
        if (!images.length) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        }

        processContainer.classList.add("active");
        processedFiles = [];
        checkAllComplete();

        images.forEach(file => {
            processSingleImage(file, images.length);
        });
    }

    // 4. 개별 이미지 처리 및 Canvas 리사이징
    function processSingleImage(file, totalCount) {
        const fileId = "img_" + Math.random().toString(36).substr(2, 9);

        // UI 생성
        const item = document.createElement("div");
        item.className = "file-item";
        item.innerHTML = `
      <img src="" class="thumb-img" id="thumb_${fileId}" alt="thumb">
      <div class="item-info">
        <div class="item-title-row">
          <span class="item-name">${file.name}</span>
          <span class="item-status" id="status_${fileId}">0%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" id="progress_${fileId}"></div>
        </div>
      </div>
      <button class="single-download-btn" id="btn_${fileId}" disabled>다운로드</button>
    `;
        fileList.prepend(item);

        const thumbImg = document.getElementById(`thumb_${fileId}`);
        const statusText = document.getElementById(`status_${fileId}`);
        const progressBar = document.getElementById(`progress_${fileId}`);
        const downloadBtn = document.getElementById(`btn_${fileId}`);

        // 원본 미리보기 생성
        const reader = new FileReader();
        reader.onload = (e) => {
            thumbImg.src = e.target.result;

            const img = new Image();
            img.onload = () => {
                // 프로그레스바 증가 시뮬레이션 인터벌
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.floor(Math.random() * 20) + 10;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);

                        // Canvas 실제 변환
                        const resizedBlob = renderResizedCanvas(img);

                        statusText.innerText = "완료";
                        statusText.style.color = "#10b981";
                        downloadBtn.classList.add("active");
                        downloadBtn.disabled = false;

                        // 개별 다운로드
                        downloadBtn.addEventListener("click", () => {
                            const url = URL.createObjectURL(resizedBlob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `resized_${file.name}`;
                            a.click();
                            URL.revokeObjectURL(url);
                        });

                        // 전체 일괄 다운로드용 배열 저장
                        processedFiles.push({ name: `resized_${file.name}`, blob: resizedBlob });
                        checkAllComplete(totalCount);
                    }
                    progressBar.style.width = `${progress}%`;
                    statusText.innerText = `${progress}%`;
                }, 80);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // 5. 종횡비 계산 및 Canvas 렌더링 (Padding vs Crop)
    function renderResizedCanvas(img) {
        let targetRatioWidth = 1;
        let targetRatioHeight = 1;

        if (selectedRatio === "custom") {
            targetRatioWidth = parseFloat(customWidthInput.value) || 1;
            targetRatioHeight = parseFloat(customHeightInput.value) || 1;
        } else {
            const [w, h] = selectedRatio.split(":").map(Number);
            targetRatioWidth = w;
            targetRatioHeight = h;
        }

        const targetRatio = targetRatioWidth / targetRatioHeight;
        const mode = document.querySelector("input[name='resizeMode']:checked").value;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 기본 출력 캔버스 해상도 결정
        const baseDimension = 1200;
        if (targetRatio >= 1) {
            canvas.width = baseDimension;
            canvas.height = Math.round(baseDimension / targetRatio);
        } else {
            canvas.height = baseDimension;
            canvas.width = Math.round(baseDimension * targetRatio);
        }

        if (mode === "padding") {
            // Padding 모드: 여백 채우기
            ctx.fillStyle = bgColorInput.value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const imgRatio = img.width / img.height;
            let drawW, drawH, drawX, drawY;

            if (imgRatio > targetRatio) {
                drawW = canvas.width;
                drawH = canvas.width / imgRatio;
                drawX = 0;
                drawY = (canvas.height - drawH) / 2;
            } else {
                drawH = canvas.height;
                drawW = canvas.height * imgRatio;
                drawX = (canvas.width - drawW) / 2;
                drawY = 0;
            }
            ctx.drawImage(img, drawX, drawY, drawW, drawH);

        } else {
            // Crop 모드: 중앙 기준 자르기
            const imgRatio = img.width / img.height;
            let srcX = 0, srcY = 0, srcW = img.width, srcH = img.height;

            if (imgRatio > targetRatio) {
                srcW = img.height * targetRatio;
                srcX = (img.width - srcW) / 2;
            } else {
                srcH = img.width / targetRatio;
                srcY = (img.height - srcH) / 2;
            }
            ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, canvas.width, canvas.height);
        }

        // Canvas -> Blob 변환 (JPEG 90% 품질)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    // 6. 모든 이미지 작업 완료 확인 및 ZIP 압축 설정
    function checkAllComplete(totalCount) {
        if (processedFiles.length > 0 && processedFiles.length === totalCount) {
            downloadAllBtn.classList.add("active");
            downloadAllBtn.disabled = false;
        } else {
            downloadAllBtn.classList.remove("active");
            downloadAllBtn.disabled = true;
        }
    }

    // 7. 일괄 ZIP 다운로드
    downloadAllBtn.addEventListener("click", async () => {
        if (processedFiles.length === 0 || typeof JSZip === "undefined") return;

        const zip = new JSZip();
        processedFiles.forEach(item => {
            zip.file(item.name, item.blob);
        });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resized_images.zip";
        a.click();
        URL.revokeObjectURL(url);
    });
});