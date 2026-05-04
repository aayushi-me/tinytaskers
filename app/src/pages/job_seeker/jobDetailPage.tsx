import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Hooks for interacting with Redux store
import { useParams } from "react-router-dom"; // Hook to retrieve route parameters
import Header from "../../components/job_seeker/Shared/Header"; // Header component
import Footer from "../../components/job_seeker/Shared/Footer"; // Footer component
import JobDetail from "../../components/job_seeker/JobDetails/JobDetail"; // Job detail presentation component
import CircularProgress from "@mui/material/CircularProgress"; // Material-UI component for loading indicator
import Alert from "@mui/material/Alert"; // Material-UI component for displaying alerts
import { fetchJobDetail } from "../../store/jobDetailSlice"; // Redux async thunk for fetching job details
import { RootState, AppDispatch } from "../../store/store"; // Redux types for state and dispatch

// Functional component to display the details of a specific job
const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the job ID from the route parameters
  const dispatch = useDispatch<AppDispatch>(); // Create a typed dispatch function for Redux actions
  const { jobDetail, loading, error } = useSelector((state: RootState) => state.jobDetail); 
  // Select job details, loading state, and error state from Redux store

  // Fetch job details when the component mounts or the `id` parameter changes
  useEffect(() => {
    if (id) {
      dispatch(fetchJobDetail(id)); // Dispatch the fetchJobDetail action with the job ID
    }
  }, [dispatch, id]); // Dependency array ensures this runs when `dispatch` or `id` changes

  // Render a loading spinner while the job details are being fetched
  if (loading) {
    return (
      <div>
        <Header /> {/* Render the header */}
        <main style={{ padding: "2rem", textAlign: "center" }}>
          <CircularProgress /> {/* Material-UI loading spinner */}
          <p>Loading job details...</p>
        </main>
        <Footer /> {/* Render the footer */}
      </div>
    );
  }

  // Render an error message if the fetch operation fails
  if (error) {
    return (
      <div>
        <Header /> {/* Render the header */}
        <main style={{ padding: "2rem", textAlign: "center" }}>
          <Alert severity="error">{error}</Alert> {/* Material-UI alert for errors */}
        </main>
        <Footer /> {/* Render the footer */}
      </div>
    );
  }

  // Render a warning message if job details are not available
  if (!jobDetail) {
    return (
      <div>
        <Header /> {/* Render the header */}
        <main style={{ padding: "2rem", textAlign: "center" }}>
          <Alert severity="warning">Job details are not available.</Alert> {/* Warning message */}
        </main>
        <Footer /> {/* Render the footer */}
      </div>
    );
  }

  // Render the job detail page when data is successfully loaded
  return (
    <div>
      <Header /> {/* Render the header */}
      <main style={{ padding: "2rem" }}>
        <JobDetail {...jobDetail} /> {/* Render the JobDetail component with the job details */}
      </main>
      <Footer /> {/* Render the footer */}
    </div>
  );
};

export default JobDetailPage; // Export the JobDetailPage component
