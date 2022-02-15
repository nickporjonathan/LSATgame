//global variables 

var beginButton = document.getElementById("begin-btn");
var nextButton = document.getElementById("next-btn");
var questionBoxElement = document.getElementById("question-box");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");

let presentQuestions, questionQue;

beginButton.addEventListener("click", beginGame);
nextButton.addEventListener("click", () => {
  questionQue++;
  setNextQuestion();
});

//question sets

var questions = [
    {
      question:
        "1. Which one of the following lists the witnesses in an order in which they could testify?",
      answers: [
        {
          text: "a) Ramirez, Sanderson, Tannenbaum, Mangione, Ujemori, Wong",
          correct: false,
        },
        {
          text: "b) Sanderson, Tannenbaum, Ujemori, Ramirez, Wong, Mangione",
          correct: true,
        },
        {
          text: "c) Sanderson, Ujemori, Tannenbaum, Wong, Ramirez, Mangione",
          correct: false,
        },
        {
          text: "d) Tannenbaum, Mangione, Ujemori, Sanderson, Ramirez, Wong",
          correct: false,
        },
        {
          text: "e) Tannenbaum, Mangione, Ujemori, Sanderson, Ramirez, Wong",
          correct: false,
        },
      ],
    },
    {
      question:
        "2. If Tannenbaum testifies first, then which one of the following could be true?",
      answers: [
        { text: "a) Ramirez testifies second.", correct: false },
        { text: "b) Wong testifies third.", correct: false },
        { text: "c) Sanderson testifies fourth.", correct: false },
        { text: "d) Ujemori testifies fifth.", correct: false },
        { text: "e) Mangione testifies sixth.", correct: true },
      ],
    },
    {
      question: "3. If Sanderson testifies fifth, then Ujemori must testify",
      answers: [
        { text: "a) First", correct: true },
        { text: "b) Second", correct: false },
        { text: "c) Third", correct: false },
        { text: "d) Fourth", correct: false },
        { text: "e) Fifth", correct: false },
      ],
    },
    {
      question:
        "4. Which one of the following pairs of witnesses CANNOT testify third and fourth, respectively?",
      answers: [
        { text: "a) Mangione, Tannenbaum", correct: true },
        { text: "b) Ramirez, Sanderson", correct: false },
        { text: "c) Sanderson, Ujemori", correct: false },
        { text: "d) Tannenbaum, Ramirez", correct: false },
        { text: "e) Ujemori, Wong", correct: false },
      ],
    },
    {
      question:
        "5. Which one of the following pairs of witnesses CANNOT testify first and second, respectively?",
      answers: [
        { text: "a) Sanderson, Ujemori", correct: false },
        { text: "b) Tannenbaum, Mangione", correct: false },
        { text: "c) Tannenbaum, Sanderson", correct: false },
        { text: "d) Ujemori, Tannenbaum", correct: true },
        { text: "e) Ujemori, Wong", correct: false },
      ],
    },
  ];
  

//functions 

function beginGame() {
  console.log("The game has begun");
  beginButton.classList.add("hide");
  presentQuestions = questions.sort();
  questionQue = 0;
  questionBoxElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  console.log("next");
  resetState();
  revealQuestion(presentQuestions[questionQue]);
}

function revealQuestion(question) {
  console.log("next challenge activated");
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  removeResponseSet(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  responseSet(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    responseSet(button, button.dataset.correct);
  });
  if (presentQuestions.length > questionQue + 1) {
    nextButton.classList.remove("hide");
  } else {
    beginButton.innerText = "Try again";
    beginButton.classList.remove("hide");
  }
}

function responseSet(element, correct) {
  removeResponseSet(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function removeResponseSet(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

