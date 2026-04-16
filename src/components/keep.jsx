export default function Keep({ keepVal, handleKeep }) {
  return (
    <div>
      <div
        className="cell"
        onClick={handleKeep}
        style={{ cursor: "pointer" }}
      >
        {keepVal && <div className="tile">{keepVal}</div>}
      </div>
    </div>
  );
}