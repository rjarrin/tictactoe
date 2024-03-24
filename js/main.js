const cells = document.querySelectorAll("[data-cell]");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

function handleCellClick(e) {
    // Identify the targeted cell
    const cell = e.target;
    // If the game is no longer active, don't do anything
    if(!gameActive) return;
    // Place the player's mark
    placeMark(cell, currentPlayer);
    // Check for player win, loss, or draw
    if(checkWin(currentPlayer)) {
        // If the player wins, the game is over
        gameActive = false;
        alert(`You win!`);
    } else if (isBoardFull()) {
        // If the board is full and none of the other conditions were met, the game ends in a tie
        gameActive = false;
        alert("It's a draw!");
    } else {
        // Computer's turn, so switch to the next symbol
        currentPlayer = "O";
        // Have the computer make a move
        computerMove();
        // Check if the computer won
        if (checkWin(currentPlayer)) {
            // If the computer wins, the game is over
            gameActive = false;
            alert(`You lose!`);
        }
        // Change currentPlayer back to the player
        currentPlayer = "X";
        // NOTE: Don't need to check if the board is full since the player always moves first in this iteration of the game. May change later.
    }
}

function checkWin(player) {
    const playerClass = `player-${player}`;
    console.log("CHECKWIN: " + playerClass);
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
    console.log("done check");
    return checker;
}



function computerMove() {
    // Determine the available, empty cells
    const availableCells = [...cells].filter(cell => !cell.classList.contains("player-X") && !cell.classList.contains("player-O"));
    // Only move if there are any cells left
    if (availableCells.length > 0) {
        // Choose the random cell
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cell = availableCells[randomIndex];
        placeMark(cell, "O");
    }
}

function isBoardFull() {
    return [...cells].every(cell => cell.classList.contains("player-X") || cell.classList.contains("player-O"));
}

function placeMark(cell, player) {
    cell.classList.add(`player-${player}`);
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