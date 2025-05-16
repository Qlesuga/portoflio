import React, { useState, useEffect, useRef } from "react";
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
  const [dragging, setDragging] = useState<boolean>(false);
  const [rel, setRel] = useState<Position | null>(null);
  const windowRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    e.preventDefault();
  };
  const onMouseMove = (e: MouseEvent<Document>) => {
    if (!dragging || !rel) return;

    setPosition({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y,
    });
    e.preventDefault();
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove as any);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove as any);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove as any);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

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
        cursor: dragging ? "grabbing" : "grab",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          background: "#333",
          color: "white",
          padding: "8px",
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          fontWeight: "bold",
          cursor: "grab",
        }}
      >
        {title}
      </div>
      <div style={{ padding: 10 }}>{children}</div>
    </div>
  );
};

export default DraggableWindow;
