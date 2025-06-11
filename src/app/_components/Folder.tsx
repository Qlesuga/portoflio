type AvaiablePaths = "/home/klu/Desktop/private";

interface FolderProps {
  path: AvaiablePaths;
  children: React.ReactNode;
}

export function Folder({ path, children }: FolderProps) {
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
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
}
