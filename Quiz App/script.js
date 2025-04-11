const question = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Tool Markup Language", correct: false },
    ],
  },

  {
    question:
      "Which tag is used to link an external CSS file to an HTML document?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<link>", correct: false },
      { text: "<style>", correct: false },
      { text: "<css>", correct: false },
    ],
  },

  {
    question: "What is the purpose of the flex property in CSS?",
    answers: [
      { text: "To make the text bold", correct: false },
      { text: "To control layout using a flexible box model", correct: true },
      { text: "To make the website responsive", correct: false },
      { text: "To float elements left or right", correct: false },
    ],
  },

  {
    question: "Which HTTP method is used to submit form data to a server?",
    answers: [
      { text: "GET", correct: false },
      { text: "POST", correct: true },
      { text: "PUT", correct: false },
      { text: "DELETE", correct: false },
    ],
  },

  {
    question: "In JavaScript, what will typeof null return?",
    answers: [
      { text: "object", correct: true },
      { text: "null", correct: false },
      { text: "undefined", correct: false },
      { text: "boolean", correct: false },
    ],
  },
];

const questionsEl = document.getElementById("questions");
const answerEl = document.querySelector(".answer-btns");
const nextBtn = document.getElementById("nxt-btn");

let currentIndex = 0;
let score = 0;

function start() {
  currentIndex = 0;
  score = 0;
  nextBtn.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = question[currentIndex];
  let questionNo = currentIndex + 1;
  questionNo = questionNo < 10 ? "0" + questionNo : questionNo;
  questionsEl.innerText = `${questionNo} . ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerEl.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  startTimer();
}

function resetState() {
  nextBtn.style.display = "none";

  while (answerEl.firstChild) {
    answerEl.removeChild(answerEl.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer);

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerEl.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  clearInterval(timer);
  resetState();
  questionsEl.innerHTML = `Your Score is ${score} out of ${question.length}.<br>Enjoyed and want to try again ?`;
  questionsEl.style.color = "green";
  nextBtn.innerHTML = "Play Again?";
  nextBtn.style.display = "block";
}

function handleNextBtn() {
  currentIndex++;

  if (currentIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < question.length) {
    handleNextBtn();
  } else {
    start();
  }
});

let timer;
let timeLeft = 60;

function startTimer() {
  timeLeft = 60;
  document.getElementById("timer").innerText = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  Array.from(answerEl.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextBtn.style.display = "block";
}

start();
