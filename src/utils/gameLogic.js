/**
 * gameLogic.js
 * Pure utility functions for Tic-Tac-Toe game logic.
 * Keeping logic separate from UI makes it easy to test and reuse.
 */

/**
 * The 8 possible winning line combinations (rows, columns, diagonals).
 * Each entry is a triplet of board indices.
 */
const WINNING_LINES = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // center column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left → bottom-right
  [2, 4, 6], // diagonal top-right → bottom-left
];

/**
 * Determines whether there is a winner on the given board.
 *
 * @param {(string|null)[]} squares - Array of 9 values: 'X', 'O', or null.
 * @returns {{ winner: string, line: number[] } | null}
 *   An object with the winner symbol and the winning line indices,
 *   or null if there is no winner yet.
 */
export function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/**
 * Checks whether the board is full with no winner (a draw).
 *
 * @param {(string|null)[]} squares - Array of 9 board values.
 * @returns {boolean} True if every square is filled and there is no winner.
 */
export function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

/**
 * Produces the status message shown above the board.
 *
 * @param {string|null} winner - Winning player symbol, or null.
 * @param {boolean} draw - Whether the game ended in a draw.
 * @param {string} nextPlayer - The symbol ('X' or 'O') of the next player.
 * @returns {string} Human-readable status string.
 */
export function getStatusMessage(winner, draw, nextPlayer) {
  if (winner) return `Player ${winner} wins! 🎉`;
  if (draw) return "It's a draw! 🤝";
  return `Player ${nextPlayer}'s turn`;
}
