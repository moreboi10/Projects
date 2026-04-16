export default function Tile({ value }) {
  const getTileClass = () => {
    if (value === 2 || value === 3) return "tile tile-yellow";
    if (value === 4 || value === 5) return "tile tile-orange";
    if (value === 6 || value === 8) return "tile tile-red";
    if (value === 9 || value === 12) return "tile tile-green";
    if (value >= 15) return "tile tile-purple";

    return "tile";
  };

  return <div className={getTileClass()}>{value}</div>;
}