# Tic-Tac-Toe

A modern, accessible two-player Tic-Tac-Toe game built with **React 19** and **Vite 6**.

## Features

- Classic 3×3 Tic-Tac-Toe gameplay
- Win & draw detection with visual highlighting
- Persistent score tracker across rounds
- Full move history with time-travel (jump to any past state)
- Responsive design — works on desktop and mobile
- Keyboard accessible and screen-reader friendly

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev) | UI components & state management |
| [Vite 6](https://vite.dev) | Dev server & production bundler |

## Project Structure

```
tic-tac-toe/
├── public/                  Static assets
├── src/
│   ├── components/
│   │   ├── Game.jsx         Root game component (state owner)
│   │   ├── Board.jsx        3×3 grid renderer
│   │   ├── Square.jsx       Individual cell button
│   │   ├── History.jsx      Move history sidebar
│   │   └── ScoreBoard.jsx   Win/draw counters
│   ├── utils/
│   │   └── gameLogic.js     Pure game logic (winner, draw, status)
│   ├── App.jsx              App shell
│   ├── App.css              All component styles
│   └── index.css            Global reset & design tokens
├── README.md                This file
└── SPEC.md                  Full game specification
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Install & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (or the next available port).

### Other Scripts

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
npm run test     # Run unit tests via Vitest
```

## How to Play

1. Player **X** always goes first.
2. Click any empty square to place your mark.
3. The first player to get **3 in a row** (horizontally, vertically, or diagonally) wins.
4. If all 9 squares are filled with no winner, the game is a **draw**.
5. Use **New Game** to play another round (scores are kept).
6. Use **Reset Scores** to zero out the scoreboard.
7. Click any entry in **Move History** to jump back (or forward) to that point in the game.

## Documentation

See [SPEC.md](./SPEC.md) for the full game specification, component architecture, and design decisions.

## Testing 🧪

The game logic and React components are covered by a suite of unit tests powered by [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/docs/react-testing-library/).

- Run `npm run test` to execute all tests in the `src` directory.
- Configuration lives in `vite.config.js` and setup helpers are in `src/setupTests.js`.
- Tests reside alongside their implementation (`*.test.js`, `*.test.jsx`).

You can build on the existing tests or add new ones when extending the app.
