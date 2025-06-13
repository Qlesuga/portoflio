import { useContext, useRef, type ReactNode } from "react";
import { CreateWindowContex } from "../context";

interface DesktopIconProps {
  selectIcon: (name: string) => void;
  name: string;
  icon: string;
  titleID: string;
  title?: string;
  component: ReactNode;
  isSelected?: boolean;
}

export default function FolderIcon({
  name,
  icon,
  selectIcon,
  component,
  titleID,
  title,
  isSelected = false,
}: DesktopIconProps) {
  const windowRef = useRef<HTMLDivElement | null>(null);
  const createDraggableWindow = useContext(CreateWindowContex);

  return (
    <div
      ref={windowRef}
      style={{
        width: 100,
        maxHeight: 90,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
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
      }}
      onDoubleClick={() => createDraggableWindow(titleID, component, title)}
      onMouseDown={() => selectIcon(name)}
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
}
