/**
 * JobApplications.tsx
 * 
 * This component renders a user's job applications, allowing them to:
 * - View the details of their job applications
 * - Share a job application URL using the Clipboard API
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchJobApplications } from '../../store/jobApplicationsSlice';
import Header from '../../components/job_seeker/Shared/Header';
import Footer from '../../components/job_seeker/Shared/Footer';
import '../../styles/job_seeker/dashboard.css';
import '../../styles/header.css';
import '../../styles/footer.css';
import '../../styles/job_seeker/JobApplications.css';

const JobApplications: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select job application data from Redux state
  const { applications, loading, error } = useSelector(
    (state: RootState) => state.jobApplications
  );

  // Fetch job applications on component mount
  useEffect(() => {
    dispatch(fetchJobApplications());
  }, [dispatch]);

  // Share job application using Clipboard API
  const shareApplication = async (app) => {
    // Generate URL for job application dynamically using the applicationID
    const shareUrl = `http://localhost:5173/job-details/${app.applicationID}`;
    console.log('Share URL:', shareUrl);

    try {
      // Attempt to copy the URL to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert('Job application URL copied to clipboard! You can now share it with others.');
      console.log('Job application URL copied to clipboard');
    } catch (err) {
      console.error('Error copying application URL to clipboard:', err);
      alert('Failed to copy URL to clipboard. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Header />
        <div className="dashboard-content">
          <p>Loading your applications...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Header />
        <div className="dashboard-content">
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <h1 className="job-section-title">My Job Applications</h1>
        {applications.length === 0 ? (
          <p className="no-applications-message">
            You have not applied for any jobs yet.
          </p>
        ) : (
          <div className="card-container">
            {applications.map((app) => (
              <div key={app.applicationID} className="job-card">
                <h3 className="job-title">{app.jobName}</h3>
                <p className="job-detail">
                  <strong>Location:</strong> {app.location}
                </p>
                <p className="job-detail">
                  <strong>Category:</strong> {app.category}
                </p>
                <p className="job-detail">
                  <strong>Date Applied:</strong>{' '}
                  {new Date(app.appliedOn).toLocaleDateString()}
                </p>
                <span
                  className={`status-badge status-${app.applicationStatus.toLowerCase()}`}
                >
                  {app.applicationStatus}
                </span>
                <p className="job-comment">
                  <strong>Comment:</strong> {app.comment || 'N/A'}
                </p>

                {/* Share Button */}
                <button
                  className="share-btn"
                  onClick={() => shareApplication(app)}
                >
                  Share Application
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default JobApplications;
