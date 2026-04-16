export function applyMerge(grid, row, col) {
  let newGrid = grid.map(r => [...r]);
  let scoreGained = 0;

  let changed = true;

  while (changed) {
    changed = false;

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const value = newGrid[r][c];
        if (value === null) continue;

        const directions = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0]
        ];

        for (let [dx, dy] of directions) {
          const nr = r + dx;
          const nc = c + dy;

          if (nr < 0 || nr >= 4 || nc < 0 || nc >= 4) continue;

          const neighbor = newGrid[nr][nc];
          if (neighbor === null) continue;

          // ✅ Equal tiles
          if (neighbor === value) {
            newGrid[r][c] = null;
            newGrid[nr][nc] = null;
            scoreGained += value * 2;
            changed = true;
            break;
          }

          // ✅ Divisible
          if (value > neighbor && value % neighbor === 0) {
            const result = value / neighbor;

            newGrid[r][c] = result === 1 ? null : result;
            newGrid[nr][nc] = null;

            scoreGained += result;
            changed = true;
            break;
          }

          if (neighbor > value && neighbor % value === 0) {
            const result = neighbor / value;

            newGrid[nr][nc] = result === 1 ? null : result;
            newGrid[r][c] = null;

            scoreGained += result;
            changed = true;
            break;
          }
        }
      }
    }
  }

  return { newGrid, scoreGained };
}