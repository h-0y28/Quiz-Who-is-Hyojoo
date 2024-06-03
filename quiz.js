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
            { text: "Swimming", correct: false },
            { text: "Tennis", correct: false }
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
            { text: "Spring", correct: true },
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
            { text: "A wedding celebration performance", correct: true }
        ]
    },
    {
        question: "What wasn't Hyojoo's childhood dream?",
        answers: [
            { text: "Police", correct: false },
            { text: "Ballerina", correct: false },
            { text: "Doctor", correct: true },
            { text: "Teacher", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;
let selectedButton = null;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    questionElement.classList.remove('hide');
    resultElement.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    resultElement.classList.add('hide');
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const clickedButton = e.target;
    const correct = clickedButton.dataset.correct === 'true';

    highlightSelectedButton(clickedButton);

    if (correct) {
        score += 100;
        resultElement.innerText = 'Correct!';
    } else {
        resultElement.innerText = 'Wrong!';
    }

    resultElement.classList.remove('hide');

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showScore();
    }
}

function highlightSelectedButton(button) {
    if (selectedButton) {
        selectedButton.classList.remove('selected');
    }
    button.classList.add('selected');
    selectedButton = button;
}

function setStatusClass(element, correct) {
    element.classList.toggle('correct', correct);
    element.classList.toggle('wrong', !correct);
}

function showScore() {
    
    document.getElementById("question-container").classList.add('hide');
    nextButton.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `${score} / 600`;
    if (score === 600) {
        resultElement.innerText = 'Perfect Score!';
        resultElement.classList.remove('hide');
    }
}

nextButton.addEventListener('click', () => {
    nextButton.classList.add('hide');
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
    selectedButton = null;
});

document.addEventListener('DOMContentLoaded', startQuiz);