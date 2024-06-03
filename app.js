const questions = [
    {
        question: "When is Hyojoo's birthday?",
        answers: [
            { text: "8/2", correct: true },
            { text: "8/4", correct: false },
            { text: "8/22", correct: false },
            { text: "8/24", correct: false }
        ]
    },
    {
        question: "What is Hyojoo's favorite sport?",
        answers: [
            { text: "Badminton", correct: false },
            { text: "Bowling", correct: true },
            { text: "swimming", correct: false },
            { text: "tennis", correct: false }
        ]
    },
    {
        question: "What is Hyojoo's blood type?",
        answers: [
            { text: "A", correct: true },
            { text: "B", correct: false },
            { text: "O", correct: false },
            { text: "AB", correct: false }
        ]
    },
    {
        question: "What is Hyojoo's favorite season?",
        answers: [
            { text: "spring", correct: true },
            { text: "Summer", correct: false },
            { text: "Fall", correct: false },
            { text: "Winter", correct: false }
        ]
    },
    {
        question: "What has Hyojoo never experienced before?",
        answers: [
            { text: "Falling into a sinkhole", correct: false },
            { text: "1 million won for the hospital fee", correct: false },
            { text: "Get hit by her brother", correct: false },
            { text: "a wedding celebration performance", correct: true }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

let selectedButton = null; // 전역 변수로 선택된 버튼을 저장

function selectAnswer(e) {
    const clickedButton = e.target;
    const answerText = clickedButton.innerText;
    const correct = clickedButton.dataset.correct === 'true';

    // 이전에 선택된 버튼의 색상을 원래대로 변경
    if (selectedButton) {
        selectedButton.classList.remove('selected');
    }

    // 현재 클릭된 버튼을 강조하고, 전역 변수에 저장
    clickedButton.classList.add('selected');
    selectedButton = clickedButton;

    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showScore();
    }
    showSelectedAnswer(answerText);
}

// 다른 버튼을 누르기 전까지 선택된 버튼 강조 유지
function highlightSelectedButton() {
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScore() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
    highlightSelectedButton(); // 다음 버튼 클릭 후 선택된 버튼 강조 유지
});

// Ensure the DOM is fully loaded before starting the quiz
document.addEventListener('DOMContentLoaded', startQuiz);