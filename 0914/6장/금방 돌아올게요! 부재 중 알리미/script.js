// DOM 엘리먼트 참조
const setupView = document.getElementById('setup-view');
const awayView = document.getElementById('away-view');
const awayForm = document.getElementById('away-form');

const scheduleInput = document.getElementById('schedule-input');
const returnTimeInput = document.getElementById('return-time-input');
const noticeInput = document.getElementById('notice-input');

const dispSchedule = document.getElementById('disp-schedule');
const dispReturnTime = document.getElementById('disp-return-time');
const dispCountdown = document.getElementById('disp-countdown');
const dispNotice = document.getElementById('disp-notice');

const btnExit = document.getElementById('btn-exit');

let timerInterval = null;

// 페이지 로드시 기본 시간 설정 (현재 시간 + 30분)
window.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    returnTimeInput.value = `${hours}:${minutes}`;
});

// 폼 제출 핸들러 (확인 버튼 클릭)
awayForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const schedule = scheduleInput.value.trim();
    const returnTime = returnTimeInput.value;
    const notice = noticeInput.value.trim();

    if (!schedule || !returnTime) return;

    // 화면 데이터 설정
    dispSchedule.textContent = schedule;
    dispReturnTime.textContent = returnTime;
    dispNotice.textContent = notice || '감사합니다.';

    // 카운트다운 타이머 실행
    startTimer(returnTime);

    // 뷰 전환
    awayView.classList.remove('hidden');
});

// 타이머 시작 함수
function startTimer(targetTimeString) {
    if (timerInterval) clearInterval(timerInterval);

    function update() {
        const now = new Date();
        const [hours, minutes] = targetTimeString.split(':').map(Number);

        let targetDate = new Date();
        targetDate.setHours(hours, minutes, 0, 0);

        // 지정 시간이 이미 지났다면 다음날로 계산
        if (targetDate <= now) {
            targetDate.setDate(targetDate.getDate() + 1);
        }

        const diffMs = targetDate - now;

        if (diffMs <= 0) {
            dispCountdown.textContent = '00:00:00';
            dispCountdown.style.color = '#f43f5e'; // 시간이 지나면 빨간색
            return;
        }

        dispCountdown.style.color = '#f8fafc';

        const totalSec = Math.floor(diffMs / 1000);
        const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
        const s = String(totalSec % 60).padStart(2, '0');

        dispCountdown.textContent = `${h}:${m}:${s}`;
    }

    update();
    timerInterval = setInterval(update, 1000);
}

// 화면 종료 (설정 화면으로 복귀)
function stopAwayMode() {
    if (timerInterval) clearInterval(timerInterval);
    awayView.classList.add('hidden');
}

btnExit.addEventListener('click', stopAwayMode);

// Esc 키로 편리하게 화면 끄기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !awayView.classList.contains('hidden')) {
        stopAwayMode();
    }
});