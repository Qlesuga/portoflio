interface DesktopIconProps {
  createDraggableWindow: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ createDraggableWindow }) => {
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
        <div
          style={{
            width: 48,
            height: 48,
            margin: "0 auto",
            backgroundColor: "#ccc",
            border: "2px solid #888",
            borderRadius: 6,
          }}
        />
        <div style={{ fontSize: 12, marginTop: 4 }}>Voices</div>
      </div>
    </>
  );
};

export default DesktopIcon;
