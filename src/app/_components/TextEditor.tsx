import { useRef, useState, type ChangeEvent } from "react";

type FilesIDs = "readme" | "password" | "notesToSelf" | "browserHistory";

const textFiles: Record<FilesIDs, string> = {
  readme:
    "\
Welcome to my portfolio!\n\
Please enjoy, and explore as much as you would like.\n\
  ",
  password: "Qles123",
  browserHistory:
    "\
19:03 – how to center a div\n\
19:07 – why isn't my css working\n\
19:08 – css not working even though it should be working\n\
19:29 – difference between == and === and what is life\n\
19:30 – how to center a div\n\
19:55 – react is not reacting\n\
20:00 – how to center a div\n\
20:02 – undo git force push\n\
20:32 – recursion vs existential crisis\n\
22:42 – learn rust without crying\n\
23:00 – how to center a div\n\
23:09 – how to explain tech debt to non-tech\n\
23:58 – how to center a div\n\
  ",
  notesToSelf:
    "\
1. Never use password managers they just complicate things\n\
2. Push to production on friday dawn\n\
3. console.log is best debbuging method\n\
4. Works on my firefox\n\
5. Removed Herobrine\n\
6. Cake in fact isn't a lie\n\
7. I should try terraria\n\
7. I should try minecraft\n\
8. Pull out the arrow from the knee, it bothers me while adventuring\
",
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
