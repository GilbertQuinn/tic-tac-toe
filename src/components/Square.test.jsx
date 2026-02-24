import { render, screen, fireEvent } from '@testing-library/react';
import Square from './Square';

describe('Square component', () => {
  it('renders empty square with accessible label', () => {
    render(<Square value={null} onClick={() => {}} />);
    const button = screen.getByRole('button', { name: /empty square/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('displays value and is disabled when occupied', () => {
    render(<Square value="X" onClick={() => {}} />);
    const button = screen.getByRole('button', { name: /occupied by X/i });
    expect(button).toHaveTextContent('X');
    expect(button).toBeDisabled();
  });

  it('calls onClick when clicked if not disabled', () => {
    const handle = vi.fn();
    render(<Square value={null} onClick={handle} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handle).toHaveBeenCalledTimes(1);
  });
});
