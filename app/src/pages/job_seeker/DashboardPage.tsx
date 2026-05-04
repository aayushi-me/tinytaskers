import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchJobs } from "../../store/dashboardSlice";
import Header from "../../components/job_seeker/Shared/Header";
import JobGrid from "../../components/job_seeker/Dashboard/JobGrid";
import Footer from "../../components/job_seeker/Shared/Footer";
import "../../styles/job_seeker/dashboard.css";
import "../../styles/header.css";
import "../../styles/footer.css";
import animationBackground from "../../components/animation/Animation3.mp4";
import animation6 from "../../components/animation/Animation6.mp4";

/**
 * DashboardPage Component
 *
 * The main dashboard page for job seekers. Displays a job listing grid, animations,
 * and a layout divided into a left section (JobGrid) and a right section (animations).
 * This component fetches job data on mount and provides a complete user interface for the dashboard.
 *
 * @component
 * @returns {JSX.Element} The rendered DashboardPage component.
 */
const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch hook

  /**
   * Fetches job data when the component is mounted.
   * Uses the Redux `fetchJobs` action to populate the dashboard.
   */
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      {/* Background Animation */}
      <video className="video-background" autoPlay loop muted>
        <source src={animationBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Header Component */}
      <Header />

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        {/* Left Section: JobGrid */}
        <div className="dashboard-left-section">
          <JobGrid />
        </div>

        {/* Right Section: Animation */}
        <div className="dashboard-right-section">
          <video
            className="dashboard-animation"
            src={animation6}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default DashboardPage;
