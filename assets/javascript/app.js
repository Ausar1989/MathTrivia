let secondsRemaining = 60;
let questionCounter = 0

let timeDisplay = $("#seconds")
let questionDisplay = $("#questiondisplay")
let firstAnswer = $("#answer1");
let secondAnswer = $("#answer2");
let thirdAnswer = $("#answer3");
let fourthAnswer = $("#answer4");
let gifhere =  $("#gifhere")
let displayCorrectAnswer = $("#correctanswer")

let beginButton = $("#begin");
let restartButton = $("#restart");

let correctAnswers = 0;
let incorrectAnswers = 0;
let unanswered = 0;
let timer;


let factorial = {
    question: "A factorial is the product of a whole number and all the whole numbers below it(Ex: 3! = 3 x 2 x 1 = 6). What is the factorial of 6! ?",
    a1: ["360", false],
    a2: ["720", true],
    a3: ["180", false],
    a4: ["90", false],
    url: "https://api.giphy.com/v1/gifs/search?api_key=oKCHtfIbY0Dr7JB925gVyaUoyUIT0PzE&q=monty+python+spanish+inquisition&limit=1&offset=0&rating=G&lang=en"
};

let triangle = {
    question: `What is the hypotenuse of a right triangle if one side is 5 units and the other is 7 units?`,
    a1: ["25", false],
    a2: ["49", false],
    a3: ["square root of 74", true],
    a4: ["74", false],
    url: "https://api.giphy.com/v1/gifs/search?api_key=oKCHtfIbY0Dr7JB925gVyaUoyUIT0PzE&q=thinking-insecure-issa-rae-1jl173guBKkbvC03rQ"

};

let polynomial = {
    question: "what is the value of 'x' in this equation, 3x + 9 = 28?",
    a1: ["7", true],
    a2: ["4", false],
    a3: ["9", false],
    a4: ["6", false],
    url: "https://api.giphy.com/v1/gifs/search?api_key=oKCHtfIbY0Dr7JB925gVyaUoyUIT0PzE&q=math-doug-the-splat-26gJA9SSe4m54MYec"

};

let exponent = {
    question: "what is three to the fourth power?",
    a1: ["27", false],
    a2: ["81", true],
    a3: ["9", false],
    a4: ["48", false],
    url: "https://api.giphy.com/v1/gifs/search?api_key=oKCHtfIbY0Dr7JB925gVyaUoyUIT0PzE&q=primevideoin-amazon-prime-video-amazonprimevideo-hostel-daze-daHaAmmUok533phtcq"

};

let algebra = {
    question: "in Algebra, what is the equation for the y-axis?",
    a1: ["Sine", false],
    a2: ["a^2 + b^2 = c^2", false],
    a3: ["cosine", false],
    a4: ["y = mx + b", true],
    url: "https://api.giphy.com/v1/gifs/search?api_key=oKCHtfIbY0Dr7JB925gVyaUoyUIT0PzE&q=code+rasputin&limit=1&offset=0&rating=G&lang=en"

};


let questionsArray = [factorial, triangle, polynomial, exponent, algebra]

const buttonAppear = function () {
    restartButton.css("display", "block")
    restartButton.fadeIn("slow")
}

const findRightAnswer = function (obj) {
    console.log(obj);
    for (let a in obj) {
        if (obj[a].includes(true)) {
            console.log(obj[a][0])
            displayCorrectAnswer.text(`The correct answer is: ${obj[a][0]}`)
        }
    }
}


const inBetweenScreen = function () {
    $.ajax({
        url: questionsArray[questionCounter].url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let currentImageUrl = response.data[0].images.fixed_width.url
        gifhere.attr("src", currentImageUrl)
    })
    clearInterval(timer)
    firstAnswer.text("")
    secondAnswer.text("")
    thirdAnswer.text("")
    fourthAnswer.text("")
    questionCounter++;
    if (questionCounter < 5) {
        setTimeout(displayAnswers, 6000);
    }

}

const endGameScreen = function () {
    questionDisplay.text(`Congratulations! Mission Accomplished!`)
    secondAnswer.text(`Correct Answers: ${correctAnswers}`)
    thirdAnswer.text(`Incorrect Answers: ${incorrectAnswers}`)
    fourthAnswer.text(`You're too late, mission failure: ${unanswered}`)
    timeDisplay.text(``);
    buttonAppear()
}

const correctAnswer = function () {
    questionDisplay.text("Correct!")
    correctAnswers++;
    inBetweenScreen();

    if (questionCounter === 5) {
        setTimeout(endGameScreen, 4000); 
    }

}

const wrongAnswer = function () {
    questionDisplay.text("incorrect")
    incorrectAnswers++;
    findRightAnswer(questionsArray[questionCounter])
    inBetweenScreen()
    if (questionCounter === 5) {
        setTimeout(endGameScreen, 4000); 
    }

}

const outOfTime = function () {
    questionDisplay.text("too late")
    unanswered++;
    findRightAnswer(questionsArray[questionCounter])
    inBetweenScreen()
    if (questionCounter === 5) {
        setTimeout(endGameScreen, 4000); 
    }
}


const decrement = function () {
    timer = setInterval(() => {
        secondsRemaining--
        timeDisplay.text(`Time remaining: ${secondsRemaining} seconds left`);
        if (secondsRemaining === 0) {
            outOfTime()
        }
    }
        , 1000);


}



function displayAnswers() {
    questionDisplay.text(questionsArray[questionCounter].question)
    firstAnswer.text(questionsArray[questionCounter].a1[0])
    secondAnswer.text(questionsArray[questionCounter].a2[0])
    thirdAnswer.text(questionsArray[questionCounter].a3[0])
    fourthAnswer.text(questionsArray[questionCounter].a4[0])
    displayCorrectAnswer.text("")
    gifhere.attr("src", "")
    secondsRemaining = 25;
    timeDisplay.text(`Time remaining: ${secondsRemaining} seconds left`);
    decrement();
    console.log("done");
}

beginButton.on("click", function () {
    displayAnswers();
    $(this).fadeOut("slow")
})

const checkAnswer = function (obj) {
    let choice = $(this).attr("id")
    if (choice === "answer1") {
        if (questionsArray[questionCounter]["a1"].includes(true)) {
            correctAnswer();
        } else {
            wrongAnswer();
        }

    } else if (choice === "answer2") {
        if (questionsArray[questionCounter]["a2"].includes(true)) {
            correctAnswer();
        } else {
            wrongAnswer();
        }

    } else if (choice === "answer3") {
        if (questionsArray[questionCounter]["a3"].includes(true)) {
            correctAnswer();
        } else {
            wrongAnswer();
        }

    } else {
        if (questionsArray[questionCounter]["a4"].includes(true)) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    }

}

firstAnswer.on("click", checkAnswer)
secondAnswer.on("click", checkAnswer)
thirdAnswer.on("click", checkAnswer)
fourthAnswer.on("click", checkAnswer)



restartButton.on("click", () => {
    correctAnswers = 0;
    incorrectAnswers = 0;
    unanswered = 0;
    secondsRemaining = 25;
    questionCounter = 0
    questionDisplay.text("")
    firstAnswer.text("")
    secondAnswer.text("")
    thirdAnswer.text("")
    fourthAnswer.text("")
    displayCorrectAnswer.text("")
    gifhere.attr("src", "")
    restartButton.fadeOut(100)
    beginButton.fadeIn(5000)

})

