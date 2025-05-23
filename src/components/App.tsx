import { useRef, useState } from "react";
import DesktopIcon from "./DesktopIcon";
import DraggableWindow from "./DraggableWindow";
import TopBar from "./Topbar";

interface WindowConfig {
  id: number;
  initZIndex: number;
  children: React.ReactNode;
}

export default function App() {
  const zIndex = useRef(0);
  const nextId = useRef(1);
  const [windows, setWindows] = useState<WindowConfig[]>([]);

  const createDraggableWindow = () => {
    setWindows((prev) => [
      ...prev,
      {
        id: nextId.current++,
        initZIndex: zIndex.current++,
        children: <p>Window #{nextId.current}</p>,
      },
    ]);
  };

  return (
    <div id="root">
      <TopBar />
      <DesktopIcon
        name="Projects"
        icon="src/assets/folder_code.svg"
        createDraggableWindow={createDraggableWindow}
      />
      <DesktopIcon
        name=":3"
        icon="src/assets/folder.svg"
        createDraggableWindow={createDraggableWindow}
      />
      {windows.map((win) => (
        <DraggableWindow
          key={win.id}
          title={`Window ${win.id}`}
          initZIndex={win.initZIndex}
          zIndex={zIndex}
        >
          {win.children}
        </DraggableWindow>
      ))}
    </div>
  );
}
