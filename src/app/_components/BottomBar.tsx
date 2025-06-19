import type React from "react";
import { useContext, useState } from "react";
import { Mail, Github, ChartNoAxesColumn, MailOpen } from "lucide-react";
import "./bottomBar.css";
import ContactPage from "./ContactPage";
import SkillsPage from "./SkillsPage";
import Image from "next/image";
import { CreateWindowContex } from "../context";
import { Folder } from "./Folder";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }> | string;
  iconOnHover?: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  color?: string;
}

const navItems: NavItem[] = [
  {
    id: "skills",
    icon: ChartNoAxesColumn,
    label: "Skills",
    color: "#10b981",
  },
  {
    id: "projects",
    icon: "/folder_code.png",
    label: "Projects",
  },
  {
    id: "contact",
    icon: Mail,
    iconOnHover: MailOpen,
    label: "Contact",
    color: "#8b5cf6",
  },
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    color: "#1f2937",
  },
];

export default function BottomBar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const createDraggableWindow = useContext(CreateWindowContex);

  const handleItemClick = (itemId: string) => {
    if (itemId === "github") {
      window.open("https://www.github.com/Qlesuga", "_blank");
    } else if (itemId === "contact") {
      createDraggableWindow("contact", <ContactPage />);
    } else if (itemId === "skills") {
      createDraggableWindow("skills", <SkillsPage />);
    } else if (itemId == "projects") {
      createDraggableWindow(
        "",
        <Folder path="/home/klu/Desktop/projects" />,
        "File Viewer - projects",
      );
    }
  };

  return (
    <div className="bottom-bar">
      <nav className="bottom-bar-container">
        <ul className="bottom-bar-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isPath = typeof Icon === "string";
            const isHovered = hoveredItem === item.id;

            return (
              <li key={item.id} className="bottom-bar-item">
                <button
                  className="bottom-bar-button"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick(item.id)}
                  style={{ "--item-color": item.color } as React.CSSProperties}
                >
                  <div
                    className={`icon-container ${isHovered ? "hovered" : ""}`}
                    style={{
                      border: `${isPath ? "None" : "2px solid rgba(255, 255, 255, 0.2)"}`,
                      width: 36,
                      height: 36,
                    }}
                  >
                    {isPath ? (
                      <Image
                        src={Icon}
                        alt={item.label}
                        className="nav-icon"
                        width={36}
                        height={36}
                      />
                    ) : isHovered && item.iconOnHover ? (
                      <item.iconOnHover size={24} className="nav-icon" />
                    ) : (
                      <Icon size={24} className="nav-icon" />
                    )}
                  </div>

                  <span className={`item-label ${isHovered ? "visible" : ""}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
