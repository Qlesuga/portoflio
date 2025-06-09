import { useRef, useState, type ChangeEvent } from "react";

type FilesIDs = "readme";

const textFiles: Record<FilesIDs, string> = {
  readme: "readme",
};

interface TextEditorProps {
  fileID: FilesIDs;
}

export function TextEditor({ fileID }: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>(textFiles[fileID]);
  const [line, setLine] = useState<number>(1);
  const [column, setColumn] = useState<number>(1);

  const handleCursorChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const text = textarea.value;
      const cursorIndex = textarea.selectionStart;

      const linesBeforeCursor = text.slice(0, cursorIndex).split("\n");

      const currentLine = linesBeforeCursor.length;

      const currentColumn = //@ts-ignore
        linesBeforeCursor[linesBeforeCursor.length - 1].length + 1;

      setLine(currentLine);
      setColumn(currentColumn);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    e.preventDefault();
  };

  const saveFile = () => {
    textFiles[fileID] = text;
  };

  return (
    <div
      style={{
        padding: 4,
        borderRadius: "0 0 9px 9px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#333",
        color: "white",
        width: 350,
        height: 450,
        marginTop: -4,
      }}
    >
      <span
        onClick={saveFile}
        style={{
          height: 15,
          fontSize: "1rem",
          marginBottom: 4,
          cursor: "pointer",
        }}
      >
        Save
      </span>
      <textarea
        ref={textareaRef}
        value={text}
        spellCheck={false}
        onChange={handleInput}
        onClick={handleCursorChange}
        onKeyUp={handleCursorChange}
        onSelect={handleCursorChange}
        style={{
          height: "calc(100% - 30px)",
          resize: "none",
          border: "1px solid black",
          outline: "none",
          fontSize: "1rem",
          backgroundColor: "#121212",
          color: "white",
          fontFamily: "var(--font-roboto)",
        }}
      />
      <div
        style={{
          height: 15,
          fontSize: "0.75rem",
        }}
      >
        Ln {line}, Col {column}
      </div>
    </div>
  );
}
