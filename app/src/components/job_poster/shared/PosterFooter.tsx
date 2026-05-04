import React from "react";
import "../../../styles/job_poster/jobPosterDashboard.css";

/**
 * Footer component for the Job Poster Dashboard.
 * Displays a copyright notice and a link to the "About Us" section.
 *
 * @component
 * @returns {JSX.Element} The rendered footer element.
 */
const PosterFooter = () => {
  return (
    <footer className="job-poster-footer">
      {/* Footer text displaying copyright information */}
      <p>© 2024 Tiny Taskers | About Us</p>
    </footer>
  );
};

export default PosterFooter;
