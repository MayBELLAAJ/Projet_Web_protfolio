const quizData = [
    {
        question: "Quelle est la capitale de la France ?",
        a: "Madrid",
        b: "Berlin",
        c: "Paris",
        correct: "c"
    },
    {
        question: "Qui a peint la Joconde ?",
        a: "Vincent van Gogh",
        b: "Léonard de Vinci",
        c: "Pablo Picasso",
        correct: "b"
    },
    {
        question: "Quel est le plus grand océan ?",
        a: "Océan Atlantique",
        b: "Océan Pacifique",
        c: "Océan Indien",
        correct: "b"
    }
];

let currentQuiz = 0;
let score = 0;
let timeLeft = 30;
const timeDisplay = document.getElementById('time');
const quizContainer = document.getElementById('quiz-questions');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

let userAnswers = []; // Tableau pour stocker les réponses

function loadQuiz() {
    quizContainer.innerHTML = ''; // Vider le conteneur
    const currentData = quizData[currentQuiz];
    quizContainer.innerHTML = `
        <div class="question">
            <h3>${currentData.question}</h3>
            <label><input type="radio" name="answer" value="a"> ${currentData.a}</label><br>
            <label><input type="radio" name="answer" value="b"> ${currentData.b}</label><br>
            <label><input type="radio" name="answer" value="c"> ${currentData.c}</label>
        </div>
    `;
}

function showResults() {
    let answer = document.querySelector('input[name="answer"]:checked');
    if (answer) {
        userAnswers.push(answer.value); // Stocker la réponse donnée
        if (answer.value === quizData[currentQuiz].correct) {
            score++;
        }
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        quizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        let resultMessage = score === quizData.length ? "Félicitations, vous avez tout bon !" : "Vous pouvez faire mieux !";
        resultsContainer.innerHTML = `<p>${resultMessage}</p><p>Votre score : ${score}/${quizData.length}</p>`;
        
        // Afficher le récapitulatif des réponses
        let recapHTML = '<h4>Récapitulatif de vos réponses :</h4><ul>';
        quizData.forEach((data, index) => {
            recapHTML += `<li>Q${index + 1}: ${data.question} - Votre réponse: ${userAnswers[index] || 'Aucune réponse'}</li>`;
        });
        recapHTML += '</ul>';
        resultsContainer.innerHTML += recapHTML;
    }
}

function countdown() {
    const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

submitButton.addEventListener('click', showResults);

loadQuiz();
countdown();
