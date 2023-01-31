// Create a initial state - kinda like the source of information
// Create a board
//The game will have two players. Player X and O
//Both players will take turns. After click it will switch to other player
//Players should not be able to click on the same box.
//Create an alert if they win.
//going to need to add an eventlistener. For everytime you click on the board
// Will create winning options. Should be a total of 8. 3 vertical, 3 horizontal and 2 diagnol. How to implement this logic?

// look into arrow functions

// *Attempt 2
//Elements

let wonText = document.getElementById("wonText");
let startOver = document.getElementById("start-over-button");
let playerId = document.getElementById("playerId");
let userInput = document.querySelector("#nameInput");
let message = document.querySelector("#message");
let cells = [...document.getElementsByClassName("cell")];
let winnerOfGame = getComputedStyle(document.body).getPropertyValue(
  "--winning-cells"
);
// initial state

const gameState = {
  board: [null, null, null, null, null, null, null, null, null],
  PlayerX: "X",
  PlayerO: "O",
  CurrentPlayer: this.PlayerX,
  GameWinner: false,
};
function gameStart() {
  if (gameState.GameWinner === false) {
    for (let cell of cells) {
      cell.addEventListener("click", moveChange);
      changeTurn();
    }
  }
  return;
}
const winningConditionsBoard = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function winningConditions() {
  for (const condition of winningConditionsBoard) {
    let [a, b, c] = condition;
    if (
      gameState.board[a] &&
      gameState.board[a] == gameState.board[b] &&
      gameState.board[a] == gameState.board[c]
    ) {
      return [a, b, c];
    }
  }
  return false;
}
function moveChange(event) {
  const id = event.target.id;
  if (!gameState.board[id] && !gameState.GameWinner) {
    gameState.board[id] = gameState.CurrentPlayer;
    event.target.innerText = gameState.CurrentPlayer;
    if (winningConditions()) {
      playerId.innerText = `${gameState.CurrentPlayer} has won!`;
      gameState.GameWinner = true;

      return;
    }
    changeTurn();
    if (!gameState.board.includes(null)) {
      playerId.innerText = "Draw!";
      return;
    }
  }
  return;
}
function changeTurn() {
  if (gameState.GameWinner === false) {
    if (gameState.CurrentPlayer === "X") {
      gameState.CurrentPlayer = "O";
      playerId.innerText = `It's ${gameState.PlayerO} turn`;
    } else {
      gameState.CurrentPlayer = "X";
      playerId.innerText = `It's ${gameState.PlayerX} turn`;
    }
  } else {
    return;
  }
}

function nameInput() {
  document.querySelector("#input").innerText = "";
  message.innerHTML = "Hello " + userInput.value;
}

startOver.addEventListener("click", restart);

function restart() {
  gameState.board.fill(null);
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.backgroundColor = "";
  });
  gameState.CurrentPlayer = gameState.PlayerX;
  gameState.GameWinner = false;
}
gameStart();
