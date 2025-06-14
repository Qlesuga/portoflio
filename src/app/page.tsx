"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import DesktopIcon from "./_components/DesktopIcon.tsx";
import DraggableWindow from "./_components/DraggableWindow.tsx";
import TopBar from "./_components/Topbar.tsx";
import BottomBar from "./_components/BottomBar.tsx";
import "./i18n.js";
import "./index.css";
import { ImageWindow } from "./_components/ImageWindow.tsx";
import { TextEditor } from "./_components/TextEditor.tsx";
import { PasswordProtected } from "./_components/PasswordProtected.tsx";
import { Folder } from "./_components/Folder.tsx";
import { CreateWindowContex } from "./context.ts";

interface WindowConfig {
  titleID: string;
  title?: string;
  initZIndex: number;
  children: React.ReactNode;
}

type icon = {
  name: string;
  icon: string;
  titleID: string;
  title?: string;
  component: ReactNode;
  isSelected?: boolean;
};

const icons: icon[] = [
  {
    name: "projects",
    titleID: "projects",
    icon: "/folder_code.png",
    component: <Folder path="/home/klu/Desktop/projects" />,
  },
  {
    name: "priavte",
    titleID: "private",
    title: "private",
    icon: "/folder.svg",
    component: (
      <PasswordProtected passwordID="PriavteFolder">
        <Folder path="/home/klu/Desktop/private" />
      </PasswordProtected>
    ),
  },
  {
    name: "password.txt",
    titleID: "textEditor",
    icon: "/file.png",
    component: <TextEditor fileID="password" />,
  },
  {
    name: "wallpaper.png",
    titleID: "imageViewer",
    icon: "/default.png",
    component: <ImageWindow imageSrc="/default.png" />,
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

  const createDraggableWindow = (
    titleID: string,
    children: React.ReactNode,
    title: string | undefined = undefined,
  ) => {
    setWindows((prev) => [
      ...prev,
      {
        titleID: titleID,
        title: title,
        initZIndex: windowsZIndex.current++,
        children: children,
      },
    ]);
  };

  useEffect(() => {
    let mouseDownTime: number | null = null;
    let playMouseIn = true;
    const CLICK_THRESHOLD = 150; // ms
    const VOLUME = 0.1;

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
          const audio = new Audio("/click.wav");
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
    <CreateWindowContex.Provider value={createDraggableWindow}>
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
              titleID={icon.titleID}
              title={icon.title}
              component={icon.component}
              icon={icon.icon}
              selectIcon={selectIcon}
              isSelected={selectedIcon === i}
              initZIndex={i}
              zIndex={iconsZIndex}
            />
          ))}
        </div>
        <BottomBar />
        {windows.map((win) => (
          <DraggableWindow
            key={win.initZIndex}
            titleID={win.titleID}
            title={win.title}
            initZIndex={win.initZIndex}
            zIndex={windowsZIndex}
          >
            {win.children}
          </DraggableWindow>
        ))}
      </div>
    </CreateWindowContex.Provider>
  );
}
