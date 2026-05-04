import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next"; // Hook for translations
import { AppDispatch, RootState } from "../../store/store";
import { updateStats } from "../../store/jobPosterDashboardSlice";
import { getPosterIDFromToken } from "../../services/jwt-decode-util";
import { getJobsByPosterId } from "../../services/job_poster/posting-history-service";
import PosterHeader from "../../components/job_poster/shared/PosterHeader";
import PosterFooter from "../../components/job_poster/shared/PosterFooter";
import "../../styles/job_poster/jobPosterDashboard.css";
import animation4 from "../../components/animation/animation4.mp4";

/**
 * PosterDashboard Component
 *
 * Displays the job poster's dashboard with job statistics, an informational box,
 * and a welcome message. The dashboard fetches job-related data and updates the Redux store.
 *
 * @component
 * @returns {JSX.Element} The rendered PosterDashboard component.
 */
const PosterDashboard = () => {
  const { t } = useTranslation("jobPosterDashboard"); // Translation hook with namespace
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch hook
  const { totalJobsPosted } = useSelector(
    (state: RootState) => state.jobPosterDashboard
  ); // Fetch total jobs posted from the Redux store

  /**
   * Fetch job statistics and update Redux state.
   * Triggered on component mount.
   */
  useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const posterID = getPosterIDFromToken(); // Decode token to get poster ID
        if (!posterID) {
          console.error("No posterID found in token.");
          return;
        }

        const jobs = await getJobsByPosterId(String(posterID)); // Fetch jobs by poster ID
        dispatch(
          updateStats({
            totalJobsPosted: jobs.length, // Update total jobs posted count
          })
        );
      } catch (error) {
        console.error("Failed to fetch job stats:", error);
      }
    };

    fetchJobStats();
  }, [dispatch]);

  return (
    <div className="job-poster-dashboard-container">
      {/* Header Component */}
      <PosterHeader />

      <main className="job-poster-content-wrapper">
        {/* Left Section */}
        <div className="job-poster-content-left">
          {/* Welcome Message */}
          <h1 className="job-poster-welcome-message">{t("welcomeMessage")}</h1>

          {/* Informational Box */}
          <div className="job-poster-info-box">
            <h2 className="info-box-title">{t("infoBoxTitle")}</h2>
            <p className="info-box-text">{t("infoBoxText")}</p>
            <p className="info-box-action">{t("infoBoxAction")}</p>
          </div>

          {/* Job Statistics */}
          <div className="job-poster-stats-container-single">
            <div className="job-poster-stat-box">
              <h2>{t("totalJobsPosted")}</h2>
              <p>{totalJobsPosted}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="job-poster-content-right">
          {/* Animation Video */}
          <video
            className="job-poster-animation"
            src={animation4}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </main>

      {/* Footer Component */}
      <PosterFooter />
    </div>
  );
};

export default PosterDashboard;
