/**
 * JobSubmissionForm.tsx
 *
 * This component handles the job application submission process.
 * It retrieves job details based on the `jobID` and allows the user to fill out and submit an application form.
 * The form includes fields for resume upload, introduction, availability, expected salary, and consent.
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import Header from "./../components/job_seeker/Shared/Header";
import Footer from "./../components/job_seeker/Shared/Footer";
import "./../styles/JobSubmissionForm.css";

const JobSubmissionForm: React.FC = () => {
  const { jobID } = useParams<{ jobID: string }>(); // Get jobID from the URL parameters
  const navigate = useNavigate();

  // State to store job details
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: {
      aboutTheJob: "",
      essentialRequirements: "",
      specificJobResponsibilities: "",
      qualifications: "",
    },
    category: "",
    paymentFrom: 0,
    paymentTo: 0,
    location: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    milestones: [] as { milestone: string }[],
    applyByDate: "",
  });

  // State for the application form
  const [formData, setFormData] = useState({
    applicationID: "",
    jobSeekerID: "",
    applicationStatus: "Pending",
    appliedOn: new Date().toISOString().split("T")[0],
    resume: null as File | null,
    comment: "",
    availability: "Full-time",
    expectedSalary: "",
    consent: false,
  });

  /**
   * Fetch job details based on the job ID.
   * Verifies authentication using the token from localStorage.
   */
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      alert("You are not logged in. Redirecting to login...");
      navigate("/"); // Redirect to login or home page
      return;
    }

    // Fetch job details only if token is present
    const fetchJobDetails = async () => {
      try {
        const response = await API.get(`/listings/jobs/${jobID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const jobData = response.data.data;
        if (!jobData) {
          console.error("No job data found.");
          return;
        }

        setJobDetails({
          title: jobData.title,
          description: {
            aboutTheJob: jobData.description?.aboutTheJob || "",
            essentialRequirements: jobData.description?.essentialRequirements || "",
            specificJobResponsibilities: jobData.description?.specificJobResponsibilities || "",
            qualifications: jobData.description?.qualifications || "",
          },
          category: jobData.category,
          paymentFrom: jobData.paymentFrom,
          paymentTo: jobData.paymentTo,
          location: {
            street: jobData.location?.street || "",
            city: jobData.location?.city || "",
            state: jobData.location?.state || "",
            zipCode: jobData.location?.zipCode || "",
          },
          milestones: jobData.milestones || [],
          applyByDate: jobData.applyByDate,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert("Error fetching job details: " + error.message); // Show alert with error message
        } else {
          alert("Unexpected error occurred while fetching job details.");
        }
      }
    };

    if (jobID) {
      fetchJobDetails();
    }
  }, [jobID, navigate]);

  /**
   * Handles form submission for the job application.
   * Validates consent and submits application data to the server.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    const applicationData = new FormData();
    applicationData.append("jobID", jobID || "");
    applicationData.append("jobName", jobDetails.title);
    applicationData.append("applicationStatus", formData.applicationStatus);
    applicationData.append("appliedOn", formData.appliedOn);
    if (formData.resume) applicationData.append("resume", formData.resume);
    applicationData.append("comment", formData.comment);
    applicationData.append("availability", formData.availability);
    applicationData.append("expectedSalary", formData.expectedSalary);

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        alert("You are not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      // Decode token to extract userID
      const payload = token.split(".")[1];
      const decodedToken = JSON.parse(atob(payload));
      const jobSeekerID = decodedToken.userID;

      if (!jobSeekerID) {
        alert("User ID not found in token. Please log in.");
        navigate("/login");
        return;
      }

      // Append jobSeekerID to application data
      applicationData.append("jobSeekerID", jobSeekerID);

      await API.post("/applications", applicationData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      alert("Application Submitted Successfully!");
      navigate("/job-list");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error submitting application:", error.message);
        alert("Failed to submit application: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        alert("Unexpected error occurred while submitting the application.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="job-application-container">
        {/* Job Details Section */}
        <div className="section">
          <h2>Job Details</h2>
          <div className="job-details-grid">
            <div>
              <p>
                <strong>Title:</strong> {jobDetails.title}
              </p>
              <p>
                <strong>Description:</strong> {jobDetails.description.aboutTheJob}
              </p>
              <p>
                <strong>Essential Requirements:</strong> {jobDetails.description.essentialRequirements}
              </p>
              <p>
                <strong>Specific Job Responsibilities:</strong>{" "}
                {jobDetails.description.specificJobResponsibilities}
              </p>
              <p>
                <strong>Qualifications:</strong> {jobDetails.description.qualifications}
              </p>
            </div>
            <div>
              <p>
                <strong>Location:</strong>{" "}
                {`${jobDetails.location.street}, ${jobDetails.location.city}, ${jobDetails.location.state} ${jobDetails.location.zipCode}`}
              </p>
              <p>
                <strong>Category:</strong> {jobDetails.category}
              </p>
              <p>
                <strong>Payment:</strong> ${jobDetails.paymentFrom} - ${jobDetails.paymentTo}
              </p>
              <p>
                <strong>Apply By:</strong> {jobDetails.applyByDate}
              </p>
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="section">
          <h2>Application Details</h2>
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Resume (PDF):</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setFormData({ ...formData, resume: e.target.files?.[0] || null })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Introduction:</label>
              <textarea
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                placeholder="Write a short introduction about yourself"
                required
              />
            </div>
            <div className="form-group">
              <label>Availability:</label>
              <select
                value={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div className="form-group">
              <label>Expected Salary (USD):</label>
              <input
                type="number"
                value={formData.expectedSalary}
                onChange={(e) =>
                  setFormData({ ...formData, expectedSalary: e.target.value })
                }
                placeholder="Enter your expected hourly rate"
              />
            </div>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) =>
                  setFormData({ ...formData, consent: e.target.checked })
                }
              />
              <label htmlFor="consent">I agree to the terms and conditions.</label>
            </div>
            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobSubmissionForm;
