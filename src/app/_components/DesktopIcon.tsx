import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";

interface Position {
  x: number;
  y: number;
}

interface DesktopIconProps {
  createDraggableWindow: (title: string, children: React.ReactNode) => void;
  selectIcon: (name: string) => void;
  name: string;
  icon: string;
  isSelected?: boolean;
  initZIndex: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  createDraggableWindow,
  name,
  icon,
  selectIcon,
  isSelected = false,
  initZIndex,
}) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const initialPosition = useRef<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef(false);
  const rel = useRef<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement | null>(null);
  const [currentZIndex, setCurrentZIndex] = useState(initZIndex);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (
      e.button !== 0 ||
      !windowRef.current ||
      !initialPosition.current ||
      isDragging
    )
      return;
    setCurrentZIndex(1000);
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
      x: e.clientX - rel.current.x - initialPosition.current!.x,
      y: e.clientY - rel.current.y - initialPosition.current!.y,
    });
  };

  const onMouseUp = () => {
    dragging.current = false;
    setIsDragging(false);
    setCurrentZIndex(initZIndex);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  useEffect(() => {
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;
    initialPosition.current = {
      x: rect.x,
      y: rect.y,
    };
  }, []);
  return (
    <div
      ref={windowRef}
      style={{
        width: 90,
        height: 90,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        top: position.y,
        left: position.x,
        padding: 4,
        textShadow:
          "-1px -1px 0 black, \
             0px -1px 0 black, \
             1px -1px 0 black, \
             -1px  0px 0 black, \
             1px  0px 0 black, \
             -1px  1px 0 black, \
             0px  1px 0 black, \
             1px  1px 0 black",
        color: "white",
        backgroundColor: isSelected
          ? "rgba(255, 255, 255, 0.2)"
          : "transparent",
        zIndex: currentZIndex,
      }}
      onDoubleClick={() => createDraggableWindow("test", <p>test</p>)}
      onMouseDown={(e) => {
        selectIcon(name);
        onMouseDown(e);
      }}
      onMouseUp={onMouseUp}
    >
      <Image alt={name} width={48} height={48} src={icon} />
      <span
        style={{
          height: "calc(100% - 48px)",
          width: "100%",
          fontSize: "16px",
          textAlign: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;
