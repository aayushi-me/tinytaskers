import React from "react";
import { Container } from "@mui/material";
import Header from "../../components/job_poster/shared/PosterHeader.tsx";
import Footer from "../../components/job_poster/shared/PosterFooter.tsx";
import JobList from "../../components/job_poster/postingHistory/postingHistoryList";
import { getPosterIDFromToken } from "../../services/jwt-decode-util.ts"; // Import the utility

export default function JobListPage() {
  const posterID = getPosterIDFromToken(); // Fetch the poster ID from the token

  if (!posterID) {
    return (
      <div>
        <p>Failed to load poster ID. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Header />
      <Container className="dashboard-content">
        <JobList posterID={posterID} />
      </Container>
      <Footer />
    </div>
  );
}
