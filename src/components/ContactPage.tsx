import { useState, type ChangeEvent } from "react";
import "./contactPage.css";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    alert("boop");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">{t("contact.title")}</h1>

        <p className="contact-description">{t("contact.description")}</p>

        <p className="contact-email">Email: test@test.test</p>

        <div className="form-container">
          <div>
            <div className="form-field">
              <div className="form-label">{t("contact.form.nameLabel")}:</div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <div className="form-label">Email:</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-field">
              <div className="form-label">
                {t("contact.form.messageLabel")}:
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="form-textarea"
              />
            </div>

            <button onClick={handleSubmit} className="submit-button">
              {t("contact.form.sendMessage")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
