// Declare Global variables
var currentQuestion = 0;
var question = document.getElementById("question-container");
var startButton = document.getElementById("start-button");
var quizIntro = document.getElementById("quiz-intro");
var quiz = document.getElementById("quiz-container");
var answerOptions = document.getElementById("answer-options");
var result = document.getElementById("result");
var resultText = document.querySelector(".result-txt");

// Global score variables
var scoreCard = document.getElementById("score-card");
var score = document.getElementById("score");
var leaderboard = document.getElementById("leaderboard-container");
var submitButton = document.getElementById("submit-button");
var inputEl = document.getElementById("initials");
var viewScores = document.getElementById("leaderboard");

// Global Reset variables
var clearButton = document.getElementById("clear-button");
var backButton = document.getElementById("back-button");

// Global timer variables
var time = 75;
var penalty = 10;
var timerInterval;
var displayTimer = document.getElementById("timer");

// Quiz questions
var questions =  [
    {
        question: "Commonly used data values do not include ______.",
        answers: [
            "boolean",
            "numbers & strings",
            "arrays",
            "alerts",
        ],
        correctAnswer: "alerts",
    },
    {
        question: "Arrays in Javascript are used to store ______.",
        answers: [
            "booleans",
            "numbers & strings",
            "other arrays",
            "all of the above",
        ],
        correctAnswer: "all of the above",
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis",
        ],
        correctAnswer: "parenthesis",
    }, 
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log",
        ],
        correctAnswer: "console.log",
    },
    {
        question: "The condition in an if else statement is enclosed with ______.",
        answers: [
            "square brackets",
            "curly brackets",
            "quotes",
            "parenthesis",
        ],
        correctAnswer: "parenthesis",
    }
]

// Hide select elements
function hideEl() {
    quizIntro.setAttribute("hidden", true);
    question.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboard.setAttribute("hidden", true);
}

// Define start quiz functions
var startQuiz = function() {
    
    // Remove quiz intro along with start button click
    quizIntro.setAttribute("hidden", true);
    question.removeAttribute("hidden");

    // Render question
    showQuestions();
    // Call startTimer function on button click
    startTimer();

};

// Render questions on page
var showQuestions = function() {

    var question = questions[currentQuestion];
    var answers = question.answers;

    var headerEl = document.querySelector(".question-txt");
    headerEl.textContent = question.question;

    for (i = 0; i < answers.length; i++) {
        var answer = answers[i];
        var answerButton = document.getElementById("answer-button" + i);
        answerButton.textContent = answer;
    }
}

// Check answer against user input
var checkAnswer = function(event) {
    var userInput = event.target;
    result.style.display = "block";

    if (userInput.textContent === questions[currentQuestion].correctAnswer) {
        resultText.textContent = "Correct";
        setTimeout(() => {
            result.style.display = "none";
        }, 1000)
        // Display next question
        nextQuestion();
    } else if(userInput.textContent !== questions[currentQuestion].correctAnswer) {
        time = time - penalty;
        resultText.textContent = "Incorrect";
        setTimeout(() => {
            result.style.display = "none";
        }, 1000)
        // Display next question
        nextQuestion();
    } else {
        stopQuiz();
    }
};

// Next question handler function
var nextQuestion = function() {

    currentQuestion++;

    if(currentQuestion < questions.length) {
        showQuestions();
    } else {
        stopQuiz();
    }
};

 //Countdown timer that executes when start button is clicked
var startTimer = function(){
    timerInterval = setInterval(function() {
        time--;
        displayTime();
        if (time < 1) {
            stopQuiz();
        }
    }, 1000)
};

// Display time on page
var displayTime = function() {
    displayTimer.textContent = time;
}

// End sequence for quiz
var stopQuiz = function () {
    clearInterval(timerInterval);
    question.setAttribute("hidden", true)
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
}

// Save score on leaderboard
var saveScore = function(event) {
    
    event.preventDefault();
    
    if (!inputEl.value) {
        alert("Enter your initials before submitting");
        return;
    }

    var scoreInfo = {
        initials: inputEl.value,
        score: time,
    }

    updateScores(scoreInfo);

    scoreCard.setAttribute("hidden", true);
    leaderboard.removeAttribute("hidden", true);

    displayScores();

}

// Display highscores
var displayScores = function() {
    // Call sort score function
    var sort = sortScores();

    var scoreList = document.getElementById("highscores");
    scoreList.innerHTML = "";
    for (i = 0; i < sort.length; i++) {
        var scoreEntries = sort[i];
        var scoreListEl = document.createElement("li");
        scoreListEl.textContent = 
        scoreEntries.initials + " - " + scoreEntries.score;
        scoreList.appendChild(scoreListEl);
    }
}

// Sort scores from highest to lowest
var sortScores = function() {
    var scoreArray = getScores();
    if (!scoreArray) {
        return;
    }

    scoreArray.sort(function (a, b) {
        return b.score - a.score;
    });
    return scoreArray;
}

// LocalStorage
// Updates the leaderboard stored in local storage
var updateScores = function(scoreInfo) {
    var scoreArray = getScores();
    // Append new score item
    scoreArray.push(scoreInfo);
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
}

// Retrieve scores from local storage and parse object using JSON.parse
var getScores = function() {
    var savedScores = localStorage.getItem("scoreArray");
    if (savedScores !== null) {
        var scoreArray = JSON.parse(savedScores);
        return scoreArray;
    } else {
        scoreArray = [];
    }
    return scoreArray;
}

// Reset functions
// Clear local storage and UI
var clearScores = function() {
    localStorage.clear();
    displayScores();
}

// Retake quiz
var playAgain = function() {
    leaderboard.setAttribute("hidden", true);
    quizIntro.removeAttribute("hidden");

    // Reset Timer
    time = 75;
    // displayTimer.innerHTML = "75"
    clearInterval(timerInterval);

    // Reset question index
    currentQuestion = 0;

}

var showHighscores = function() {
    hideEl();
    leaderboard.removeAttribute("hidden");

    // Stop countdown
    clearInterval(timerInterval);

  //assign undefined to time and display that, so that time does not appear on page
    time = 75;
    displayTime();

  // Display scores
    displayScores();
};

// Event Listeners
startButton.addEventListener("click", startQuiz);
answerOptions.addEventListener("click", checkAnswer);
submitButton.addEventListener("click", saveScore);
clearButton.addEventListener("click", clearScores);
backButton.addEventListener("click", playAgain);
viewScores.addEventListener("click", showHighscores);
