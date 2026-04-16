import Tile from "./Tile";

export default function Grid({ grid, placeTile }) {
  return (
    <div className="grid">
      {grid.map((row, r) =>
        row.map((val, c) => (
          <div
            key={`${r}-${c}`}
            className="cell"
            onClick={() => placeTile(r, c)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              placeTile(r, c);
            }}
          >
            {val && <Tile value={val} />}
          </div>
        ))
      )}
    </div>
  );
}