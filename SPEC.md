# Tic-Tac-Toe — Game Specification

## Overview

A two-player browser-based Tic-Tac-Toe game built with **React + Vite**.
Players take turns marking squares on a 3×3 grid. The first player to place three marks in a row (horizontally, vertically, or diagonally) wins the round. If all nine squares are filled without a winner, the game ends in a draw.

---

## Rules

| Rule | Detail |
|------|--------|
| Players | 2 (X and O) |
| Board | 3×3 grid (9 squares) |
| Turn order | X always goes first |
| Win condition | 3 matching marks in any row, column, or diagonal |
| Draw condition | All squares filled with no winner |
| Move validity | A square can only be marked once |

### Winning Lines

```
[0][1][2]   ← row 0
[3][4][5]   ← row 1
[6][7][8]   ← row 2

[0][3][6]   ← column 0
[1][4][7]   ← column 1
[2][5][8]   ← column 2

[0][4][8]   ← diagonal ↘
[2][4][6]   ← diagonal ↙
```

---

## Features

### Core Gameplay
- **Interactive board** — click any empty square to place your mark
- **Turn indicator** — status banner always shows whose turn it is
- **Win detection** — winning squares are highlighted in amber with a glow effect
- **Draw detection** — declared when all squares are filled and no winner exists

### Score Tracking
- Persistent **X Wins / Draws / O Wins** scoreboard across multiple rounds
- Scores survive starting a new game; only **Reset Scores** clears them

### Time Travel (Move History)
- Every move is stored in a history stack
- Players can click any entry in the **Move History** panel to rewind or fast-forward the board to that state
- Travelling back and making a new move discards all future states (standard undo behaviour)

### Actions
| Button | Behaviour |
|--------|-----------|
| **New Game** | Clears the board; preserves scores |
| **Reset Scores** | Clears board *and* resets all score counters to 0 |

---

## Component Architecture

```
App
└── Game                  (state owner: history, currentMove, scores)
    ├── ScoreBoard         (display only)
    ├── Board              (display only)
    │   └── Square ×9      (display only)
    └── History            (display only)
```

### Data Flow

- All mutable state lives in `Game`.
- Child components receive data via props and emit events upward via callback props.
- Game logic (winner detection, draw detection, status messages) is isolated in `src/utils/gameLogic.js`.

---

## Accessibility

- Board has `role="grid"` and `aria-label`.
- Each `Square` has an `aria-label` describing its state.
- Status banner uses `aria-live="polite"` so screen readers announce turn changes.
- Buttons are disabled (not hidden) when inactive.

---

## Non-Functional Requirements

| Concern | Approach |
|---------|----------|
| Performance | Callbacks memoised with `useCallback` to avoid unnecessary re-renders |
| Responsiveness | CSS Grid + `clamp()` + media queries; works from 320 px upward |
| Theming | CSS custom properties (tokens) — easy to switch palette |
| Build | Vite for instant HMR during development and optimised production bundles |
