const cells = document.querySelectorAll("[data-cell]");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    if(!cell.classList.contains("cell") || !gameActive) return;
    // Place the player's mark
    placeMark(cell, currentPlayer);
    // Check for win or draw
    if (checkWin(currentPlayer)) {
        gameActive = false;
        alert("${currentPlayer} wins!");
    } else if (isBoardFull()) {
        gameActive = false;
        alert("It\'s a draw!");
    } else {
        // Switch to next player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        // Computer's turn
        if (currentPlayer === "O") {
            setTimeout(computerMove, 1000);
        }
    }
}

function placeMark(cell, player) {
    cell.classList.add("player-${player}");
    cell.textContent = player;
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.classList.remove("player-X", "player-O");
        cell.textContent = "";
    });
}


cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);