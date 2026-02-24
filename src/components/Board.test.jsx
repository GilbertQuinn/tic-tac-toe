import { render, screen } from '@testing-library/react';
import Board from './Board';

const empty = Array(9).fill(null);

describe('Board component', () => {
  it('renders nine square buttons', () => {
    render(
      <Board
        squares={empty}
        winningLine={null}
        gameOver={false}
        onSquareClick={() => {}}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(9);
  });

  it('highlights winning squares', () => {
    const winningLine = [0, 1, 2];
    render(
      <Board
        squares={[ 'X', 'X', 'X', ...Array(6).fill(null) ]}
        winningLine={winningLine}
        gameOver={true}
        onSquareClick={() => {}}
      />
    );
    winningLine.forEach((idx) => {
      const button = screen.getAllByRole('button')[idx];
      expect(button).toHaveClass('square--winning');
    });
  });
});
