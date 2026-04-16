import useGameState from "./hooks/useGameState";
import Grid from "./components/Grid";
import Queue from "./components/Queue";
import Keep from "./components/Keep";
import Trash from "./components/Trash";
import { useEffect, useState } from "react";

function App() {
  const {
    grid,
    placeTile,
    queue,
    keepVal,
    handleKeep,
    handleTrash,
    trashCount,
    score,
    level,
    undo,
    isGameOver,
    bestScore,
  } = useGameState();

  const [time, setTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const handleRestart = () => {
    window.location.reload();
  };

  const handleFirstMove = (row, col) => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    placeTile(row, col);
  };

  useEffect(() => {
    if (!hasStarted || isGameOver) return;

    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, isGameOver]);

  const formatTime = (t) => {
    const min = String(Math.floor(t / 60)).padStart(2, "0");
    const sec = String(t % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="app">
      <div className="title-container">
        <div className="title-box">JUST DIVIDE</div>
        <div className="timer">{formatTime(time)}</div>
      </div>

      <div className="game-wrapper">
        <main className="grid-container">
   <img src="/catimg.png" alt="cat" className="kawaii-cat" />
          <div className="badge level-badge">LEVEL {level}</div>
          <div className="badge score-badge">SCORE {score}</div>
          <Grid grid={grid} placeTile={handleFirstMove} />
        </main>

        <aside className="side-panel">
          <div className="panel-section">
            <span className="panel-label">KEEP</span>
            <Keep keepVal={keepVal} handleKeep={handleKeep} />
          </div>

          <div className="panel-section">
            <span className="panel-label">NEXT</span>
            <Queue queue={queue} />
          </div>

          <div className="panel-section">
            <Trash handleTrash={handleTrash} trashCount={trashCount} />
          </div>

          <button className="undo-btn" onClick={undo}>
            UNDO
          </button>
        </aside>

        <div className="side-spacer"></div>
      </div>

      {isGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-box">
            <h2>Game Over</h2>
            <p>Score: {score}</p>
            <p>Best: {bestScore}</p>
            <button onClick={handleRestart}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;