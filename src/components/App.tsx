import { useEffect, useRef, useState } from "react";
import DesktopIcon from "./DesktopIcon";
import DraggableWindow from "./DraggableWindow";
import TopBar from "./Topbar";
import BottomBar from "./BottomBar";
import ContactPage from "./ContactPage";

interface WindowConfig {
  title: string;
  initZIndex: number;
  children: React.ReactNode;
}

export default function App() {
  const zIndex = useRef(0);
  const [windows, setWindows] = useState<WindowConfig[]>([]);

  const createDraggableWindow = (title: string, children: React.ReactNode) => {
    setWindows((prev) => [
      ...prev,
      {
        title: title,
        initZIndex: zIndex.current++,
        children: children,
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
      <BottomBar createDraggableWindow={createDraggableWindow} />
      {windows.map((win) => (
        <DraggableWindow
          key={win.initZIndex}
          title={win.title}
          initZIndex={win.initZIndex}
          zIndex={zIndex}
        >
          {win.children}
        </DraggableWindow>
      ))}
    </div>
  );
}
