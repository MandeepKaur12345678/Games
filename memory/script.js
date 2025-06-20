const emojis = ["🍓", "🍕", "🍩", "🍪", "🍇", "🍎", "🥝", "🍉", "🍒", "🍍", "🧁", "🍫"];
let cards = [...emojis, ...emojis];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let timer = 0;
let timerInterval;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function updateMoves() {
  moves++;
  document.getElementById("moves").innerText = moves;
}

function startTimer() {
  clearInterval(timerInterval);
  timer = 0;
  document.getElementById("timer").innerText = timer;
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").innerText = timer;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function createBoard() {
  shuffle(cards);
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";

  cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    const innerCard = document.createElement("div");
    innerCard.classList.add("inner-card");

    const front = document.createElement("div");
    front.classList.add("front");
    front.innerText = "❓";

    const back = document.createElement("div");
    back.classList.add("back");
    back.innerText = emoji;

    innerCard.appendChild(front);
    innerCard.appendChild(back);
    card.appendChild(innerCard);

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });

  moves = 0;
  document.getElementById("moves").innerText = moves;
  document.getElementById("status").innerText = "Find all the matching pairs!";
  startTimer();
}

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  updateMoves();

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

function checkWin() {
  const allFlipped = document.querySelectorAll(".card.flipped");
  if (allFlipped.length === cards.length) {
    stopTimer();
    document.getElementById("status").innerText = `🎉 You won in ${moves} moves and ${timer} seconds!`;
  }
}

document.getElementById("restartBtn").addEventListener("click", () => {
  cards = [...emojis, ...emojis];
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  createBoard();
});

createBoard();
