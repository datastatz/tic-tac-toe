// Get all cells
const cells = document.querySelectorAll('.cell');
// Get the reset button
const resetButton = document.querySelector('.reset-button');

// Add event listener to reset button
resetButton.addEventListener('click', () => {
  location.reload(); // Refresh the page
});


// Select the player score elements
const playerOneScoreDisplay = document.querySelector('.player-one');
const playerTwoScoreDisplay = document.querySelector('.player-two');

// Set initial player
let currentPlayer = "X";

// Create a gameboard array to track moves
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Possible win conditions
const winConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left
  [2, 4, 6]  // Diagonal from top-right
];

// Initialize player scores
let playerOneScore = 0;
let playerTwoScore = 0;

// Add click event listener to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    // Check if the cell is already filled
    if (cell.textContent === "") {
      // Add current player's mark
      cell.textContent = currentPlayer;

      // Update the gameBoard array
      gameBoard[index] = currentPlayer;

      // Check for a win or draw
      if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        updateScore(currentPlayer);
        resetBoard();
        return;
      } else if (checkDraw()) {
        alert("It's a draw!");
        resetBoard();
        return;
      }

      // Toggle to the next player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

// Function to check for a win
function checkWin(player) {
  return winConditions.some(condition => {
    return condition.every(index => gameBoard[index] === player);
  });
}

// Function to check for a draw
function checkDraw() {
  return gameBoard.every(cell => cell !== "");
}

// Function to reset the board
function resetBoard() {
  // Clear the gameBoard array
  gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Clear the UI
  cells.forEach(cell => (cell.textContent = ""));

  // Reset the starting player
  currentPlayer = "X";
}

// Function to update the score
function updateScore(player) {
  if (player === "X") {
    playerOneScore++;
    playerOneScoreDisplay.textContent = `Player One: ${playerOneScore}`;
  } else if (player === "O") {
    playerTwoScore++;
    playerTwoScoreDisplay.textContent = `Player Two: ${playerTwoScore}`;
  }
}

