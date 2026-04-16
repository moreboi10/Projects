import { useState } from "react";
import { applyMerge } from "../utils/mergeLogic";

export default function useGameState() {
  const [grid, setGrid] = useState(
    Array(4).fill(null).map(() => Array(4).fill(null))
  );

  const [queue, setQueue] = useState([2, 3, 4]);
  const [keepVal, setKeepVal] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );

  const [undoStack, setUndoStack] = useState([]);
  const [level, setLevel] = useState(1);
  const [trashCount, setTrashCount] = useState(3);

  function getRandomTile() {
    const values = [13, 3, 11, 5, 7, 9];
    return values[Math.floor(Math.random() * values.length)];
  }

  function isGridFull(grid) {
    return grid.every(row => row.every(cell => cell !== null));
  }

  function hasMoves(grid) {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const value = grid[r][c];

        if (value === null) return true;

        const directions = [
          [0, 1],
          [1, 0]
        ];

        for (let [dx, dy] of directions) {
          const nr = r + dx;
          const nc = c + dy;

          if (nr >= 4 || nc >= 4) continue;

          const neighbor = grid[nr][nc];

          if (neighbor === value) return true;

          if (
            neighbor !== null &&
            (value % neighbor === 0 || neighbor % value === 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function undo() {
    if (undoStack.length === 0) return;

    const lastState = undoStack[undoStack.length - 1];

    setGrid(lastState.grid);
    setQueue(lastState.queue);
    setScore(lastState.score);
    setLevel(lastState.level);
    setTrashCount(lastState.trashCount);

    setUndoStack(prev => prev.slice(0, -1));
  }

  function placeTile(row, col) {
    if (isGameOver || grid[row][col] !== null) return;

    const prevState = {
      grid: grid.map(r => [...r]),
      queue: [...queue],
      score,
      level,
      trashCount
    };

    setUndoStack(prev => [...prev.slice(-9), prevState]);

    const value = queue[0];

    let newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;

    const { newGrid: mergedGrid, scoreGained } =
     applyMerge(newGrid);

    setGrid(mergedGrid);

    const newScore = score + scoreGained;
    setScore(newScore);

    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem("bestScore", newScore);
    }

    const newLevel = Math.floor(newScore / 10) + 1;

    if (newLevel > level) {
      setLevel(newLevel);
      setTrashCount(prev => prev + 1);
    }

    if (isGridFull(mergedGrid) && !hasMoves(mergedGrid)) {
      setIsGameOver(true);
    }

    setQueue(prev => [...prev.slice(1), getRandomTile()]);
  }

  function handleKeep() {
    if (isGameOver) return;

    const current = queue[0];

    if (keepVal === null) {
      setKeepVal(current);
      setQueue(prev => [...prev.slice(1), getRandomTile()]);
    } else {
      setQueue(prev => [keepVal, ...prev.slice(1)]);
      setKeepVal(current);
    }
  }

  function handleTrash() {
    if (isGameOver || trashCount <= 0) return;

    setTrashCount(prev => prev - 1);
    setQueue(prev => [...prev.slice(1), getRandomTile()]);
  }

  return {
    grid,
    queue,
    keepVal,
    score,
    bestScore,
    undoStack,
    level,
    trashCount,
    isGameOver,
    placeTile,
    undo,
    handleKeep,
    handleTrash,
    setIsGameOver,
  };
}