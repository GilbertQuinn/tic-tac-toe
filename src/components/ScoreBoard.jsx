/**
 * ScoreBoard.jsx
 * Displays the running win/draw tallies for both players.
 */

/**
 * @param {object} props
 * @param {{ X: number, O: number, draws: number }} props.scores - Current score counters.
 */
export default function ScoreBoard({ scores }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard__player scoreboard__player--x">
        <span className="scoreboard__symbol">X</span>
        <span className="scoreboard__count">{scores.X}</span>
        <span className="scoreboard__label">Wins</span>
      </div>
      <div className="scoreboard__divider">
        <span className="scoreboard__draws">{scores.draws}</span>
        <span className="scoreboard__label">Draws</span>
      </div>
      <div className="scoreboard__player scoreboard__player--o">
        <span className="scoreboard__symbol">O</span>
        <span className="scoreboard__count">{scores.O}</span>
        <span className="scoreboard__label">Wins</span>
      </div>
    </div>
  );
}
