import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/job_seeker/Shared/Header";
import Footer from "../../components/job_seeker/Shared/Footer";
import JobList from "../../components/job_seeker/JobListing/JobList";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { fetchJobs } from "../../store/jobListingSlice"; // Import the Redux action
import { RootState, AppDispatch } from "../../store/store"; // Import types

// Functional component for displaying the job listing page
const JobListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch function for Redux actions
  
    // Extract `jobs`, `loading`, and `error` state from the Redux store
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobListing);

    // Fetch job listings when the component mounts
  useEffect(() => {
    dispatch(fetchJobs()); // Fetch jobs when the component mounts
  }, [dispatch]); // Dependency array ensures the action is dispatched only when `dispatch` changes

  return (
    <div>
      <Header />
      <main style={{ padding: "2rem" }}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && <JobList jobs={jobs} />} {/* Pass jobs as a prop */}
      </main>
      <Footer />
    </div>
  );
};

export default JobListPage;
