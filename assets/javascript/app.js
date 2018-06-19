//declare variables
var questionTimerMaster; //so we only have to set this once for value-tweaking
var resultTimerMaster; //so we only have to set this once for value-tweaking
var questionTimer;
var resultTimer;
var questionTimerToggle; //0 means questiontimer should run, 1 means resulttimer should run

var correctCount;
var incorrectCount;
var missedCount;

var currentQuestion;

var questionList = [
    {
        question: "Which condiment is the best?",
        answers: ["Ketchup", "Mustard", "Mayonnaise", "Relish"],
        correctAnswer: "Ketchup"
    },
    {
        question: "Which Doctor was the best?",
        answers: ["Christopher Eccleston", "David Tennant", "Matt Smith", "Peter Capaldi"],
        correctAnswer: "David Tennant"
    },
    {
        question: "Which fast-food chain does the best burgers?",
        answers: ["A&W", "McDonald's", "Five Guys", "Wendy's"],
        correctAnswer: "Five Guys"
    },
    {
        question: "Which flavour of Freezie is the best?",
        answers: ["Purple", "Red", "Yellow", "Blue"],
        correctAnswer: "Purple"
    },
    {
        question: "Which of the following world-class cities is the best?",
        answers: ["Toronto", "New York", "Tokyo", "London"],
        correctAnswer: "Toronto"
    },
    {
        question: "Which of the the famous \"Five Composers\" was the best?",
        answers: ["Balakirev", "Mussorgsky", "Rimsky-Korsakov", "I don't know who these people are"],
        correctAnswer: "I don't know who these people are"
    },
    {
        question: "Which popular fantasy author is the best?",
        answers: ["Patrick Rothfuss", "Michael J. Sullivan", "Neil Gaiman", "Brandon Sanderson"],
        correctAnswer: "Patrick Rothfuss"
    },
    {
        question: "Where should you go on your one-week vacation?",
        answers: ["The beach", "Abroad", "A park", "Stay-cation"],
        correctAnswer: "Abroad"
    },
    {
        question: "What class is best in an RPG?",
        answers: ["Mage", "Knight", "Cleric", "Archer"],
        correctAnswer: "Mage"
    },
    {
        question: "How much are you liking this assignment?",
        answers: ["A bit", "A lot", "A ton", "A+"],
        correctAnswer: "A+"
    }
];

var correctList = [
    "Well done!",
    "You've got it!",
    "Way to go!",
    "Nice job!",
    "Great job!",
    "Bingo!",
    "That's right!"
];

var incorrectList = [
    "Aw, drat!",
    "Bad luck!",
    "Darn!",
    "That's wrong!",
    "Nope!",
    "Not quite!"
];

//declare functions

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function init() {
    shuffleArray(questionList);
    questionTimerMaster = 15;
    resultTimerMaster = 3;
    correctCount = 0;
    incorrectCount = 0;
    missedCount = 0;
    currentQuestion = 0;
    questionTimerToggle = 0;
}

function questionCountdown() {
    if (questionTimer > -1 && questionTimerToggle == 0) {
        $("#timer_window").html("<p>Time Remaining: " + questionTimer + "s</p>");
        questionTimer--;
        setTimeout(questionCountdown, 1000);
    } else if (questionTimer <= -1 && questionTimerToggle == 0) {
        missedAnswer();
    }
}

function resultCountdown() {

    if (resultTimer > -1 && questionTimerToggle == 1) {
        $("#timer_window").html("<p>Next Question in... " + resultTimer + "s</p>");
        resultTimer--;
        setTimeout(resultCountdown, 1000);
    } else {
        currentQuestion++;
        if (currentQuestion < questionList.length) {
            newQuestion(currentQuestion);
        } else {
            resultsScreen();
        }
    }
}

function newQuestion(number) {
    $("#progress_bar").html("<p>Question " + (number + 1) + " of " + questionList.length + "</p>");
    $("#question_window").html("<p>" + questionList[number].question + "</p>");
    shuffleArray(questionList[number].answers);
    $("#answer_window").empty();
    for (var i = 0; i < questionList[number].answers.length; i++) {
        $("#answer_window").append("<p class=\"answer\">" + questionList[number].answers[i] + "</p>");
    }
    questionTimerToggle = 0;
    questionTimer = questionTimerMaster;
    questionCountdown();
}

function correctAnswer() {
    questionTimerToggle = 1;
    resultTimer = resultTimerMaster;
    correctCount++;
    $("#question_window").html("<p><span class=\"good\">" + correctList[Math.floor(Math.random() * correctList.length)] + "</span> The correct answer was indeed:</p>");
    $("#answer_window").html("<p id=\"correct_answer\">" + questionList[currentQuestion].correctAnswer + "</p>");
    resultCountdown();
}


function incorrectAnswer() {
    questionTimerToggle = 1;
    resultTimer = resultTimerMaster;
    incorrectCount++;
    $("#question_window").html("<p><span class=\"bad\">" + incorrectList[Math.floor(Math.random() * incorrectList.length)] + "</span> The correct answer was:</p>");
    $("#answer_window").html("<p id=\"correct_answer\">" + questionList[currentQuestion].correctAnswer + "</p>");
    resultCountdown();
}

function missedAnswer() {
    questionTimerToggle = 1;
    resultTimer = resultTimerMaster;
    missedCount++;
    $("#question_window").html("<p><span class=\"middle\">Time's up!</span> The correct answer was:</p>");
    $("#answer_window").html("<p id=\"correct_answer\">" + questionList[currentQuestion].correctAnswer + "</p>");
    resultCountdown();
}

function resultsScreen() {
    $("#progress_bar").empty();
    $("#timer_window").empty();
    $("#question_window").html("<p>Game over! Here's your score:</p>");
    $("#answer_window").empty();
    $("#answer_window")
        .append("<p><b><span class=\"good\">Correct:</span> " + correctCount + "</b></p>")
        .append("<p><b><span class=\"bad\">Incorrect:</span> " + incorrectCount + "</b></p>")
        .append("<p><b><span class=\"middle\">Missed:</span> " + missedCount + "</b></p>")
        .append("<button id=\"new_game\">New Game</button>");
}


//The actual codde
$(document).ready(function() {

    //let's set up our listeners
    //new game listener
    $(document).on("click", "#new_game", function() {
        init();
        newQuestion(currentQuestion);
    });

    //answer listener
    $(document).on("click", ".answer", function() {
        if ($(this).text() == questionList[currentQuestion].correctAnswer) {
            correctAnswer();
        } else {
            incorrectAnswer();
        }
    });



});
