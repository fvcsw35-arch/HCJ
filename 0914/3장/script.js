document.addEventListener('DOMContentLoaded', () => {
    // 1. D-Day 설정 (2026년 11월 14일 13:00)
    const WEDDING_DATE = new Date(2026, 10, 14, 13, 0, 0);

    // 2. 카운트다운 Logic
    const pad = (n) => String(n).padStart(2, '0');

    function updateCountdown() {
        const now = new Date();
        const diff = WEDDING_DATE - now;

        if (diff <= 0) {
            document.getElementById('cd-msg').innerHTML = '두 사람이 <b>부부</b>가 되었습니다 ♥';
            ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach(id => {
                document.getElementById(id).textContent = '00';
            });
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('cd-d').textContent = pad(days);
        document.getElementById('cd-h').textContent = pad(hours);
        document.getElementById('cd-m').textContent = pad(minutes);
        document.getElementById('cd-s').textContent = pad(seconds);

        document.getElementById('cd-days-text').textContent = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 3. 달력 자동 생성
    (function renderCalendar() {
        const y = WEDDING_DATE.getFullYear();
        const m = WEDDING_DATE.getMonth();
        const d = WEDDING_DATE.getDate();

        const firstDay = new Date(y, m, 1).getDay();
        const lastDate = new Date(y, m + 1, 0).getDate();

        let html = '<tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr><tr>';

        for (let i = 0; i < firstDay; i++) {
            html += '<td></td>';
        }

        for (let day = 1; day <= lastDate; day++) {
            const dow = (firstDay + day - 1) % 7;
            const isDday = day === d ? 'dday' : '';
            html += `<td class="${isDday}"><span>${day}</span></td>`;

            if (dow === 6 && day < lastDate) {
                html += '</tr><tr>';
            }
        }
        html += '</tr>';
        document.getElementById('calendar').innerHTML = html;
    })();

    // 4. Scroll Reveal 애니메이션
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('on');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. 갤러리 라이트박스
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbClose = document.getElementById('lb-close');

    document.querySelectorAll('.shot').forEach(shot => {
        shot.addEventListener('click', () => {
            const img = shot.querySelector('img');
            if (img.dataset.broken) return;

            lbImg.src = shot.dataset.src;
            lightbox.classList.add('open');
        });
    });

    lbClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('open');
    });

    // 6. 계좌 아코디언 토글
    document.querySelectorAll('.acc-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const panel = document.getElementById(targetId);

            btn.classList.toggle('open');
            panel.classList.toggle('open');
        });
    });

    // 7. 계좌번호 복사 기능
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const accountText = btn.dataset.account;

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(accountText).then(showToast);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = accountText;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast();
                } catch (err) {
                    console.error('복사 실패', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });

    function showToast() {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
});

// 이미지 로드 실패 시 대체
function phFix(img, label) {
    img.dataset.broken = '1';
    img.style.display = 'none';
    const parent = img.parentElement;
    parent.style.cssText += 'display:flex;align-items:center;justify-content:center;background:#F4EFE6;padding:10px;';
    parent.innerHTML += `<div style="font-size:11px;color:#9A937F;line-height:1.6;text-align:center"><i class="fa-regular fa-image" style="font-size:18px;margin-bottom:4px"></i><br>${label}</div>`;
}