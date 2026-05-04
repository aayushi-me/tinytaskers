/**
 * Header.tsx
 *
 * A reusable header component for the landing page.
 * Includes a logo, navigation links, and a language switcher.
 */

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../images/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./../../styles/landing.css";

interface HeaderProps {
  onContactClick?: () => void; // Optional callback for the contact button
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const { t, i18n } = useTranslation();

  /**
   * Changes the current language of the application.
   * @param {string} language - The language code (e.g., "en" for English, "hi" for Hindi).
   */
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Brand Logo" className="brand-logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <Link to="/about" className="nav-link">
          {t("aboutUs")}
        </Link>
        {onContactClick ? (
          <button className="nav-link contact-link" onClick={onContactClick}>
            {t("contact")}
          </button>
        ) : (
          <Link to="/" className="nav-link contact-link">
            {t("contact")}
          </Link>
        )}
      </nav>

      {/* Language Switcher */}
      <div className="language-Switcher">
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("hi")}>हिंदी</button>
      </div>
    </header>
  );
};

export default Header;
