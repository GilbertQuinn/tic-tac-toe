/**
 * History.jsx
 * Displays the move history and lets the player jump to any past state.
 */

/**
 * @param {object}    props
 * @param {number}    props.moveCount      - Total number of moves recorded.
 * @param {number}    props.currentMove    - Index of the currently displayed move.
 * @param {Function}  props.onJumpTo       - Called with the move index to time-travel.
 */
export default function History({ moveCount, currentMove, onJumpTo }) {
  const moves = Array.from({ length: moveCount + 1 }, (_, move) => {
    const label = move === 0 ? "Game start" : `Move #${move}`;
    const isCurrent = move === currentMove;

    return (
      <li key={move}>
        <button
          className={`history-btn${isCurrent ? " history-btn--active" : ""}`}
          onClick={() => onJumpTo(move)}
          disabled={isCurrent}
        >
          {isCurrent ? `▶ ${label}` : `Go to ${label}`}
        </button>
      </li>
    );
  });

  return (
    <aside className="history">
      <h2 className="history__title">Move History</h2>
      <ol className="history__list">{moves}</ol>
    </aside>
  );
}
