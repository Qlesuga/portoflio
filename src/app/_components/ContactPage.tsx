import { useState, type ChangeEvent, type FormEvent } from "react";
import "./contactPage.css";
import { useTranslation } from "react-i18next";
import { api } from "~/trpc/react";
import i18n from "../i18n";
import { toast } from "sonner";
import type { AppRouter } from "~/server/api/root";
import type { TRPCClientError } from "@trpc/client";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendEmail = api.email.sendEmail.useMutation();

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

    const status = sendEmail.mutateAsync({
      ...formData,
      language: i18n.language,
    });

    let loading = "Submitting...";
    if (i18n.language == "pl") {
      loading = "Wysyłanie...";
    }

    toast.promise(status, {
      loading: loading,
      success: (res) => res.message,
      error: (err: TRPCClientError<AppRouter>) => `${err.message}`,
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">{t("contact.title")}</h1>

        <p className="contact-description">{t("contact.description")}</p>

        <p className="contact-email pb-4">Email: contact@qles.dev</p>

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
          <button type="submit" className="submit-button">
            {t("contact.form.sendMessage")}
          </button>
        </form>
      </div>
    </div>
  );
}
