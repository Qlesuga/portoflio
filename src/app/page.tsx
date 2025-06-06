"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import DesktopIcon from "./_components/DesktopIcon.tsx";
import DraggableWindow from "./_components/DraggableWindow.tsx";
import TopBar from "./_components/Topbar.tsx";
import BottomBar from "./_components/BottomBar.tsx";
import "./i18n.js";
import "./index.css";

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
    icon: "/folder_code.svg",
  },
  {
    name: "Arkusze Styów CSS",
    icon: "/folder.svg",
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
          const audio = new Audio("/click_in.wav");
          audio.volume = VOLUME;
          audio.play().catch(() => {
            return;
          });
        }
      }, CLICK_THRESHOLD);
    };

    const handleMouseUp = () => {
      if (mouseDownTime) {
        const clickDuration = Date.now() - mouseDownTime;
        if (clickDuration <= CLICK_THRESHOLD) {
          playMouseIn = false;
          const audio = new Audio("/click.mp3");
          audio.volume = VOLUME;
          audio.play().catch(() => {
            return;
          });
        } else {
          const audio = new Audio("/click_out.wav");
          audio.volume = VOLUME;
          audio.play().catch(() => {
            return;
          });
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
