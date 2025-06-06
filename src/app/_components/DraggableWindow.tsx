import React, { useRef, useState } from "react";
import { type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface Position {
  x: number;
  y: number;
}

interface DraggableWindowProps {
  titleID: string;
  children: React.ReactNode;
  zIndex: React.RefObject<number>;
  initZIndex: number;
  initialPosition?: Position;
  initHeight?: number;
  initWidth?: number;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  titleID,
  children,
  initialPosition,
  zIndex,
  initZIndex,
}) => {
  const [position, setPosition] = useState<Position>(
    initialPosition ?? {
      x: window.screen.width / 8,
      y: window.screen.height / 20,
    },
  );
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentZIndex, setCurrentZIndex] = useState(initZIndex);
  const dragging = useRef(false);
  const rel = useRef<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !windowRef.current || isDragging) return;

    const rect = windowRef.current.getBoundingClientRect();
    dragging.current = true;
    setIsDragging(true);
    if (zIndex.current > currentZIndex) {
      zIndex.current = zIndex.current + 1;
      setCurrentZIndex(zIndex.current);
    }
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
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        border: "2px solid #444",
        borderRadius: 12,
        background: "#eee",
        userSelect: "none",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
        zIndex: currentZIndex,
      }}
    >
      <div
        style={{
          background: "#333",
          color: "white",
          height: 20,
          padding: "8px 10px",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={onMouseDown}
      >
        <span>{t(`${titleID}.title`)}</span>
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
      <div
        style={{
          width: "100%",
          height: "calc(100% - 36px)",
          borderRadius: "0 0 8px 8px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
