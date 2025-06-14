import { useRef, useState, type FormEvent } from "react";

type PasswordsIDs = "PriavteFolder";

interface propsPasswordProtected {
  passwordID: PasswordsIDs;
  children: React.ReactNode;
}

const passwordStates: Record<
  PasswordsIDs,
  { unlocked: boolean; password: string }
> = {
  PriavteFolder: { unlocked: false, password: "Qles123" },
};

export function PasswordProtected({
  children,
  passwordID,
}: propsPasswordProtected) {
  const passwordInput = useRef<HTMLInputElement>(null);

  const unlockPassword = passwordStates[passwordID].password;
  const [isUnlocked, setIsUnlocked] = useState(
    passwordStates[passwordID].unlocked,
  );

  const [message, setMessage] = useState("");

  const submitPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordInput.current?.value == unlockPassword) {
      passwordStates[passwordID].unlocked = true;
      setIsUnlocked(true);
      return;
    }
    setMessage("Wrong Password");
  };

  if (isUnlocked) return children;

  return (
    <form
      style={{
        color: "#ffffff",
        background: "#121212",
        fontFamily: "var(--font-roboto)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 8,
        width: 280,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        border: "1px solid #333",
      }}
      onSubmit={submitPassword}
    >
      <label
        style={{
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Enter Password:
      </label>

      <input
        ref={passwordInput}
        autoFocus
        type="password"
        style={{
          padding: 12,
          backgroundColor: "#1e1e1e",
          border: "1px solid #444",
          borderRadius: 6,
          color: "#ffffff",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#007acc")}
        onBlur={(e) => (e.target.style.borderColor = "#444")}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#ff6b6b",
            fontSize: 16,
          }}
        >
          {message}
        </span>

        <button
          style={{
            padding: "6px 20px",
            backgroundColor: "#007acc",
            color: "#ffffff",
            border: "none",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          type="submit"
        >
          OK
        </button>
      </div>
    </form>
  );
}
