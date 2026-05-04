import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../../components/job_poster/shared/PosterHeader.tsx";
import Footer from "../../components/job_poster/shared/PosterFooter.tsx";
import ApplicantList from "../../components/job_poster/viewApplication/ApplicantList";

export default function ViewApplicantsPage() {
  const { jobID } = useParams<{ jobID: string }>(); // Use jobID from the URL

  return (
    <div className="dashboard-container">
      <Header />
      <Container className="dashboard-content">
        {jobID ? <ApplicantList jobID={jobID} /> : <p>No job selected.</p>}
      </Container>
      <Footer />
    </div>
  );
}
