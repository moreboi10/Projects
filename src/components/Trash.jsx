export default function Trash({ handleTrash, trashCount }) {
  return (
    <div>
    <button className="trash-btn" onClick={handleTrash}>
  TRASH {trashCount}
</button>
    </div>
  );
}