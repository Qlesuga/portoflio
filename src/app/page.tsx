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
import { Toaster } from "~/components/ui/sonner";
import { toast } from "sonner";

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
    titleID: "",
    title: "File Viewer - projects",
    icon: "/folder_code.webp",
    component: <Folder path="/home/klu/Desktop/projects" />,
  },
  {
    name: "priavte",
    titleID: "private",
    title: "File Viewer - private",
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
    icon: "/file.webp",
    component: <TextEditor fileID="password" />,
  },
  {
    name: "wallpaper.webp",
    titleID: "imageViewer",
    icon: "/wallpaper.webp",
    component: <ImageWindow imageSrc="/wallpaper.webp" />,
  },
];

export default function App() {
  const windowsZIndex = useRef(1000);
  const iconsZIndex = useRef(1);
  const [windows, setWindows] = useState<WindowConfig[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  const clickInSound = useRef<HTMLAudioElement>(null);
  const clickOutSound = useRef<HTMLAudioElement>(null);
  const clickSound = useRef<HTMLAudioElement>(null);

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
    clickInSound.current = new Audio("/click_in.wav");
    clickOutSound.current = new Audio("/click_out.wav");
    clickSound.current = new Audio("/click.wav");

    const VOLUME = 0.1;

    clickInSound.current.volume = VOLUME;
    clickOutSound.current.volume = VOLUME;
    clickSound.current.volume = VOLUME;

    let mouseDownTime: number | null = null;
    let playMouseIn = true;
    const CLICK_THRESHOLD = 135;

    const handleMouseDown = () => {
      mouseDownTime = Date.now();
      playMouseIn = true;

      setTimeout(() => {
        if (playMouseIn && mouseDownTime !== null) {
          const audio = clickInSound.current;
          audio!.play().catch(() => {
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
          const audio = clickSound.current;
          audio!.play().catch(() => {
            return;
          });
        } else {
          const audio = clickOutSound.current;
          audio!.play().catch(() => {
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

  const MIN_WIDTH = 1280;
  const MIN_HEIGHT = 720;
  const lastToastTime = useRef(0);
  const COOLDOWN = 3000;

  const checkSize = () => {
    const { innerWidth, innerHeight } = window;
    const shouldShow = innerWidth < MIN_WIDTH || innerHeight < MIN_HEIGHT;
    const now = Date.now();
    if (shouldShow && now - lastToastTime.current > COOLDOWN) {
      toast.error("Please use a larger screen for the best experience.");
      lastToastTime.current = now;
    }
  };

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
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
      <Toaster richColors />
    </CreateWindowContex.Provider>
  );
}
