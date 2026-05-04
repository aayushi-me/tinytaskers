import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import TinyTaskersLogo from "../../../images/logo.png";
import "../../../styles/job_poster/jobPosterDashboard.css";

/**
 * Header component for the Job Poster Dashboard.
 * Provides navigation, user profile menu, language switching, and branding.
 *
 * @component
 * @returns {JSX.Element} The rendered header element.
 */
const PosterHeader = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null); // State for menu anchor
  const { t, i18n } = useTranslation(); // Translation functions

  /**
   * Opens the user profile menu.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The click event.
   */
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  /**
   * Closes the user profile menu.
   */
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  /**
   * Navigates to the user profile page.
   */
  const handleViewProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  /**
   * Logs out the user by clearing the token and navigating to the home page.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    handleMenuClose();
  };

  /**
   * Navigates to the "Add Job" page.
   */
  const handleAddJobClick = () => {
    navigate("/add-job");
  };

  /**
   * Navigates to the "Posting History" page.
   */
  const handlePostingHistoryClick = () => {
    navigate("/posting-history");
  };

  /**
   * Switches the language of the application.
   *
   * @param {string} lng - The language code (e.g., "en" for English, "hi" for Hindi).
   */
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng); // Change application language
  };

  return (
    <header className="job-poster-header">
      {/* Logo Section */}
      <div className="logo-container" onClick={() => navigate("/")}>
        <img
          src={TinyTaskersLogo}
          alt="Tiny Taskers Logo"
          className="job-poster-header-logo"
        />
      </div>

      {/* Navigation Links */}
      <nav className="job-poster-header-links">
        <span onClick={handleAddJobClick} className="job-poster-header-link">
          {t("Add Job")} {/* Translated "Add Job" */}
        </span>
        <span
          onClick={handlePostingHistoryClick}
          className="job-poster-header-link"
        >
          {t("Posting History")} {/* Translated "Posting History" */}
        </span>
      </nav>

      {/* Notification and User Profile */}
      <div className="header-icons">
        {/* Language Switcher */}
        <div className="language-switcher">
          <button
            onClick={() => handleLanguageChange("en")}
            className="language-btn"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("hi")}
            className="language-btn"
          >
            हिंदी
          </button>
        </div>

        {/* User Profile Icon with Interactive Styling */}
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            borderRadius: "50%",
            padding: "5px",
            color: "#4a0d67", // Default purple color
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onClick={handleMenuClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4a0d67"; // Purple background
            e.currentTarget.style.color = "#ffffff"; // White icon
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"; // Transparent background
            e.currentTarget.style.color = "#4a0d67"; // Purple icon
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </div>

        {/* User Profile Menu */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleViewProfile}>{t("viewProfile")}</MenuItem>
          <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default PosterHeader;
