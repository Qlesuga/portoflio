import React, { useRef, useState } from "react";
import { type MouseEvent } from "react";

interface Position {
  x: number;
  y: number;
}

interface DraggableWindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: Position;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
}) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const dragging = useRef(false);
  const rel = useRef<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    dragging.current = true;
    setIsDragging(true);
    rel.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent | globalThis.MouseEvent) => {
    if (!dragging.current) return;

    setPosition({
      x: e.clientX - rel.current.x,
      y: e.clientY - rel.current.y,
    });
  };

  const onMouseUp = () => {
    dragging.current = false;
    setIsDragging(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      ref={windowRef}
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: 300,
        border: "2px solid #444",
        borderRadius: 6,
        background: "#eee",
        userSelect: "none",
        cursor: isDragging ? "grabbing" : "grab",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: "#333",
          color: "white",
          padding: "8px 10px",
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            lineHeight: 1,
          }}
          title="Close"
        >
          ×
        </button>
      </div>
      <div style={{ padding: 10 }}>{children}</div>
    </div>
  );
};

export default DraggableWindow;
