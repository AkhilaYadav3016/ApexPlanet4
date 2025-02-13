// Board Setup
const board = document.getElementById("board");
const diceResult = document.getElementById("diceResult");
const turnIndicator = document.getElementById("turnIndicator");
const rollDiceButton = document.getElementById("rollDice");

let playerPositions = { 1: 1, 2: 1 };
let currentPlayer = 1;
let gameWon = false;

// Snakes and Ladders positions
const snakesAndLadders = {
    3: 22,  5: 8,  11: 26,  20: 29, // Ladders
    17: 4,  19: 7,  21: 9,  27: 1   // Snakes
};

// Create board
for (let i = 100; i >= 1; i--) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = i;
    cell.id = `cell-${i}`;
    board.appendChild(cell);
}

// Roll Dice Function
function rollDice() {
    if (gameWon) return; // Stop rolling if the game is won

    let diceValue = Math.floor(Math.random() * 6) + 1;
    diceResult.innerText = `🎲 Dice: ${diceValue}`;
    movePlayer(diceValue);
}

// Move Player
function movePlayer(diceValue) {
    let newPosition = playerPositions[currentPlayer] + diceValue;
    
    if (newPosition > 100) {
        return; // Don't allow moving beyond 100
    }

    // Apply snake or ladder effect
    if (snakesAndLadders[newPosition]) {
        newPosition = snakesAndLadders[newPosition];
    }

    // Update player position
    playerPositions[currentPlayer] = newPosition;
    updateBoard();

    // Check if player won
    if (newPosition === 100) {
        gameWon = true;
        turnIndicator.innerText = `🎉 Player ${currentPlayer} Wins! 🎉`;
        alert(`🎉 Congratulations! Player ${currentPlayer} wins the game! 🎊`);
        return;
    }

    // Switch turns
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnIndicator.innerText = `Player ${currentPlayer}'s Turn`;
}

// Update Board
function updateBoard() {
    // Clear previous markers
    document.querySelectorAll(".player-marker").forEach(marker => marker.remove());

    // Place new markers
    Object.entries(playerPositions).forEach(([player, position]) => {
        const cell = document.getElementById(`cell-${position}`);
        const marker = document.createElement("div");
        marker.classList.add("player-marker");
        marker.innerText = player === "1" ? "🟢" : "🔴";
        cell.appendChild(marker);
    });
}

// Event Listener
rollDiceButton.addEventListener("click", rollDice);

// Initial Board Setup
updateBoard();
