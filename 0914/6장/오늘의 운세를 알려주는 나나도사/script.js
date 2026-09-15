// 1. 운세 데이터셋 (속성별 운세문구 목록)
const fortuneDatabase = {
    fire: {
        name: "불 (Fire)",
        badge: "🔥 불의 기운",
        color: "#ff512f",
        fortunes: [
            "열정이 도화선이 되는 날입니다. 미뤄뒀던 프로젝트를 오늘 당장 시작하세요!",
            "주변 사람들에게 강력한 리더십을 발휘할 수 있습니다. 확신을 갖고 행동하세요.",
            "감정이 과해져 실수를 할 수도 있으니, 중요한 결정 전에는 세 번 숨을 쉬세요."
        ]
    },
    water: {
        name: "물 (Water)",
        badge: "💧 물의 기운",
        color: "#a1c4fd",
        fortunes: [
            "유연성이 빛을 발하는 날입니다. 장애물이 생겨도 자연스럽게 우회하여 해결됩니다.",
            "지혜롭고 통찰력이 뛰어난 하루입니다. 직감을 믿고 복잡한 문제를 풀어보세요.",
            "감정의 파도가 크게 칠 수 있으니 편안한 음악과 차 한 잔으로 마음을 다스리세요."
        ]
    },
    wood: {
        name: "나무 (Wood)",
        badge: "🌲 나무의 기운",
        color: "#2ecc71",
        fortunes: [
            "꾸준히 노력했던 일들이 싹을 틔우기 시작합니다. 성장의 결실을 맺을 시간입니다.",
            "새로운 아이디어가 무성하게 가지를 치는 날입니다. 생각을 노트에 기록해 두세요.",
            "고집을 부리면 가지가 부러질 수 있으니, 타인의 지혜에도 귀를 기울이세요."
        ]
    },
    earth: {
        name: "땅 (Earth)",
        badge: "⛰️ 땅의 기운",
        color: "#f27121",
        fortunes: [
            "단단하고 흔들리지 않는 안정감이 함께합니다. 금전운과 계약운이 특히 좋습니다.",
            "신뢰를 얻는 하루입니다. 주변 사람들이 당신의 든든한 모습에 감동받게 됩니다.",
            "지나친 신중함으로 좋은 기회를 놓칠 수 있으니 가끔은 과감하게 발을 내딛으세요."
        ]
    },
    wind: {
        name: "바람 (Wind)",
        badge: "🌪️ 바람의 기운",
        color: "#7579ff",
        fortunes: [
            "새롭고 경쾌한 변화의 바람이 불어옵니다. 예기치 못한 반가운 소식이 찾아옵니다.",
            "소통과 대화가 술술 풀리는 날입니다. 연락이 끊겼던 사람에게 먼지 먼저 다가가 보세요.",
            "산만해지기 쉬운 기운입니다. 오늘 해야 할 핵심 목표 1가지에 집중하세요."
        ]
    }
};

const luckyColors = ["베이비 핑크", "스카이 블루", "라벤더", "네온 옐로우", "에메랄드 그린", "미드나잇 블루", "민트"];

// 2. DOM 요소 연결
const formCard = document.getElementById("form-card");
const resultCard = document.getElementById("result-card");
const fortuneForm = document.getElementById("fortune-form");
const elementBtns = document.querySelectorAll(".btn-element");
const retryBtn = document.getElementById("btn-retry");

let selectedElement = null;

// 3. 속성 버튼 선택 이벤트
elementBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        elementBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedElement = btn.dataset.element;
    });
});

// 기본값으로 첫 번째(불) 선택
elementBtns[0].click();

// 4. 폼 제출 시 랜덤 운세 생성
fortuneForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("user-name").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked').value;

    if (!selectedElement) {
        alert("오늘의 속성을 선택해 주세요!");
        return;
    }

    // 데이터 뽑기
    const elementData = fortuneDatabase[selectedElement];
    const randomScore = Math.floor(Math.random() * 31) + 70; // 70 ~ 100점 사이
    const randomFortuneIndex = Math.floor(Math.random() * elementData.fortunes.length);
    const randomDetail = elementData.fortunes[randomFortuneIndex];
    const randomColor = luckyColors[Math.floor(Math.random() * luckyColors.length)];
    const randomNumber = Math.floor(Math.random() * 9) + 1;

    // 결과 UI 출력
    document.getElementById("res-badge").textContent = elementData.badge;
    document.getElementById("res-name").textContent = `${name}님의 오늘 운세`;
    document.getElementById("res-score").textContent = `${randomScore}점`;
    document.getElementById("res-summary").textContent = `"${elementData.name} 기운을 선택한 ${gender} ${name}님!"`;
    document.getElementById("res-detail").textContent = randomDetail;
    document.getElementById("res-color").textContent = randomColor;
    document.getElementById("res-number").textContent = randomNumber;

    // 화면 전환
    formCard.style.display = "none";
    resultCard.style.display = "flex";
});

// 5. 다시 하기 버튼
retryBtn.addEventListener("click", () => {
    resultCard.style.display = "none";
    formCard.style.display = "block";
});