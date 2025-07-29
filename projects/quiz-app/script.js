const questions = [
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Solution"],
    answer: 0
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>", "<link>"],
    answer: 0
  },
  {
    question: "What is the correct JavaScript syntax to select an element by ID?",
    options: ["getElementById()", "querySelector()", "getElementByClass()", "selectById()"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const timeEl = document.getElementById('time');

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 30;
  resultEl.style.display = 'none';
  nextBtn.disabled = true;
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach((option, index) => {
    const btn = document.createElement('div');
    btn.classList.add('option');
    btn.textContent = option;
    btn.addEventListener('click', () => selectOption(index));
    optionsEl.appendChild(btn);
  });
  currentEl.textContent = currentQuestion + 1;
  totalEl.textContent = questions.length;
  feedbackEl.textContent = '';
  nextBtn.disabled = true;
}

function selectOption(index) {
  const q = questions[currentQuestion];
  const options = optionsEl.children;
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove('selected');
    options[i].style.pointerEvents = 'none';
  }
  options[index].classList.add('selected');
  nextBtn.disabled = false;
  feedbackEl.textContent = index === q.answer ? 'Correct!' : `Incorrect. The correct answer is: ${q.options[q.answer]}`;
  if (index === q.answer) score++;
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

function showResult() {
  clearInterval(timer);
  questionEl.textContent = '';
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  nextBtn.style.display = 'none';
  resultEl.style.display = 'block';
  scoreEl.textContent = `${score} out of ${questions.length}`;
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
  }
  highScoreEl.textContent = localStorage.getItem('highScore');
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    startTimer();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', startQuiz);

startQuiz();