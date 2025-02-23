let boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
let resetBtn = document.querySelector("#reset");

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
function genRanIndex() {
  let x = Math.floor(Math.random() * 9);
  if (options[x] != "") {
    return genRanIndex();
  }

  return x;
}

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initializeGame();
function initializeGame() {
  boxes.forEach((box) => box.addEventListener("click", boxclicked));
  resetBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function boxclicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
  if (running) {
    statusText.textContent = "Computer is thinking...";
    let comp = genRanIndex();
    options[comp] = "O";
    setTimeout(() => {
      compGenBox(comp);
      checkWinner();
    }, 1000);
  }
}
function compGenBox(index) {
  let cell = document.querySelector(`[cellindex="${index}"]`);
  if (cell) {
    cell.textContent = "O";
    cell.classList.remove("text-cyan-400");
    cell.classList.add("text-red-500");
  }
}
function updateCell(box, index) {
  options[index] = "X";
  box.textContent = "X";
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winPatterns.length; i++) {
    const condition = winPatterns[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  boxes.forEach((box) => (box.textContent = ""));
  running = true;
}
