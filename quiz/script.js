const quizData = [
    {
        question: "У какой страны есть фактическая и официальная столица?",
        a: "Россия",
        b: "Босния и Герцеговина",
        c: "Израиль",
        d: "Индия",
        correct: "c"
    },
    {
        question: "Кто крупнейший производитель солнечной энергии в мире?",
        a: "Германия",
        b: "Индия",
        c: "Китай",
        d: "Катар",
        correct: "c"
    },
    {
        question: "Аэропорт какой страны стал первым, полностью работающим на солнечной энергии?",
        a: "Индии",
        b: "ОАЭ",
        c: "Китая",
        d: "Испании",
        correct: "a"
    },
    {
        question: "Сколько процентов еды выбрасывается во всем мире?",
        a: "20-30",
        b: "30-40",
        c: "40-50",
        d: "50-60",
        correct: "b"
    },
    {
        question: "В какой стране количество электромобилей больше чем автомобилей с ДВС?",
        a: "Китай",
        b: "Германия",
        c: "США",
        d: "Норвегия",
        correct: "d"
    },
    {
        question: "Какой из представленных самый длинный железнодорожный маршрут?",
        a: "Пекин — Москва",
        b: "Москва — Владивосток",
        c: "Хабаровск — Москва",
        d: "Улан-Батор — Москва",
        correct: "b"
    },
    {
        question: "Какой порт связан с большим количеством портов?",
        a: "Шанхай",
        b: "Пусан",
        c: "Лос-Анджелес",
        d: "Сингапур",
        correct: "d"
    },
    {
        question: "На каком языке говорят в Бразилии?",
        a: "Португальский",
        b: "Французский",
        c: "Испанский",
        d: "Латинский",
        correct: "a"
    },
    {
        question: "Что из этого является правильным названием сх культуры?",
        a: "Оливковое масло",
        b: "Гречка",
        c: "Подсолнечник",
        d: "Масляная пальма",
        correct: "c"
    },
    {
        question: "Стандартный размер TEU?(в футах)",
        a: "20x8x8",
        b: "10x5x5",
        c: "17x7x7",
        d: "12x5x5",
        correct: "a"
    },
];

function showResults() {
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Результаты</h2>
        <p>Вы ответили правильно на <strong>${score} из ${quizData.length}</strong> вопросов.</p>

        <div id="results-list"></div>

        <h3>Список правильных ответов</h3>
        <ul id="correct-answers-list"></ul>

        <button onclick="location.reload()">Попробовать снова</button>
    `;

    const resultsList = document.getElementById("results-list");
    const correctAnswersList = document.getElementById("correct-answers-list");

    userAnswers.forEach((item, index) => {
        const userAnswer = item.user.toUpperCase();
        const correctAnswer = item.correct.toUpperCase();

        const div = document.createElement("div");
        div.classList.add("result-item");

        div.innerHTML = `
            <strong>Вопрос ${index + 1}:</strong> ${item.question}<br>
            Ваш ответ: <span class="${userAnswer === correctAnswer ? 'correct' : 'wrong'}">${userAnswer}</span><br>
            Правильный ответ: <span class="correct">${correctAnswer}</span>
            <hr>
        `;
        resultsList.appendChild(div);

        // Добавляем правильный ответ и выбранный вариант в общий список
        const li = document.createElement("li");
        li.textContent = `Вопрос ${index + 1}: 
                          Выбрано: ${getSelectedOptionText(quizData[index], userAnswer)} | 
                          Правильно: ${getCorrectOptionText(quizData[index], correctAnswer)}`;
        correctAnswersList.appendChild(li);
    });
}

// Вспомогательная функция для получения текста выбранного ответа
function getSelectedOptionText(questionObj, selectedLetter) {
    const letter = selectedLetter.toLowerCase();
    return questionObj[letter];
}

// Вспомогательная функция для получения текста правильного ответа
function getCorrectOptionText(questionObj, correctLetter) {
    const letter = correctLetter.toLowerCase();
    return questionObj[letter];
}
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const aText = document.getElementById("a_text");
const bText = document.getElementById("b_text");
const cText = document.getElementById("c_text");
const dText = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    aText.textContent = currentQuiz.a;
    bText.textContent = currentQuiz.b;
    cText.textContent = currentQuiz.c;
    dText.textContent = currentQuiz.d;
    resultEl.textContent = "";
}

submitBtn.addEventListener("click", () => {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer = undefined;

    answerEls.forEach((el) => {
        if (el.checked) {
            selectedAnswer = el.value;
        }
    });

    if (selectedAnswer) {
        const correctAnswer = quizData[currentQuestion].correct;
        const isCorrect = selectedAnswer.toLowerCase() === correctAnswer;
        if (isCorrect) score++;

        userAnswers.push({
            question: quizData[currentQuestion].question,
            user: selectedAnswer,
            correct: correctAnswer,
            isCorrect
        });

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestion();
            answerEls.forEach(el => el.checked = false);
        } else {
            showResults();
        }
    } else {
        resultEl.textContent = "Выберите вариант ответа!";
    }
});

function showResults() {
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Результаты</h2>
        <p>Вы ответили правильно на <strong>${score} из ${quizData.length}</strong> вопросов.</p>
        <div id="results-list"></div>
        <button onclick="location.reload()">Попробовать снова</button>
    `;

    const resultsList = document.getElementById("results-list");

    userAnswers.forEach((item, index) => {
        const userAnswer = item.user.toUpperCase();
        const correctAnswer = item.correct.toUpperCase();

        const div = document.createElement("div");
        div.classList.add("result-item");

        div.innerHTML = `
            <strong>Вопрос ${index + 1}:</strong> ${item.question}<br>
            Ваш ответ: <span class="${userAnswer === correctAnswer ? 'correct' : 'wrong'}">${userAnswer}</span><br>
            Правильный ответ: <span class="correct">${correctAnswer}</span>
            <hr>
        `;
        resultsList.appendChild(div);
    });
}