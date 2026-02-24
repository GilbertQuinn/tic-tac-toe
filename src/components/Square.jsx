/**
 * Square.jsx
 * A single clickable cell on the Tic-Tac-Toe board.
 */

/**
 * @param {object}   props
 * @param {string|null} props.value       - 'X', 'O', or null (empty).
 * @param {Function}    props.onClick     - Called when the square is clicked.
 * @param {boolean}     props.isWinning   - Highlights this square if it's part of the winning line.
 * @param {boolean}     props.disabled    - Prevents interaction when the game is over or square is filled.
 */
export default function Square({ value, onClick, isWinning, disabled }) {
  return (
    <button
      className={[
        "square",
        value === "X" ? "square--x" : value === "O" ? "square--o" : "",
        isWinning ? "square--winning" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={disabled || !!value}
      aria-label={value ? `Square occupied by ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}
