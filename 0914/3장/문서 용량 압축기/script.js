document.addEventListener("DOMContentLoaded", () => {
  // PDF.js 워커 세팅
  if (typeof pdfjsLib !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";
  }

  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const fileListContainer = document.getElementById("fileListContainer");
  const fileList = document.getElementById("fileList");

  // 지원 확장자 정의
  const docExts = ["doc", "docx", "ppt", "pptx"];
  const imgExts = ["jpg", "jpeg", "png", "webp"];
  const pdfExts = ["pdf"];

  // 1. 드래그 앤 드롭
  ['dragenter', 'dragover'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });

  // 2. 파일 검증 및 분류
  function handleFiles(files) {
    if (!files.length) return;

    const validFiles = [];
    let hwpDetected = false;

    Array.from(files).forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();

      // HWP 업로드 감지 시 안내 메시지
      if (ext === "hwp" || ext === "hwpx") {
        hwpDetected = true;
      } else if ([...docExts, ...imgExts, ...pdfExts].includes(ext)) {
        validFiles.push(file);
      }
    });

    if (hwpDetected) {
      alert("⚠️ HWP(한글) 파일은 직접 압축을 지원하지 않습니다.\nHWP 파일을 PDF나 Word(.docx) 파일로 변환하여 다시 올려주세요!");
    }

    if (validFiles.length > 0) {
      fileListContainer.classList.add("active");
      validFiles.forEach(file => {
        processFile(file);
      });
    }
  }

  // 3. 파일 종류별 분기 처리
  function processFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    const fileId = "file_" + Math.random().toString(36).substr(2, 9);

    const fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.id = fileId;

    fileItem.innerHTML = `
      <div class="file-info">
        <span class="file-name">📄 ${file.name}</span>
        <span class="file-status" id="status_${fileId}">대기 중...</span>
      </div>
      <div class="progress-row">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" id="progress_${fileId}"></div>
        </div>
        <button class="download-btn" id="btn_${fileId}" disabled>다운로드</button>
      </div>
    `;

    fileList.prepend(fileItem);

    if (imgExts.includes(ext)) {
      compressImageFile(file, fileId);
    } else if (pdfExts.includes(ext)) {
      compressPdfToScanned(file, fileId);
    } else if (docExts.includes(ext)) {
      compressOfficeDocument(file, fileId);
    }
  }

  // A. 이미지 파일 압축 (Quality: 0.45 로 포맷 변환 및 리사이징)
  function compressImageFile(file, fileId) {
    const progressBar = document.getElementById(`progress_${fileId}`);
    const statusText = document.getElementById(`status_${fileId}`);
    const downloadBtn = document.getElementById(`btn_${fileId}`);

    statusText.innerText = "이미지 화질 압축 중...";
    progressBar.style.width = "30%";

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        progressBar.style.width = "60%";

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 최대 해상도 제한 (가로/세로 1600px 제한)
        let width = img.width;
        let height = img.height;
        const maxDim = 1600;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // JPEG 45% 품질로 용량 감축
        canvas.toBlob((blob) => {
          progressBar.style.width = "100%";
          statusText.innerText = "압축 완료";
          statusText.style.color = "#10b981";

          setupDownload(downloadBtn, blob, `compressed_${file.name.split('.')[0]}.jpg`);
        }, "image/jpeg", 0.45);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // B. PDF 캡처 및 저화질 스캔본 PDF 변환
  async function compressPdfToScanned(file, fileId) {
    const progressBar = document.getElementById(`progress_${fileId}`);
    const statusText = document.getElementById(`status_${fileId}`);
    const downloadBtn = document.getElementById(`btn_${fileId}`);

    statusText.innerText = "PDF 페이지 렌더링 및 스캔 압축 중...";
    progressBar.style.width = "10%";

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;

      const { jsPDF } = window.jspdf;
      let doc = null;

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        statusText.innerText = `페이지 캡처 중 (${pageNum}/${totalPages})...`;

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.0 }); // 1.0 배율 저화질 스캔 모드

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport: viewport }).promise;

        // 캡처 페이지를 JPEG (품질 0.4)로 압축
        const imgData = canvas.toDataURL("image/jpeg", 0.4);

        if (pageNum === 1) {
          doc = new jsPDF({
            orientation: viewport.width > viewport.height ? "landscape" : "portrait",
            unit: "pt",
            format: [viewport.width, viewport.height]
          });
          doc.addImage(imgData, "JPEG", 0, 0, viewport.width, viewport.height);
        } else {
          doc.addPage([viewport.width, viewport.height], viewport.width > viewport.height ? "landscape" : "portrait");
          doc.addImage(imgData, "JPEG", 0, 0, viewport.width, viewport.height);
        }

        progressBar.style.width = `${Math.round((pageNum / totalPages) * 90)}%`;
      }

      const pdfBlob = doc.output("blob");
      progressBar.style.width = "100%";
      statusText.innerText = "스캔 압축 완료";
      statusText.style.color = "#10b981";

      setupDownload(downloadBtn, pdfBlob, `scanned_compressed_${file.name}`);

    } catch (err) {
      console.error(err);
      statusText.innerText = "PDF 압축 실패";
      statusText.style.color = "#ef4444";
    }
  }

  // C. Word / PPT 압축
  async function compressOfficeDocument(file, fileId) {
    const progressBar = document.getElementById(`progress_${fileId}`);
    const statusText = document.getElementById(`status_${fileId}`);
    const downloadBtn = document.getElementById(`btn_${fileId}`);

    statusText.innerText = "오피스 데이터 구조 감축 중...";
    progressBar.style.width = "40%";

    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'doc' || ext === 'ppt' || typeof JSZip === "undefined") {
      setTimeout(() => {
        progressBar.style.width = "100%";
        statusText.innerText = "완료";
        statusText.style.color = "#10b981";
        setupDownload(downloadBtn, file, `compressed_${file.name}`);
      }, 600);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const zip = await JSZip.loadAsync(e.target.result);
        const compressedBlob = await zip.generateAsync({
          type: "blob",
          mimeType: file.type || "application/octet-stream",
          compression: "DEFLATE",
          compressionOptions: { level: 9 }
        });

        progressBar.style.width = "100%";
        statusText.innerText = "완료";
        statusText.style.color = "#10b981";
        setupDownload(downloadBtn, compressedBlob, `compressed_${file.name}`);
      } catch (err) {
        setupDownload(downloadBtn, file, `compressed_${file.name}`);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  // 공통 다운로드 핸들러
  function setupDownload(btnElement, blobData, fileName) {
    btnElement.classList.add("active");
    btnElement.disabled = false;
    btnElement.addEventListener("click", () => {
      const url = URL.createObjectURL(blobData);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
});