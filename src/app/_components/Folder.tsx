import { useState } from "react";
import { TextEditor } from "./TextEditor";
import FolderIcon from "./FolderIcon";
import { ImageWindow } from "./ImageWindow";

type icon = {
  name: string;
  icon: string;
  titleID: string;
  title?: string;
  component: React.ReactNode;
  isSelected?: boolean;
};

type AvaiablePaths = "/home/klu/Desktop/private" | "/home/klu/Desktop/projects";

const Folders: Record<AvaiablePaths, icon[]> = {
  "/home/klu/Desktop/private": [
    {
      name: "browser history.txt",
      titleID: "textEditor",
      icon: "/file.png",
      component: <TextEditor fileID="browserHistory" />,
    },
    {
      name: "notes.txt",
      titleID: "textEditor",
      icon: "/file.png",
      component: <TextEditor fileID="notesToSelf" />,
    },
    {
      name: "smoleg.png",
      titleID: "imageViewer",
      icon: "/smoleg.png",
      component: <ImageWindow imageSrc="/smoleg.png" />,
    },
  ],
  "/home/klu/Desktop/projects": [
    {
      name: "jajowall",
      titleID: "imageViewer",
      icon: "/smoleg.png",
      component: <ImageWindow imageSrc="/smoleg.png" />,
    },
    {
      name: "familylynk",
      titleID: "imageViewer",
      icon: "/familylynk.svg",
      component: <ImageWindow imageSrc="/familylynk.svg" />,
    },
    {
      name: "bajojajo sr",
      titleID: "imageViewer",
      icon: "/smoleg.png",
      component: <ImageWindow imageSrc="/smoleg.png" />,
    },
  ],
};

interface FolderProps {
  path: AvaiablePaths;
}

export function Folder({ path }: FolderProps) {
  const [icons] = useState(Folders[path]);
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  const selectIcon = (name: string) => {
    const iconIndex = icons.findIndex((icon) => icon.name === name);
    setSelectedIcon(iconIndex);
  };

  return (
    <div
      style={{
        width: 500,
        height: 400,
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #333",
          backgroundColor: "#333",
          height: 40,
          paddingBottom: 8,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            backgroundColor: "#121212",
            margin: "0 16px",
            padding: "8px 0",
            paddingLeft: 8,
            width: "100%",
            border: "1px solid black",
            borderRadius: 8,
          }}
        >
          {path}
        </span>
      </div>
      <div
        style={{
          backgroundColor: "#121212",
          height: "calc(100% - 40px)",
          padding: 8,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {icons.map((icon, i) => (
          <FolderIcon
            key={`icon-${icon.name}`}
            name={icon.name}
            titleID={icon.titleID}
            title={icon.title}
            component={icon.component}
            icon={icon.icon}
            selectIcon={selectIcon}
            isSelected={selectedIcon === i}
          />
        ))}
      </div>
    </div>
  );
}
