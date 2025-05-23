import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./topbar.css";

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
    <div className="topbar">
      <div className="topbar_borders"></div>
      <div className="topbar_element">
        <FontAwesomeIcon icon={faCalendarDays} />
        {formatDate(date)}
      </div>
      <div className="topbar_element" style={{ cursor: "pointer" }}>
        <span>EN</span>
      </div>
      <div className="topbar_element">
        {formatTime(date)}
        <FontAwesomeIcon icon={faClock} />
      </div>
      <div className="topbar_borders"></div>
    </div>
  );
};

export default TopBar;
