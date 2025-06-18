import React, { useRef, useState, useEffect } from "react";
import { type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface Position {
  x: number;
  y: number;
}

interface DraggableWindowProps {
  titleID: string;
  title?: string;
  children: React.ReactNode;
  zIndex: React.RefObject<number>;
  initZIndex: number;
  initialPosition?: Position;
  initHeight?: number;
  initWidth?: number;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({
  titleID,
  title,
  children,
  initialPosition,
  zIndex,
  initZIndex,
}) => {
  const [position, setPosition] = useState<Position>(
    initialPosition ?? {
      x: -10000,
      y: -10000,
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

    rel.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    e.preventDefault();
  };

  const changeFocus = () => {
    if (zIndex.current > currentZIndex) {
      zIndex.current = zIndex.current + 1;
      setCurrentZIndex(zIndex.current);
    }
  };

  const onMouseMove = (e: MouseEvent | globalThis.MouseEvent) => {
    if (!dragging.current || !windowRef.current) return;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const rect = windowRef.current.getBoundingClientRect();
    console.log(rect);

    setPosition({
      x: Math.min(
        Math.max(0, e.clientX - rel.current.x),
        screenWidth - rect.width,
      ),
      y: Math.min(
        Math.max(0, e.clientY - rel.current.y),
        screenHeight - rect.height,
      ),
    });
  };

  console.log(position);

  const onMouseUp = () => {
    dragging.current = false;
    setIsDragging(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    const { width: componentWidth, height: componentHeigh } = rect;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const center = {
      x: screenWidth / 2 - componentWidth / 2,
      y: screenHeight / 2 - componentHeigh / 2,
    };
    setPosition(center);
  }, []);

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
        background: "#333",
        userSelect: "none",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
        zIndex: currentZIndex,
        overflowY: "hidden",
      }}
      onClick={changeFocus}
    >
      <div
        style={{
          background: "#333",
          color: "white",
          height: 36,
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
        {/*eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing*/}
        <span>{title ? title : t(`${titleID}.title`)}</span>
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
          borderRadius: "0 0 16px 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableWindow;
