import { useState, type ChangeEvent, type FormEvent } from "react";
import "./contactPage.css";
import { useTranslation } from "react-i18next";
import { api } from "~/trpc/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function ContactPage() {
  const { t } = useTranslation();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendEmail = api.email.sendEmial.useMutation({
    onSuccess: (data) => {
      console.log("Email sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending email:", error);
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the captcha.");
      return;
    }
    sendEmail.mutate({ ...formData, captchaToken: captchaToken });
    console.log("Captcha token:", captchaToken);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">{t("contact.title")}</h1>

        <p className="contact-description">{t("contact.description")}</p>

        <p className="contact-email">Email: qlesmail@proton.me</p>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-field">
            <div className="form-label">{t("contact.form.nameLabel")}:</div>
            <input
              type="text"
              name="name"
              minLength={3}
              required
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
              minLength={4}
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-field">
            <div className="form-label">{t("contact.form.messageLabel")}:</div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              minLength={10}
              rows={4}
              className="form-textarea"
            />
          </div>
          <HCaptcha
            sitekey="885221c2-5b24-43a0-a20e-bcd2722edf48"
            onVerify={setCaptchaToken}
          />
          <button type="submit" className="submit-button">
            {t("contact.form.sendMessage")}
          </button>
        </form>
      </div>
    </div>
  );
}
