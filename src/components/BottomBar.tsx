import type React from "react";
import { useState } from "react";
import { Mail, User, Github, ChartNoAxesColumn, MailOpen } from "lucide-react";
import "./bottomBar.css";
import ContactPage from "./ContactPage";
import SkillsPage from "./SkillsPage";

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
    icon: "/public/folder_code.svg",
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
    id: "about",
    icon: User,
    label: "About",
    color: "#f59e0b",
  },
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    color: "#1f2937",
  },
];

interface BottomBarProps {
  createDraggableWindow: (title: string, children: React.ReactNode) => void;
}

export default function BottomBar({ createDraggableWindow }: BottomBarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    console.log(`Clicked on ${itemId}`);
    if (itemId === "github") {
      window.open("https://www.github.com/Qlesuga", "_blank");
    } else if (itemId === "contact") {
      createDraggableWindow("contact", <ContactPage />);
    } else if (itemId === "skills") {
      createDraggableWindow("skills", <SkillsPage />);
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
                    }}
                  >
                    {isPath ? (
                      <img
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
