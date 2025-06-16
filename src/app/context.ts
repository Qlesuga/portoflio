import { createContext } from "react";

const CreateWindowContex = createContext(
  (
    titleID: string,
    children: React.ReactNode,
    title: string | undefined = undefined,
  ) => {
    return;
  },
);
export { CreateWindowContex };
