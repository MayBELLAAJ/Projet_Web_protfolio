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
let userAnswers = []; // Tableau pour stocker les réponses
let timeLeft = 30; // Temps initial en secondes

// Sélecteurs
const timeDisplay = document.getElementById('time');
const quizContainer = document.getElementById('quiz-questions');
const submitButton = document.getElementById('submit');

function loadQuiz() {
    // Réinitialiser le décompte pour chaque question
    timeLeft = 20;
    updateTimerDisplay();

    // Vider le conteneur avant de charger la nouvelle question
    quizContainer.innerHTML = '';
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
    // Calculer les résultats et préparer le message
    let resultMessage = `
        <h3>Félicitations, voici vos résultats :</h3>
        <p>Votre score : ${score}/${quizData.length}</p>
        <h4>Récapitulatif de vos réponses :</h4>
        <ul>`;
    quizData.forEach((data, index) => {
        const userAnswer = userAnswers[index] || "Aucune réponse";
        const isCorrect = userAnswers[index] === data.correct ? "✅" : "❌";
        resultMessage += `
            <li>
                <strong>Q${index + 1}:</strong> ${data.question}<br>
                <strong>Votre réponse:</strong> ${userAnswer} ${isCorrect}<br>
                <strong>Bonne réponse:</strong> ${data.correct}
            </li>`;
    });
    resultMessage += `</ul>`;

    // Afficher les résultats dans le pop-up
    showPopup(resultMessage);
}

function showPopup(message) {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('resultPopup');
    const resultMessage = document.getElementById('resultMessage');

    resultMessage.innerHTML = message;
    overlay.classList.add('show');
    popup.classList.add('show');
}

function closePopup() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('resultPopup');

    overlay.classList.remove('show');
    popup.classList.remove('show');
}

function updateTimerDisplay() {
    timeDisplay.textContent = timeLeft;
}

function countdown() {
    const timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft === 0) {
            clearInterval(timer);

            // Sauvegarder une réponse vide si le temps est écoulé
            userAnswers.push(null);
            currentQuiz++;

            if (currentQuiz < quizData.length) {
                loadQuiz(); // Charger la prochaine question
                countdown(); // Redémarrer le décompte
            } else {
                // Toutes les questions ont été répondues ou le temps est écoulé
                showResults();
            }
        }
    }, 1000);
}

// Gérer la soumission des réponses
submitButton.addEventListener('click', () => {
    const answer = document.querySelector('input[name="answer"]:checked');
    if (answer) {
        userAnswers.push(answer.value);
        if (answer.value === quizData[currentQuiz].correct) {
            score++;
        }
    } else {
        userAnswers.push(null); // Si aucune réponse n'est sélectionnée
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz(); // Charger la prochaine question
    } else {
        // Toutes les questions ont été répondues : afficher les résultats
        showResults();
    }
});

// Charger la première question
loadQuiz();
countdown();
loadQuiz();
