/**
 * LandingFooter.tsx
 *
 * A footer component for the landing page.
 * Includes contact information, social media links, and a contact form.
 * Handles form submissions and displays success or error messages.
 */

import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./../../styles/landing.css";

const LandingFooter = () => {
  const { t } = useTranslation(); // Translation hook for internationalization

  // State for contact form fields and response messages
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles contact form submission.
   * Sends form data to the server and resets the form on success.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3002/contact/submit",
        formData
      );
      setSuccess(t("successMessage")); // Display translated success message
      setFormData({ name: "", email: "", message: "" }); // Reset form fields
    } catch (err: any) {
      setError(
        err.response?.data?.error || t("errorMessage") // Display translated error message
      );
    }
  };

  return (
    <footer id="contact-section" className="contact-section">
      <div className="contact-left">
        <h2>{t("location")}</h2>
        <p>{t("addressLine1")}</p>
        <p>{t("addressLine2")}</p>
        <br />
        <h2>{t("followUs")}</h2>
        <ul>
          <li>
            <a href="mailto:email@example.com">{t("emailUs")}</a>
          </li>
          <li>
            <a
              href="https://www.teams.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("connectOnTeams")}
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("facebook")}
            </a>
          </li>
        </ul>
        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>
            {t("copyright")}{t(" All Rights Reserved.")}
          </p>
        </div>
      </div>
      <div className="contact-right">
        <h2>{t("contactForm")}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">{t("name")}</label>
          <input
            type="text"
            id="name"
            placeholder={t("namePlaceholder")}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <label htmlFor="email">{t("email")}</label>
          <input
            type="email"
            id="email"
            placeholder={t("emailPlaceholder")}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label htmlFor="message">{t("message")}</label>
          <textarea
            id="message"
            placeholder={t("messagePlaceholder")}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          ></textarea>
          <button type="submit">{t("submit")}</button>
        </form>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </footer>
  );
};

export default LandingFooter;
