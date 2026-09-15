document.addEventListener("DOMContentLoaded", () => {
  const qrForm = document.getElementById("qrForm");
  const urlInput = document.getElementById("urlInput");
  const qrSection = document.getElementById("qrSection");
  const qrcodeContainer = document.getElementById("qrcode");
  const glassCard = document.getElementById("glassCard");
  const cursorGlow = document.getElementById("cursorGlow");

  // 1. 마우스 추적 커서 빛 무리 & 3D Tilt 인터랙션
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // 커서 glow 움직임
    cursorGlow.style.left = `${x}px`;
    cursorGlow.style.top = `${y}px`;

    // 3D 카드 패럴랙스 기울임
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const rotateX = ((y / windowHeight) - 0.5) * -15;
    const rotateY = ((x / windowWidth) - 0.5) * 15;

    glassCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    glassCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });

  // 2. QR 코드 생성 로직
  qrForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let url = urlInput.value.trim();
    if (!url) return;

    // 프로토콜(http/https) 자동 삽입 보정
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    if (typeof QRCode === "undefined") {
      alert("QR 라이브러리를 불러오지 못했습니다. 인터넷 연결 상태를 확인해 주세요.");
      return;
    }

    qrcodeContainer.innerHTML = "";

    try {
      new QRCode(qrcodeContainer, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#0f0c1b",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      qrSection.classList.add("active");
    } catch (err) {
      console.error("QR 코드 생성 오류:", err);
      alert("QR 코드를 생성하는 데 실패했습니다.");
    }
  });

  // 3. QR 코드 클릭 시 JPG 고화질 다운로드
  qrcodeContainer.addEventListener("click", () => {
    const canvasElement = qrcodeContainer.querySelector("canvas");
    const imgElement = qrcodeContainer.querySelector("img");

    if (canvasElement) {
      downloadCanvasAsJpg(canvasElement);
    } else if (imgElement && imgElement.src) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);

        downloadCanvasAsJpg(canvas);
      };
      image.src = imgElement.src;
    }
  });

  function downloadCanvasAsJpg(canvas) {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext("2d");

    // JPG 배경 흰색 처리
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    const jpgUrl = tempCanvas.toDataURL("image/jpeg", 1.0);

    const link = document.createElement("a");
    link.href = jpgUrl;
    link.download = "smart_qr.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});