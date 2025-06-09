import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

interface Position {
  x: number;
  y: number;
}

interface DesktopIconProps {
  createDraggableWindow: (title: string, children: React.ReactNode) => void;
  selectIcon: (name: string) => void;
  name: string;
  icon: string;
  titleID: string;
  component: ReactNode;
  isSelected?: boolean;
  initZIndex: number;
  zIndex: React.RefObject<number>;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  createDraggableWindow,
  name,
  icon,
  selectIcon,
  component,
  titleID,
  isSelected = false,
  initZIndex,
  zIndex,
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
    if (currentZIndex != zIndex.current) {
      zIndex.current = zIndex.current + 1;
      setCurrentZIndex(zIndex.current);
    }
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
        maxHeight: 90,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
        position: "relative",
        top: position.y,
        left: position.x,
        padding: 4,
        paddingTop: 8,
        gap: 2,
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
      onDoubleClick={() => createDraggableWindow(titleID, component)}
      onMouseDown={(e) => {
        selectIcon(name);
        onMouseDown(e);
      }}
      onMouseUp={onMouseUp}
    >
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        alt={name}
        height={36}
        src={icon}
        style={{
          objectFit: "contain",
          maxHeight: 36,
        }}
      />
      <span
        style={{
          width: "100%",
          fontSize: "16px",
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;
