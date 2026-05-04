import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobsByPosterId } from "../../../store/postingHistorySlice";
import { RootState, AppDispatch } from "../../../store/Store";
import categories from "../../../json/categories.json";
import "../../../styles/job_poster/postingHistory.css";
import "../../../styles/job_poster/commonPoster.css";
import StoreJobsImage from "../../../images/store_jobs.webp";
import { useNavigate } from "react-router-dom";

// PropsType: Defines the expected props for the component
type PropsType = {
  posterID: string;
};

/**
 * JobList Component
 * Renders a list of jobs for a given poster ID, fetched from the Redux store.
 * 
 * Props:
 * - posterID (string): The ID of the job poster.
 */
export default function JobList({ posterID }: PropsType) {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.postingHistory);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchJobsByPosterId(posterID));
  }, [dispatch, posterID]);

  /**
   * Get the image path for a given category name.
   * Defaults to a static image if no specific category image is found.
   * 
   * @param categoryName - The name of the category
   * @returns {string} - Path to the category image
   */
  const getCategoryImage = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    const imagePath = StoreJobsImage;
    console.log(`Image path for category "${categoryName}": ${imagePath}`);
    return imagePath;
  };

  /**
   * Handle navigation to the view applicants page for a specific job.
   * 
   * @param jobID - The ID of the job to view applicants for
   */
  const handleViewApplicants = (jobID: string) => {
    console.log(`View applicants for job ID: ${jobID}`);
    navigate(`/view-applicants/${jobID}`);
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="job-list-container">
      <h2>Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <article className="job" key={job.jobID}>
            <div className="job-content">
              <div className="job-details">
                <h3>{job.title}</h3>
                <div>Category: {job.category}</div>
                <div>
                  Payment: ${job.paymentFrom} - ${job.paymentTo}
                </div>
                <div>
                  Location:{" "}
                  {`${job.location.street}, ${job.location.city}, ${job.location.state} - ${job.location.zipCode}`}
                </div>
                <button
                  className="view-applicants-button"
                  onClick={() => handleViewApplicants(job.jobID)}
                >
                  View Applicants
                </button>
              </div>
              <div className="job-image">
                <img
                  src={getCategoryImage(job.category)}
                  alt={job.category}
                  className="category-image-item"
                />
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
