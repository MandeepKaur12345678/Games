let userScore = 0;
let computerScore = 0;

function play(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let result = "";

  if (userChoice === computerChoice) {
    result = `🤝 It's a Draw! You both chose ${userChoice}`;
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    result = `🎉 You Win! ${userChoice} beats ${computerChoice}`;
    userScore++;
  } else {
    result = `😢 You Lose! ${computerChoice} beats ${userChoice}`;
    computerScore++;
  }

  document.getElementById("result").innerText = result;
  document.getElementById("score").innerText = `You: ${userScore} | Computer: ${computerScore}`;
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  document.getElementById("result").innerText = "Game reset! Make your move!";
  document.getElementById("score").innerText = "You: 0 | Computer: 0";
}
