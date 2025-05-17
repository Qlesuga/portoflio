const DesktopIcon: React.FC = () => {
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
        <div style={{ fontSize: 12, marginTop: 4 }}>My App</div>
      </div>
    </>
  );
};

export default DesktopIcon;
