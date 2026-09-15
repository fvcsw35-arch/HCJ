// DOM 요소 참조
const bmiForm = document.getElementById('bmi-form');
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');

const resultSection = document.getElementById('result-section');
const bmiValueEl = document.getElementById('bmi-value');
const bmiStatusEl = document.getElementById('bmi-status');

// 목표 BMI 산출 카드 참조
const targetTargets = [90, 100, 110];

// BMI 계산공식: 체중(kg) / (키(m) * 키(m))
// 역산 공식: 목표 체중(kg) = 목표 BMI * (키(m) * 키(m))

bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
        alert('올바른 키와 몸무게를 입력해 주세요.');
        return;
    }

    const heightM = heightCm / 100;
    const currentBmi = weightKg / (heightM * heightM);

    // 1. 현재 BMI 출력
    bmiValueEl.textContent = currentBmi.toFixed(1);

    // 2. BMI 상태 뱃지 업데이트 (일반적인 한국 건강기준 참고)
    updateBmiStatus(currentBmi);

    // 3. 목표 BMI (90, 100, 110) 별 가감 계산
    targetTargets.forEach(targetBmi => {
        calculateTargetWeight(targetBmi, heightM, weightKg);
    });

    // 결과 창 표시
    resultSection.classList.remove('hidden');
});

// BMI 구간 뱃지 스타일 처리
function updateBmiStatus(bmi) {
    let statusText = '';
    let color = '#34d399';
    let bgColor = 'rgba(52, 211, 153, 0.2)';

    if (bmi < 18.5) {
        statusText = '저체중';
        color = '#38bdf8';
        bgColor = 'rgba(56, 189, 248, 0.2)';
    } else if (bmi < 23) {
        statusText = '정상 체중';
        color = '#34d399';
        bgColor = 'rgba(52, 211, 153, 0.2)';
    } else if (bmi < 25) {
        statusText = '비만 전단계 (과체중)';
        color = '#fbbf24';
        bgColor = 'rgba(251, 191, 36, 0.2)';
    } else if (bmi < 30) {
        statusText = '1단계 비만';
        color = '#fb923c';
        bgColor = 'rgba(251, 146, 60, 0.2)';
    } else {
        statusText = '고도 비만';
        color = '#fb7185';
        bgColor = 'rgba(251, 113, 133, 0.2)';
    }

    bmiStatusEl.textContent = statusText;
    bmiStatusEl.style.color = color;
    bmiStatusEl.style.backgroundColor = bgColor;
}

// 목표 BMI 및 증감 체중 계산 함수
function calculateTargetWeight(targetBmi, heightM, currentWeightKg) {
    // 목표 체중 = targetBmi * (m^2)
    const requiredWeightKg = targetBmi * (heightM * heightM);
    const weightDiffKg = requiredWeightKg - currentWeightKg;

    const targetWeightEl = document.getElementById(`target-weight-${targetBmi}`);
    const diffBoxEl = document.getElementById(`diff-box-${targetBmi}`);
    const diffTextEl = document.getElementById(`diff-text-${targetBmi}`);

    targetWeightEl.textContent = `${requiredWeightKg.toFixed(1)} kg`;

    const absDiff = Math.abs(weightDiffKg).toFixed(1);

    // 스타일 클래스 초기화
    diffBoxEl.className = 'diff-box';

    if (weightDiffKg < -0.05) {
        // 감량해야 함
        diffBoxEl.classList.add('lose');
        diffTextEl.innerHTML = `<i class="fa-solid fa-arrow-down"></i> ${absDiff} kg 감량 필요`;
    } else if (weightDiffKg > 0.05) {
        // 증량해야 함
        diffBoxEl.classList.add('gain');
        diffTextEl.innerHTML = `<i class="fa-solid fa-arrow-up"></i> ${absDiff} kg 증량 필요`;
    } else {
        // 동일
        diffBoxEl.classList.add('same');
        diffTextEl.innerHTML = `<i class="fa-solid fa-check"></i> 목표 체중과 동일`;
    }
}