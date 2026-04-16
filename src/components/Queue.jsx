import React from "react";

export default function Queue({ queue }) {
  return (
    <div>
      
      <div style={{ display: "flex", gap: "10px" }}>
        {queue.map((val, index) => (
          <div
            key={index}
            className="tile"
            draggable={index === 0} // only first tile draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("value", val);
            }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
}