document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pinball-canvas');
    const ctx = canvas.getContext('2d');

    const nameInput = document.getElementById('name-input');
    const btnStart = document.getElementById('btn-start');
    const winnerOverlay = document.getElementById('winner-overlay');
    const winnerNameEl = document.getElementById('winner-name');
    const btnReset = document.getElementById('btn-reset');

    const PALETTE = ['#f43f5e', '#a855f7', '#6366f1', '#38bdf8', '#34d399', '#fbbf24', '#fb923c'];

    let pegs = [];
    let marbles = [];
    let animFrameId = null;
    let isRunning = false;

    const GRAVITY = 0.15;
    const RESTITUTION = 0.5;

    // 핀(장애물) 생성
    function initPegs() {
        pegs = [];
        const rows = 9;
        const startY = 120;
        const spacingY = 50;

        for (let r = 0; r < rows; r++) {
            const isOdd = r % 2 === 1;
            const cols = isOdd ? 7 : 8;
            const spacingX = canvas.width / (cols + 1);

            for (let c = 0; c < cols; c++) {
                pegs.push({
                    x: (c + 1) * spacingX,
                    y: startY + r * spacingY,
                    r: 6
                });
            }
        }
    }

    // 구슬 클래스
    class Marble {
        constructor(name, index, total) {
            this.name = name;
            this.r = 12;
            this.x = (canvas.width / (total + 1)) * (index + 1) + (Math.random() * 20 - 10);
            this.y = 30 + Math.random() * 20;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = Math.random() * 2;
            this.color = PALETTE[index % PALETTE.length];
            this.finished = false;
            this.finishTime = null;
        }

        update() {
            if (this.finished) return;

            this.vy += GRAVITY;
            this.x += this.vx;
            this.y += this.vy;

            // 벽면 충돌
            if (this.x - this.r < 0) {
                this.x = this.r;
                this.vx *= -RESTITUTION;
            } else if (this.x + this.r > canvas.width) {
                this.x = canvas.width - this.r;
                this.vx *= -RESTITUTION;
            }

            // 핀 충돌
            pegs.forEach(peg => {
                const dx = this.x - peg.x;
                const dy = this.y - peg.y;
                const dist = Math.hypot(dx, dy);

                if (dist < this.r + peg.r) {
                    const angle = Math.atan2(dy, dx);
                    const overlap = (this.r + peg.r) - dist;

                    this.x += Math.cos(angle) * overlap;
                    this.y += Math.sin(angle) * overlap;

                    const speed = Math.hypot(this.vx, this.vy) * RESTITUTION;
                    const randomOffset = (Math.random() - 0.5) * 0.4;
                    this.vx = Math.cos(angle + randomOffset) * speed;
                    this.vy = Math.sin(angle + randomOffset) * speed;
                }
            });

            // 바닥 도착 판단
            if (this.y + this.r >= canvas.height - 30) {
                this.y = canvas.height - 30 - this.r;
                this.finished = true;
                this.finishTime = Date.now();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(this.name.substring(0, 4), this.x, this.y - this.r - 4);
        }
    }

    // 화면 그리기 루프
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 배경 처리
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 핀 그리기
        pegs.forEach(peg => {
            ctx.beginPath();
            ctx.arc(peg.x, peg.y, peg.r, 0, Math.PI * 2);
            ctx.fillStyle = '#475569';
            ctx.fill();
        });

        // 바닥 라인
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 30);
        ctx.lineTo(canvas.width, canvas.height - 30);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();

        let allFinished = true;

        marbles.forEach(m => {
            if (isRunning) m.update();
            m.draw();
            if (!m.finished) allFinished = false;
        });

        if (isRunning && allFinished && marbles.length > 0) {
            const lastMarble = [...marbles].sort((a, b) => b.finishTime - a.finishTime)[0];

            setTimeout(() => {
                showWinner(lastMarble.name);
            }, 500);

            isRunning = false;
        }

        animFrameId = requestAnimationFrame(render);
    }

    function startLottery() {
        const rawNames = nameInput.value.split(/[\n,]/).map(n => n.trim()).filter(n => n.length > 0);

        if (rawNames.length === 0) {
            alert('최소 1명 이상의 참가자 이름을 입력해 주세요.');
            return;
        }

        winnerOverlay.classList.add('hidden');
        initPegs();

        marbles = rawNames.map((name, idx) => new Marble(name, idx, rawNames.length));
        isRunning = true;
    }

    function showWinner(name) {
        winnerNameEl.textContent = name;
        winnerOverlay.classList.remove('hidden');
    }

    btnStart.addEventListener('click', startLottery);
    btnReset.addEventListener('click', () => {
        winnerOverlay.classList.add('hidden');
    });

    // 초기화 및 첫 렌더링 시작
    initPegs();
    render();
});