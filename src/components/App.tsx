import DesktopIcon from "./DesktopIcon";
import DraggableWindow from "./DraggableWindow";

export default function App() {
  return (
    <div>
      <DesktopIcon />
      <DraggableWindow title=":3">
        <p>test</p>
      </DraggableWindow>
      <DraggableWindow title=":4">
        <p>test</p>
      </DraggableWindow>
    </div>
  );
}
