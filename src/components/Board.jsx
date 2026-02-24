/**
 * Board.jsx
 * Renders the 3×3 grid of Square components.
 */

import Square from "./Square";

/**
 * @param {object}        props
 * @param {(string|null)[]} props.squares     - Array of 9 board values.
 * @param {number[]|null}   props.winningLine  - Indices of the three winning squares, or null.
 * @param {boolean}         props.gameOver     - Disables all squares when true.
 * @param {Function}        props.onSquareClick - Called with the index of the clicked square.
 */
export default function Board({ squares, winningLine, gameOver, onSquareClick }) {
  return (
    <div className="board" role="grid" aria-label="Tic-Tac-Toe board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          isWinning={winningLine?.includes(index) ?? false}
          disabled={gameOver}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}
