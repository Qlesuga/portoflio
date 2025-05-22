import {
  faCalendarDays,
  faClock,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const TopBar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 250);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-UK", {
      day: "numeric",
      month: "numeric",
    });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-UK", {
      hour: "numeric",
      minute: "numeric",
    });
  return (
    <div
      style={{
        width: "100%",
        height: 50,
        gap: 16,
        backgroundColor: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <div>
        <FontAwesomeIcon icon={faCalendarDays} />
        {formatDate(date)}
      </div>
      <div>
        <FontAwesomeIcon icon={faPowerOff} />
      </div>
      <div>
        {formatTime(date)}
        <FontAwesomeIcon icon={faClock} />
      </div>
    </div>
  );
};

export default TopBar;
