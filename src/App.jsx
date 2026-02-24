/**
 * App.jsx
 * Application root. Renders the Game component centred on the page.
 */

import Game from "./components/Game";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <Game />
    </div>
  );
}
