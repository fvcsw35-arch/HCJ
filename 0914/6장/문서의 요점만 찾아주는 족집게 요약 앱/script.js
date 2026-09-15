document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const sourceText = document.getElementById('source-text');
    const sentenceSlider = document.getElementById('sentence-slider');
    const sliderVal = document.getElementById('slider-val');
    const btnSummarize = document.getElementById('btn-summarize');
    const resultBox = document.getElementById('result-box');
    const statWords = document.getElementById('stat-words');
    const btnCopy = document.getElementById('btn-copy');

    // 슬라이더 레이블 실시간 반영
    sentenceSlider.addEventListener('input', (e) => {
        sliderVal.textContent = `${e.target.value}문장`;
    });

    // 파일 업로드 (드래그 앤 드롭 및 클릭)
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            sourceText.value = e.target.result;
            updateWordCount(e.target.result);
        };
        reader.readAsText(file, 'utf-8');
    }

    sourceText.addEventListener('input', (e) => {
        updateWordCount(e.target.value);
    });

    function updateWordCount(text) {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        statWords.textContent = words;
    }

    // --- TextRank 알고리즘 순수 구현 로직 ---
    function textRankSummarize(text, topN) {
        // 1. 문장 단위 분리 (마침표, 물음표, 느낌표 기준)
        let sentences = text.match(/[^.!?\n]+[.!?\n]+/g) || text.split('\n').filter(s => s.trim().length > 0);
        sentences = sentences.map(s => s.trim()).filter(s => s.length > 5);

        if (sentences.length === 0) return [];
        if (sentences.length <= topN) return sentences;

        // 2. 간단한 형태소/단어 분할 및 유사도 계산을 위한 토큰화
        const tokenizedSentences = sentences.map(sentence => {
            return sentence.toLowerCase().replace(/[^가-힣a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 1);
        });

        // 3. 문장 간 코사인 유사도(또는 단어 겹침 공통점) 행렬 생성
        const graph = Array(sentences.length).fill(0).map(() => Array(sentences.length).fill(0));

        for (let i = 0; i < sentences.length; i++) {
            for (let j = 0; j < sentences.length; j++) {
                if (i === j) continue;
                const setA = new Set(tokenizedSentences[i]);
                const setB = new Set(tokenizedSentences[j]);

                let intersection = 0;
                setA.forEach(word => { if (setB.has(word)) intersection++; });

                const logA = Math.log(setA.size || 1);
                const logB = Math.log(setB.size || 1);

                if (logA + logB > 0) {
                    graph[i][j] = intersection / (logA + logB);
                }
            }
        }

        // 4. 페이지랭크(PageRank) 반복 연산 수행
        let scores = Array(sentences.length).fill(1.0);
        const damping = 0.85;
        const maxIterations = 50;

        for (iter = 0; iter < maxIterations; iter++) {
            let newScores = Array(sentences.length).fill(1 - damping);
            for (let i = 0; i < sentences.length; i++) {
                for (let j = 0; j < sentences.length; j++) {
                    if (i === j || graph[j][i] === 0) continue;
                    let sumOut = 0;
                    for (let k = 0; k < sentences.length; k++) {
                        sumOut += graph[j][k];
                    }
                    if (sumOut > 0) {
                        newScores[i] += damping * (graph[j][i] / sumOut) * scores[j];
                    }
                }
            }
            scores = newScores;
        }

        // 5. 점수가 높은 상위 N개의 문장을 원래 문서 순서대로 정렬하여 추출
        const indexedScores = scores.map((score, index) => ({ score, index, sentence: sentences[index] }));
        indexedScores.sort((a, b) => b.score - a.score);

        const topSentences = indexedScores.slice(0, topN);
        // 원본 문서의 흐름(인덱스 순서)을 유지하기 위해 정렬
        topSentences.sort((a, b) => a.index - b.index);

        return topSentences.map(item => item.sentence);
    }

    // 요약 실행 버튼 이벤트
    btnSummarize.addEventListener('click', () => {
        const content = sourceText.value;
        const targetCount = parseInt(sentenceSlider.value);

        if (!content.trim()) {
            alert('요약할 텍스트를 입력하거나 파일을 업로드해 주세요.');
            return;
        }

        const summaryResults = textRankSummarize(content, targetCount);

        resultBox.innerHTML = '';
        summaryResults.forEach((sent, idx) => {
            const item = document.createElement('div');
            item.className = 'summary-item';
            item.innerHTML = `<b>0${idx + 1}.</b> ${sent}`;
            resultBox.appendChild(item);
        });
    });

    // 클립보드 복사 기능
    btnCopy.addEventListener('click', () => {
        const items = resultBox.querySelectorAll('.summary-item');
        if (items.length === 0) {
            alert('복사할 요약 내용이 없습니다.');
            return;
        }
        const textToCopy = Array.from(items).map(el => el.textContent).join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('요약 결과가 클립보드에 복사되었습니다.');
        });
    });
});