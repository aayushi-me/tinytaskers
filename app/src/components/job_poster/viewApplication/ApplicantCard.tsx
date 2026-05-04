import React from "react";
import "../../../styles/job_poster/ApplicantCard.css";

// Define the type for the component's props
type ApplicantCardProps = {
  applicantName: string;
  applicantEmail: string;
  applicationStatus: string;
  appliedOn: string;
  resume: string;
  comment?: string;
  onApprove: () => void;
  onDeny: () => void;
};

/**
 * ApplicantCard Component
 * 
 * Displays details of a single applicant and provides actions to approve or deny their application.
 * 
 * Props:
 * - `applicantName` (string): The name of the applicant.
 * - `applicantEmail` (string): The email address of the applicant.
 * - `applicationStatus` (string): The current status of the application.
 * - `appliedOn` (string): The date the application was submitted.
 * - `resume` (string): The applicant's resume (could be text or a link).
 * - `comment` (string, optional): Additional comments about the application.
 * - `onApprove` (function): Callback for the "Approve" button.
 * - `onDeny` (function): Callback for the "Deny" button.
 */
export default function ApplicantCard({
  applicantName,
  applicantEmail,
  applicationStatus,
  appliedOn,
  resume,
  comment,
  onApprove,
  onDeny,
}: ApplicantCardProps) {
  return (
    <div className="applicant-card">
      <div className="applicant-card-details">
        <h3 className="applicant-name">{applicantName}</h3>
        <p>
          <strong>Email:</strong> {applicantEmail}
        </p>
        <p>
          <strong>Status:</strong> {applicationStatus}
        </p>
        <p>
          <strong>Applied On:</strong>{" "}
          {new Date(appliedOn).toLocaleDateString()}
        </p>
        <p>
          <strong>Comment:</strong> {comment || "N/A"}
        </p>
        <details>
          <summary>More Info</summary>
          <p>
            <strong>Resume:</strong> {resume}
          </p>
        </details>
      </div>
      <div className="applicant-card-actions">
        <button className="approve-button" onClick={onApprove}>
          Approve
        </button>
        <button className="deny-button" onClick={onDeny}>
          Deny
        </button>
      </div>
    </div>
  );
}
