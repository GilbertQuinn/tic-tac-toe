import { calculateWinner, isDraw, getStatusMessage } from './gameLogic';

describe('gameLogic utilities', () => {
  describe('calculateWinner', () => {
    it('returns null when no one has won', () => {
      const empty = Array(9).fill(null);
      expect(calculateWinner(empty)).toBeNull();
    });

    it('detects a horizontal win', () => {
      const board = ['X', 'X', 'X', null, null, null, null, null, null];
      expect(calculateWinner(board)).toEqual({ winner: 'X', line: [0, 1, 2] });
    });

    it('detects a vertical win', () => {
      const board = ['O', null, null, 'O', null, null, 'O', null, null];
      expect(calculateWinner(board)).toEqual({ winner: 'O', line: [0, 3, 6] });
    });

    it('returns first winning line it finds', () => {
      // even if there are multiple, it should return the first matching entry
      const board = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
      const result = calculateWinner(board);
      expect(result).toBeTruthy();
      expect(result.line).toEqual([0, 1, 2]);
    });
  });

  describe('isDraw', () => {
    it('is false for an empty board', () => {
      expect(isDraw(Array(9).fill(null))).toBe(false);
    });

    it('is false when there is a winner', () => {
      const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      expect(isDraw(board)).toBe(false);
    });

    it('is true for a full board with no winner', () => {
      const board = ['X','O','X','O','X','O','O','X','O'];
      expect(isDraw(board)).toBe(true);
    });
  });

  describe('getStatusMessage', () => {
    it('shows winning message if winner exists', () => {
      expect(getStatusMessage('O', false, 'X')).toBe('Player O wins! 🎉');
    });
    it('shows draw message if draw is true', () => {
      expect(getStatusMessage(null, true, 'X')).toBe("It's a draw! 🤝");
    });
    it('shows next player message otherwise', () => {
      expect(getStatusMessage(null, false, 'O')).toBe("Player O's turn");
    });
  });
});
