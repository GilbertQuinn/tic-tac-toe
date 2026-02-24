import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';

// A very basic integration smoke test
it('renders game and allows a move', () => {
  render(<Game />);
  const firstSquare = screen.getAllByRole('button')[0];
  fireEvent.click(firstSquare);
  expect(firstSquare).toHaveTextContent('X');
});
