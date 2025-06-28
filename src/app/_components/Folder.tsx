import { useState } from "react";
import { TextEditor } from "./TextEditor";
import FolderIcon from "./FolderIcon";
import { ImageWindow } from "./ImageWindow";
import ProjectDescription from "./ProjectDescription";

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
      icon: "/file.webp",
      component: <TextEditor fileID="browserHistory" />,
    },
    {
      name: "notes.txt",
      titleID: "textEditor",
      icon: "/file.webp",
      component: <TextEditor fileID="notesToSelf" />,
    },
    {
      name: "smoleg.webp",
      titleID: "imageViewer",
      icon: "/smoleg.webp",
      component: <ImageWindow imageSrc="/smoleg.webp" />,
    },
  ],
  "/home/klu/Desktop/projects": [
    {
      name: "jajowall",
      titleID: "",
      title: "Projectpedia - jajowall",
      icon: "/smoleg.webp",
      component: <ProjectDescription projectID="jajowall" />,
    },
    {
      name: "familylynk",
      titleID: "",
      title: "Projectpedia - familylynk",
      icon: "/familylynk.svg",
      component: <ProjectDescription projectID="familylynk" />,
    },
    {
      name: "lily58",
      titleID: "",
      title: "Projectpedia - lily58",
      icon: "/lily58.webp",
      component: <ProjectDescription projectID="lily58" />,
    },
    {
      name: "bajojajo sr",
      titleID: "",
      title: "Projectpedia - bajojajo sr",
      icon: "/smoleg.webp",
      component: <ProjectDescription projectID="bajojajosr" />,
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
          borderRadius: "0 0 9px 9px",
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
