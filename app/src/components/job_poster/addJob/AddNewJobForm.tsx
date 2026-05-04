import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Paper,
  IconButton,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import categories from "../../../json/categories.json"; // Import JSON
import "../../../styles/job_poster/addJob.css";
import "../../../styles/job_poster/commonPoster.css";
import { getPosterIDFromToken } from "../../../services/jwt-decode-util";
import { useNavigate } from "react-router-dom"; // Import useNavigate

/**
 * Component for adding a new job. Allows job posters to input job details, 
 * description, milestones, and location in a step-by-step form.
 *
 * @returns {JSX.Element} - A React component for the Add New Job form.
 */
export default function AddNewJobForm() {
  const navigate = useNavigate(); // Initialize navigate
  const posterID = getPosterIDFromToken(); // Retrieve the poster ID from JWT
  const [formData, setFormData] = useState({
    title: "",
    aboutJob: "",
    essential: "",
    responsibilities: "",
    qualifications: "",
    category: "",
    paymentFrom: "",
    paymentTo: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    milestones: [{ milestone: "Milestone 1", description: "" }],
    applyByDate: "",
  });

  const [step, setStep] = useState(1); // Step state to manage sections

  const steps = [
    "Job Details",
    "Description",
    "Milestones",
    "Location",
  ];

   /**
   * Handles input changes for text fields in the form.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The event triggered by input change.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles milestone description changes.
   *
   * @param {number} index - The index of the milestone being updated.
   * @param {string} value - The updated milestone description.
   */
  const handleMilestoneChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[index].description = value;
      return { ...prev, milestones: updatedMilestones };
    });
  };

  const addMilestone = () => {
    setFormData((prev) => {
      const nextMilestoneNumber = prev.milestones.length
        ? Math.max(
            ...prev.milestones.map((m) =>
              parseInt(m.milestone.split(" ")[1], 10)
            )
          ) + 1
        : 1; // Start from 1 if no milestones exist
      return {
        ...prev,
        milestones: [
          ...prev.milestones,
          { milestone: `Milestone ${nextMilestoneNumber}`, description: "" },
        ],
      };
    });
  };

  const removeMilestone = (index: number) => {
    setFormData((prev) => {
      const updatedMilestones = prev.milestones.filter((_, i) => i !== index);

      // Reassign milestone numbers sequentially
      const reNumberedMilestones = updatedMilestones.map((milestone, idx) => ({
        ...milestone,
        milestone: `Milestone ${idx + 1}`,
      }));

      return { ...prev, milestones: reNumberedMilestones };
    });
  };

  const handleSubmit = async () => {
    // Construct description and milestones
    const description = {
      "About the Job": formData.aboutJob,
      "Essential Requirements": formData.essential,
      "Specific Job Responsibilities": formData.responsibilities,
      Qualifications: formData.qualifications,
    };

    const milestones = formData.milestones.reduce((acc, milestone, index) => {
      acc[`Milestone ${index + 1}`] = milestone.description;
      return acc;
    }, {});

    const newJob = {
      posterID: posterID,
      title: formData.title,
      description,
      category: formData.category,
      payment_from: parseFloat(formData.paymentFrom),
      payment_to: parseFloat(formData.paymentTo),
      location: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      Milestones: milestones,
      applyByDate: formData.applyByDate,
    };

    try {
      const response = await fetch("http://localhost:3002/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (response.ok) {
        alert("Job successfully added!");
        navigate("/posting-history"); // Redirect to posting history page
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to create job");
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please try again.");
    }
  };

  const renderJobDetails = () => (
    <>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} className="grid-item">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            marginTop: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </Grid>

      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="Payment From"
          name="paymentFrom"
          value={formData.paymentFrom}
          onChange={handleChange}
          variant="standard"
          type="number"
        />
      </Grid>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="Payment To"
          name="paymentTo"
          value={formData.paymentTo}
          onChange={handleChange}
          variant="standard"
          type="number"
        />
      </Grid>
    </>
  );

  const renderDescription = () => (
    <>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="About the Job"
          name="aboutJob"
          value={formData.aboutJob}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
        />
      </Grid>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="Essential Requirements"
          name="essential"
          value={formData.essential}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
        />
      </Grid>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="Specific Job Responsibilities"
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
        />
      </Grid>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="Qualifications"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={2}
        />
      </Grid>
    </>
  );

  const renderMilestones = () => (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Milestones
        <IconButton onClick={addMilestone} color="primary">
          <AddCircleOutlineIcon />
        </IconButton>
      </Typography>
      {formData.milestones.map((milestone, index) => (
        <Grid
          item
          xs={12}
          key={index}
          style={{ position: "relative", marginBottom: "1rem" }}
        >
          <TextField
            fullWidth
            label={milestone.milestone}
            value={milestone.description}
            onChange={(e) => handleMilestoneChange(index, e.target.value)}
            variant="outlined"
            multiline
            rows={2}
            className="milestone-textarea"
          />
          {index > 0 && (
            <IconButton
              onClick={() => removeMilestone(index)}
              className="milestone-remove-icon"
              aria-label="Remove Milestone"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </Grid>
      ))}
    </>
  );

  const renderLocation = () => (
    <>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="Street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} className="grid-item">
        <TextField
          fullWidth
          label="Zip Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          variant="standard"
        />
      </Grid>
    </>
  );

return (
  <Container maxWidth="lg" className="add-job-container">
    <Paper elevation={4} className="add-job-paper">
      <div className="progress-bar-section">
        <div className="progress-bar-container">
          <Typography variant="h6" className="progress-bar-title">
            Create Job
          </Typography>
          {steps.map((label, index) => (
            <div
              key={index}
              className={`progress-step ${step === index + 1 ? "active" : ""}`}
            >
              <div className={`step-number ${step >= index + 1 ? "completed" : ""}`}>
                {index + 1}
              </div>
              <div className="step-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="form-section">
        <Typography variant="h5" gutterBottom align="center">
          {steps[step - 1]} {/* Display step-specific main text */}
        </Typography>
        <form className="add-job-form">
          {step === 1 && renderJobDetails()}
          {step === 2 && renderDescription()}
          {step === 3 && renderMilestones()}
          {step === 4 && renderLocation()}

          <Grid container spacing={3} style={{ marginTop: "1rem" }}>
            {step > 1 && (
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              </Grid>
            )}
            {step < 4 && (
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </Button>
              </Grid>
            )}
            {step === 4 && (
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    </Paper>
  </Container>
);
}