import { useEffect, useRef, useState } from "react";
import DesktopIcon from "./DesktopIcon";
import DraggableWindow from "./DraggableWindow";
import TopBar from "./Topbar";
import BottomBar from "./BottomBar";

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

  useEffect(() => {
    const handleClick = () => {
      const audio = new Audio("/src/assets/click.mp3");
      audio.volume = 0.05;
      audio.play();
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div id="root" style={{ height: "100vh" }}>
      <TopBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 120px)",
        }}
      >
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
      </div>
      <BottomBar />
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
