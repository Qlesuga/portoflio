interface DesktopIconProps {
  createDraggableWindow: (title: string, children: React.ReactNode) => void;
  selectIcon: (name: string) => void;
  name: string;
  icon: string;
  isSelected?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  createDraggableWindow,
  name,
  icon,
  selectIcon,
  isSelected = false,
}) => {
  return (
    <>
      <div
        style={{
          width: 90,
          height: 90,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
          padding: 4,
          textShadow:
            "-1px -1px 0 black, \
             0px -1px 0 black, \
             1px -1px 0 black, \
             -1px  0px 0 black, \
             1px  0px 0 black, \
             -1px  1px 0 black, \
             0px  1px 0 black, \
             1px  1px 0 black",
          color: "white",
          backgroundColor: isSelected
            ? "rgba(255, 255, 255, 0.2)"
            : "transparent",
        }}
        onDoubleClick={() => createDraggableWindow("test", <p>test</p>)}
        onClick={() => selectIcon(name)}
      >
        <img width={48} height={48} src={icon} />
        <span
          style={{
            height: "calc(100% - 48px)",
            width: "100%",
            fontSize: "16px",
            textAlign: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </span>
      </div>
    </>
  );
};

export default DesktopIcon;
