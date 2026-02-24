/**
 * Game.jsx
 * Root game component. Manages all game state:
 *  - move history (for time-travel)
 *  - current move index
 *  - persistent score tallies across multiple rounds
 */

import { useState, useCallback } from "react";
import Board from "./Board";
import History from "./History";
import ScoreBoard from "./ScoreBoard";
import { calculateWinner, isDraw, getStatusMessage } from "../utils/gameLogic";

/** Initial blank board: 9 null values. */
const EMPTY_BOARD = Array(9).fill(null);

/** Initial score state. */
const INITIAL_SCORES = { X: 0, O: 0, draws: 0 };

export default function Game() {
  /**
   * history: array of board snapshots, one per move.
   * history[0] is always the empty starting board.
   */
  const [history, setHistory] = useState([EMPTY_BOARD]);

  /** Index into `history` that represents the currently viewed move. */
  const [currentMove, setCurrentMove] = useState(0);

  /** Cumulative scores across all rounds. */
  const [scores, setScores] = useState(INITIAL_SCORES);

  // Derive the active board from history
  const currentSquares = history[currentMove];

  // X always goes on even-numbered moves (0, 2, 4 …)
  const nextPlayer = currentMove % 2 === 0 ? "X" : "O";

  // Compute winner / draw state from the current board snapshot
  const winResult = calculateWinner(currentSquares);
  const draw = isDraw(currentSquares);
  const gameOver = !!winResult || draw;

  const statusMessage = getStatusMessage(
    winResult?.winner ?? null,
    draw,
    nextPlayer
  );

  /**
   * Handles a player clicking a square.
   * - Ignores clicks on filled squares or when the game is over.
   * - Appends the new board state to history (dropping any future states
   *   when the player has used the time-travel feature).
   * - Updates the score tally when the move ends the game.
   *
   * @param {number} index - The 0-based index of the clicked square.
   */
  const handleSquareClick = useCallback(
    (index) => {
      // Guard: already filled or game finished
      if (currentSquares[index] || gameOver) return;

      // Build the next board snapshot
      const nextSquares = currentSquares.slice();
      nextSquares[index] = nextPlayer;

      // Truncate history to currentMove (discard any time-travelled-past moves)
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      const nextMove = currentMove + 1;

      setHistory(nextHistory);
      setCurrentMove(nextMove);

      // Check if this move ends the game and update scores
      const newWin = calculateWinner(nextSquares);
      const newDraw = isDraw(nextSquares);

      if (newWin) {
        setScores((prev) => ({ ...prev, [newWin.winner]: prev[newWin.winner] + 1 }));
      } else if (newDraw) {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      }
    },
    [currentSquares, currentMove, gameOver, history, nextPlayer]
  );

  /**
   * Jumps the view to any move in history (time-travel).
   * @param {number} move - Target move index.
   */
  const handleJumpTo = useCallback((move) => {
    setCurrentMove(move);
  }, []);

  /** Starts a brand-new game while keeping the scores intact. */
  const handleNewGame = useCallback(() => {
    setHistory([EMPTY_BOARD]);
    setCurrentMove(0);
  }, []);

  /** Resets scores and starts a fresh game. */
  const handleResetAll = useCallback(() => {
    setHistory([EMPTY_BOARD]);
    setCurrentMove(0);
    setScores(INITIAL_SCORES);
  }, []);

  return (
    <div className="game">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="game__header">
        <h1 className="game__title">Tic-Tac-Toe</h1>
        <ScoreBoard scores={scores} />
      </header>

      {/* ── Status banner ──────────────────────────────────── */}
      <p
        className={`game__status${gameOver ? " game__status--over" : ""}`}
        aria-live="polite"
      >
        {statusMessage}
      </p>

      {/* ── Main content: board + history ──────────────────── */}
      <main className="game__content">
        <Board
          squares={currentSquares}
          winningLine={winResult?.line ?? null}
          gameOver={gameOver}
          onSquareClick={handleSquareClick}
        />
        <History
          moveCount={history.length - 1}
          currentMove={currentMove}
          onJumpTo={handleJumpTo}
        />
      </main>

      {/* ── Action buttons ─────────────────────────────────── */}
      <footer className="game__footer">
        <button className="btn btn--primary" onClick={handleNewGame}>
          New Game
        </button>
        <button className="btn btn--secondary" onClick={handleResetAll}>
          Reset Scores
        </button>
      </footer>
    </div>
  );
}
