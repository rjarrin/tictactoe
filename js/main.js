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

function checkWin(player) {
    const playerClass = "player-${player}";
    // Define winning row outcomes
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    // Define the winning column outcomes
    const columns = [
        [0, 3, 6],
        [1, 4, 7], 
        [2, 5, 8]
    ];
    // Define the winning diagonal outcomes
    const diagonals = [
        [0, 4, 8],
        [2, 4, 6]
    ];
    // Check if any of the outcomes were matched by an individual player
    let checker = rows.some(row => row.every(index => cells[index].classList.contains(playerClass))) || 
    columns.some(column => column.every(index => cells[index].classList.contains(playerClass))) ||
    diagonals.some(diagonal => diagonal.every(index => cells[index].classList.contains(playerClass)));

    return checker;
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