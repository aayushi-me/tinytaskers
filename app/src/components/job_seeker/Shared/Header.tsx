import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../../../styles/job_seeker/dashboard.css";
import TinyTaskersLogo from "../../../images/logo.png";

/**
 * Header Component
 *
 * A header component for the job seeker dashboard that provides navigation,
 * user profile menu, and language switching functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null); // State to manage the menu anchor element
  const navigate = useNavigate(); // Hook for navigation
  const { t, i18n } = useTranslation(); // Hook for translations

  /**
   * Handles opening the user profile menu.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The click event.
   */
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  /**
   * Handles closing the user profile menu.
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
   * Navigates to the job listing page.
   */
  const handleJobListingClick = () => {
    navigate("/job-list");
  };

  /**
   * Navigates to the job applications page.
   */
  const handleApplicationsClick = () => {
    navigate("/job-applications");
  };

  /**
   * Changes the application language.
   *
   * @param {string} language - The language code (e.g., "en" for English, "hi" for Hindi).
   */
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="header">
      {/* Branding and Logo */}
      <div className="header-brand">
        <img
          src={TinyTaskersLogo}
          alt="Tiny Taskers Logo"
          className="header-logo"
          onClick={() => navigate("/dashboard")}
        />
      </div>

      {/* Navigation Links */}
      <nav className="header-links">
        <span onClick={handleJobListingClick} className="header-link">
          {t("Job Listing")} {/* Translated "Job Listing" */}
        </span>
        <span onClick={handleApplicationsClick} className="header-link">
          {t("My Job Applications")} {/* Translated "My Job Applications" */}
        </span>
      </nav>

      {/* Icons and Menu */}
      <div className="header-icons">
        {/* Language Switcher */}
        <div className="language-switcher">
          <button onClick={() => handleLanguageChange("en")}>English</button>
          <button onClick={() => handleLanguageChange("hi")}>हिंदी</button>
        </div>

        {/* User Profile Icon */}
        <div className="user-profile-icon" onClick={handleMenuClick}>
          <AccountCircleIcon fontSize="large" />
        </div>

        {/* User Profile Menu */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleViewProfile}>{t("View Profile")}</MenuItem>
          <MenuItem onClick={handleLogout}>{t("Logout")}</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
