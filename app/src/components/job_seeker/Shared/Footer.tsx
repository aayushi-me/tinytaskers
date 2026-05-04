import React from "react";
import "../../../styles/job_seeker/dashboard.css";

/**
 * Footer Component
 *
 * A simple footer for the application that displays copyright information
 * and a link to the "About Us" page.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Content */}
      <p>
        © 2024 TinyTaskers |{/* Inline link to "About Us" */}
        <a href="#">About Us</a>
      </p>
    </footer>
  );
};

export default Footer;
