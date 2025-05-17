import { useRef } from "react";
import DesktopIcon from "./DesktopIcon";
import DraggableWindow from "./DraggableWindow";

export default function App() {
  const zIndex = useRef(0);
  const createDraggableWindow = () => {
    zIndex.current = zIndex.current + 1;
    return (
      <DraggableWindow title=":3" initZIndex={zIndex.current} zIndex={zIndex}>
        <p>test</p>
      </DraggableWindow>
    );
  };
  return (
    <div>
      <DesktopIcon />
      {createDraggableWindow()}
      {createDraggableWindow()}
      {createDraggableWindow()}
    </div>
  );
}
