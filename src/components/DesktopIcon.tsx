interface DesktopIconProps {
  createDraggableWindow: (title: string, children: React.ReactNode) => void;
  name: string;
  icon: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  createDraggableWindow,
  name,
  icon,
}) => {
  return (
    <>
      <div
        style={{
          width: 80,
          height: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
          margin: 10,
          textShadow:
            "-1px -1px 0 black, \
             0px -1px 0 black, \
             1px -1px 0 black, \
             -1px  0px 0 black, \
             1px  0px 0 black, \
             -1px  1px 0 black, \
             0px  1px 0 black, \
             1px  1px 0 black;",
          color: "white",
        }}
        onClick={() => createDraggableWindow("test", <p>test</p>)}
      >
        <img width={48} height={48} src={icon} />
        <span style={{ fontSize: "16px", textAlign: "center" }}>{name}</span>
      </div>
    </>
  );
};

export default DesktopIcon;
