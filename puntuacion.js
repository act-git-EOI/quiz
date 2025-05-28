const respuestasA = [
    "Tokyo",
    "LEONARDO DA VINCI",
    "PORTUGUESE",
    "WILLIAM SHAKESPEARE",
    "PACIFIC OCEAN",
    "VATICAN CITY",
    "SATURN",
    "MICHELANGELO",
    "CANBERRA",
    "ALBERT EINSTEIN"
];

const respuestasB = [
    "Ottawa",
    "Brasília",
    "Berlin",
    "Rabat",
    "Bern",
    "Beijing",
    "New Delhi",
    "Cairo",
    "Tokyo",
    "Washington, D.C."
];

function quizEscojido(q) {
    let quiz;
    if (q === "A") {
        quiz = 'A';
    } else if (q === "B") {
        quiz = 'B';
    }
    sessionStorage.setItem('selectedQuiz', quiz);
    if (quiz === "A") {
        window.location.href = 'QUIZ_A/pregunta1.html';
    } else if (quiz === "B") {
        window.location.href = 'QUIZ_B/pregunta1.html';
    }
}

// Function to validate and store user answer
function validateAnswer(questionIndex) {
    const selectedQuiz = sessionStorage.getItem('selectedQuiz');
    const correctAnswers = selectedQuiz === 'A' ? respuestasA : respuestasB;
    const correctAnswer = correctAnswers[questionIndex];
    const selectedValue = document.querySelector('input[name="answer"]:checked')?.value;

    if (selectedValue) {
        const labels = document.querySelectorAll('.answer label');
        labels.forEach(label => {
            const input = label.previousElementSibling;
            if (input.value === correctAnswer) {
                label.classList.add(input.checked ? 'correct' : 'incorrect');
            } else if (input.checked) {
                label.classList.add('incorrect');
            }
        });

        // Store user answer in sessionStorage
        const userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '[]');
        userAnswers[questionIndex] = selectedValue;
        sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));

        document.getElementById('nextButton').style.display = 'inline-block';
    }
}

// Function to calculate and display results (used in results.html)
function displayResults() {
    const selectedQuiz = sessionStorage.getItem('selectedQuiz');
    const userAnswers = JSON.parse(sessionStorage.getItem('userAnswers') || '[]');
    const correctAnswers = selectedQuiz === 'A' ? respuestasA : respuestasB;
    const resultContainer = document.getElementById('resultContainer');

    if (selectedQuiz === 'A') {
        document.querySelector('h1').textContent = 'Resultados del Quiz A';
    } else if (selectedQuiz === 'B') {
        document.querySelector('h1').textContent = 'Resultados del Quiz B';
    }

    let correctCount = 0;
    let incorrectCount = 0;

    correctAnswers.forEach((correctAnswer, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) correctCount++;
        else incorrectCount++;

        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `Pregunta ${index + 1}: Tu respuesta: <strong>${userAnswer || 'No respondida'}</strong>, Correcta: <strong>${correctAnswer}</strong> - ${isCorrect ? 'Correcta' : 'Incorrecta'}`;
        resultContainer.appendChild(resultItem);
    });

    const totalItem = document.createElement('div');
    totalItem.className = 'result-item';
    totalItem.innerHTML = `<strong>Total:</strong> ${correctCount} correctas, ${incorrectCount} incorrectas (de 10)`;
    resultContainer.appendChild(totalItem);

    // Clear sessionStorage after displaying results (optional)
    // sessionStorage.clear();
}