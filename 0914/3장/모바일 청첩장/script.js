document.addEventListener("DOMContentLoaded", function () {
    // 1. 카운트다운 타이머
    const targetDate = new Date("2026-11-14T13:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("d-day").innerText = String(days).padStart(2, '0');
            document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
            document.getElementById("days-text").innerText = days;
        } else {
            document.getElementById("d-day").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            document.getElementById("days-text").innerText = "0";
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// 2. 갤러리 이미지 모달 열기/닫기
function openModal(src) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "flex";
    modalImg.src = src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// 3. 계좌번호 토글 기능
function toggleAcc(id) {
    const panel = document.getElementById(id);
    const button = panel.previousElementSibling;

    if (panel.style.display === "block") {
        panel.style.display = "none";
        button.classList.remove("active");
    } else {
        panel.style.display = "block";
        button.classList.add("active");
    }
}

// 4. 계좌번호 복사 기능
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("계좌번호가 복사되었습니다.");
    }).catch(() => {
        // 클립보드 API 미지원 환경 대비 Fallback
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("계좌번호가 복사되었습니다.");
    });
}