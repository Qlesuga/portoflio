import { useState, type ChangeEvent } from "react";
import "./contactPage.css";

export default function ContactPage() {
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
        <h1 className="contact-title">Contact Form</h1>

        <p className="contact-description">
          Have a question or want to get in touch? Fill out the form below or
          contact me directly, and I will get back to you as soon as possible.
        </p>

        <p className="contact-email">Email: test@test.test</p>

        <div className="form-container">
          <div>
            <div className="form-field">
              <div className="form-label">Name:</div>
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
              <div className="form-label">Message:</div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="form-textarea"
              />
            </div>

            <button onClick={handleSubmit} className="submit-button">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
