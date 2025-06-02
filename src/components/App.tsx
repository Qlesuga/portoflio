import { useEffect, useRef, useState, type MouseEvent } from "react";
import DesktopIcon from "./DesktopIcon";
import DraggableWindow from "./DraggableWindow";
import TopBar from "./Topbar";
import BottomBar from "./BottomBar";
import "../i18n.js";

interface WindowConfig {
  title: string;
  initZIndex: number;
  children: React.ReactNode;
}

type icon = {
  name: string;
  icon: string;
  isSelected?: boolean;
};

const icons: icon[] = [
  {
    name: "Projects",
    icon: "src/assets/folder_code.svg",
  },
  {
    name: "Cwelowe Arkusze Styów",
    icon: "src/assets/folder.svg",
  },
];

export default function App() {
  const windowsZIndex = useRef(1000);
  const iconsZIndex = useRef(1);
  const [windows, setWindows] = useState<WindowConfig[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  const selectIcon = (name: string) => {
    const iconIndex = icons.findIndex((icon) => icon.name === name);
    setSelectedIcon(iconIndex);
  };

  const deselectIcon = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === "desktop") {
      setSelectedIcon(null);
    }
  };

  const createDraggableWindow = (title: string, children: React.ReactNode) => {
    setWindows((prev) => [
      ...prev,
      {
        title: title,
        initZIndex: windowsZIndex.current++,
        children: children,
      },
    ]);
  };

  useEffect(() => {
    let mouseDownTime: number | null = null;
    let playMouseIn = true;
    const CLICK_THRESHOLD = 100; // ms
    const VOLUME = 0.05;

    const handleMouseDown = () => {
      mouseDownTime = Date.now();
      playMouseIn = true;

      setTimeout(() => {
        if (playMouseIn && mouseDownTime !== null) {
          const audio = new Audio("/src/assets/click_in.wav");
          audio.volume = VOLUME;
          audio.play();
        }
      }, CLICK_THRESHOLD);
    };

    const handleMouseUp = () => {
      if (mouseDownTime) {
        const clickDuration = Date.now() - mouseDownTime;
        if (clickDuration <= CLICK_THRESHOLD) {
          playMouseIn = false;
          const audio = new Audio("/src/assets/click.mp3");
          audio.volume = VOLUME;
          audio.play();
        } else {
          const audio = new Audio("/src/assets/click_out.wav");
          audio.volume = VOLUME;
          audio.play();
        }
      }
      mouseDownTime = null;
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
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
        id="desktop"
        onMouseDown={deselectIcon}
      >
        {icons.map((icon, i) => (
          <DesktopIcon
            key={`icon-${icon.name}`}
            name={icon.name}
            icon={icon.icon}
            createDraggableWindow={createDraggableWindow}
            selectIcon={selectIcon}
            isSelected={selectedIcon === i}
            initZIndex={iconsZIndex.current++}
          />
        ))}
      </div>
      <BottomBar createDraggableWindow={createDraggableWindow} />
      {windows.map((win) => (
        <DraggableWindow
          key={win.initZIndex}
          titleID={win.title}
          initZIndex={win.initZIndex}
          zIndex={windowsZIndex}
        >
          {win.children}
        </DraggableWindow>
      ))}
    </div>
  );
}
