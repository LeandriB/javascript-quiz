// TODO: Declare Global variables
var question = document.getElementById("question-container");
var startButton = document.getElementById("start-button");
var quizIntro = document.getElementById("quiz-intro");
var quiz = document.getElementById("quiz-container")
var answerOptions = document.getElementById("answer-options")
var result = document.getElementById("result");
var resultText = document.querySelector(".result-txt");

var currentQuestion = 0;
var time = 75;
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

// Define start quiz functions
var startQuiz = function() {
    
    // Remove quiz intro along with start button click
    quizIntro = quizIntro.remove();
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
        var answerButton = document.querySelector("#answer-button" + i);
        answerButton.textContent = answer;
    }
}

// Check answer against user input
var checkAnswer = function(event) {
    var userInput = event.target;
    result.style.display = "block";

    if (userInput.textContent === questions[currentQuestion].correctAnswer) {
        resultText.textContent = "Correct";
    } else {
        resultText.textContent = "Incorrect";
    }
    // Display next question
    nextQuestion();
};

// Next question handler function
var nextQuestion = function() {

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
    console.log(time)
}

// End sequence for quiz
var stopQuiz = function () {
    clearInterval(timerInterval);
}


// Event Listeners
startButton.addEventListener("click", startQuiz);
answerOptions.addEventListener("click", checkAnswer);