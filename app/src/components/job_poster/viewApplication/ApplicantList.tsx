import React, { useEffect, useState } from "react";
import { getApplicantsByJobID, updateApplicationStatus } from "../../../services/job_poster/view-applicant-service";
import ApplicantCard from "./ApplicantCard";
import "../../../styles/job_poster/ApplicantList.css";

// Type definition for a single applicant
type Applicant = {
  applicationID: string;
  applicantName: string;
  applicantEmail: string;
  applicationStatus: string;
  appliedOn: string;
  resume: string;
  comment?: string;
};

type ApplicantListProps = {
  jobID: string;
};

/**
 * ApplicantList Component
 * 
 * Displays a list of applicants for a given job. Allows approving or denying applications.
 * 
 * Props:
 * - `jobID` (string): The ID of the job for which applicants need to be fetched.
 */
export default function ApplicantList({ jobID }: ApplicantListProps) {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getApplicantsByJobID(jobID);
        setApplicants(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobID]);

  /**
   * Approve an application.
   * 
   * @param applicationID - The ID of the application to approve
   */
  const handleApprove = async (applicationID: string) => {
    try {
      await updateApplicationStatus(applicationID, true);
      alert(`Application ${applicationID} approved successfully!`);
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.applicationID === applicationID
            ? { ...applicant, applicationStatus: "Approved" }
            : applicant
        )
      );
    } catch (error: any) {
      alert(error.message || "Failed to approve application.");
    }
  };

  /**
   * Deny an application.
   * 
   * @param applicationID - The ID of the application to deny
   */
  const handleDeny = async (applicationID: string) => {
    try {
      await updateApplicationStatus(applicationID, false);
      alert(`Application ${applicationID} denied successfully!`);
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.applicationID === applicationID
            ? { ...applicant, applicationStatus: "Denied" }
            : applicant
        )
      );
    } catch (error: any) {
      alert(error.message || "Failed to deny application.");
    }
  };

  if (loading) {
    return <div className="loading-container">Loading applicants...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="applicant-list-container">
      {applicants.length === 0 ? (
        <p className="applicant-list-error-container">No applicants found for this job.</p>
      ) : (
        applicants.map((applicant) => (
          <ApplicantCard
            key={applicant.applicationID}
            applicantName={applicant.applicantName}
            applicantEmail={applicant.applicantEmail}
            applicationStatus={applicant.applicationStatus}
            appliedOn={applicant.appliedOn}
            resume={applicant.resume}
            comment={applicant.comment}
            onApprove={() => handleApprove(applicant.applicationID)}
            onDeny={() => handleDeny(applicant.applicationID)}
          />
        ))
      )}
    </div>
  );
}
