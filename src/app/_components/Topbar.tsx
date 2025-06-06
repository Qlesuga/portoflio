import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./topbar.css";
import { useTranslation } from "react-i18next";

const langs = {
  en: "pl",
  pl: "en",
};

type AvaiableLangs = keyof typeof langs;

const TopBar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<AvaiableLangs>(
    (i18n.resolvedLanguage as AvaiableLangs) || "en",
  );

  const changeLanguage = async () => {
    const newLang = langs[selectedLanguage] as AvaiableLangs;
    await i18n.changeLanguage(newLang);
    setSelectedLanguage(newLang);
  };

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
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderBottomLeftRadius: "100%",
          width: 12,
        }}
      />
      <div className="topbar_element">
        <FontAwesomeIcon icon={faCalendarDays} />
        {formatDate(date)}
      </div>
      <div className="topbar_element" style={{ cursor: "pointer" }}>
        <span
          style={{
            textTransform: "uppercase",
          }}
          onClick={changeLanguage}
        >
          {selectedLanguage}
        </span>
      </div>
      <div className="topbar_element">
        {formatTime(date)}
        <FontAwesomeIcon icon={faClock} />
      </div>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderBottomRightRadius: "100%",
          width: 12,
        }}
      />
    </div>
  );
};

export default TopBar;
