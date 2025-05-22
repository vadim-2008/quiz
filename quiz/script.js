const quizData = [
    {
        question: "Какой язык программирования используется для стилей?",
        a: "HTML",
        b: "CSS",
        c: "JavaScript",
        d: "Python",
        correct: "b"
    },
    {
        question: "Какой самый большой океан на Земле?",
        a: "Атлантический",
        b: "Индийский",
        c: "Тихий",
        d: "Северный Ледовитый",
        correct: "c"
    },
    {
        question: "Кто написал 'Мастера и Маргариту'?",
        a: "Лев Толстой",
        b: "Фёдор Достоевский",
        c: "Михаил Булгаков",
        d: "Александр Пушкин",
        correct: "c"
    },
    {
        question: "Сколько планет в Солнечной системе?",
        a: "7",
        b: "8",
        c: "9",
        d: "10",
        correct: "b"
    },
    {
        question: "Что такое HTML?",
        a: "Язык разметки",
        b: "Язык программирования",
        c: "Стилевой язык",
        d: "База данных",
        correct: "a"
    }
];

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