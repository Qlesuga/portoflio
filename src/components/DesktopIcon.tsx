interface DesktopIconProps {
  createDraggableWindow: () => void;
  name: string;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  createDraggableWindow,
  name,
}) => {
  return (
    <>
      <div
        style={{
          width: 64,
          textAlign: "center",
          cursor: "pointer",
          userSelect: "none",
          margin: 10,
        }}
        onClick={createDraggableWindow}
      >
        <img width={48} height={48} src="src/assets/familylynk.svg" />
        <div style={{ fontSize: 12, marginTop: 4 }}>{name}</div>
      </div>
    </>
  );
};

export default DesktopIcon;
