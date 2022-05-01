// TODO: Declare Global variables
var question = document.getElementById("question-container");
var startButton = document.getElementById("start-button");
var quizIntro = document.getElementById("quiz-intro");
var quiz = document.getElementById("quiz-container")
var answerOptions = document.getElementById("answer-options")
var result = document.getElementById("result");
var resultText = document.querySelector(".result-txt");
var seconds = 75;

var currentQuestion = 0;
// var questionDiv = document.createElement("div");

// var answerDiv= document.createElement("div")

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
    //startTimer();

};

//  Countdown timer that executes when start button is clicked
// var startTimer = function(){

//     setInterval(function(){
//         if(seconds <= 0){
//         clearInterval(startTimer);
//         document.getElementById("countdown").innerHTML = "Sorry, time's up";
//         } else {
//             document.getElementById("countdown").innerHTML = "TIME: " + seconds;
//         }
//         seconds -= 1;
//     }, 1000);
// };

// render questions on page
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
function checkAnswer(event) {
    var userInput = event.target;
    result.style.display = "block";

    if (userInput.textContent === questions[currentQuestion].correctAnswer) {
        resultText.textContent = "Correct";
    } else {
        resultText.textContent = "Incorrect";
    }
};


// Event Listeners
startButton.addEventListener("click", startQuiz);
answerOptions.addEventListener("click", checkAnswer);