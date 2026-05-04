import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../../styles/job_seeker/JobDetail.css"; // Ensure this points to your CSS file
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IconButton, Tooltip } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareIcon from "@mui/icons-material/Share";
import ContactsIcon from "@mui/icons-material/Contacts";

interface JobDetailProps {
    jobID: string;
    title: string;
    description: {
        aboutTheJob: string;
        essentialRequirements: string;
        specificJobResponsibilities: string;
        qualifications: string;
    };
    category: string;
    paymentFrom: number;
    paymentTo: number;
    location: { city: string; state: string; street: string; zipCode: string };
    applyByDate: string;
}

// Component to display detailed information about a job
const JobDetail: React.FC<JobDetailProps> = ({
    jobID,
    title,
    description,
    category,
    paymentFrom,
    paymentTo,
    location,
    applyByDate,
}) => {
    const navigate = useNavigate();



  // Function to handle sharing the job details
    const handleShareJob = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Job Opportunity: ${title}`,
                    text: `Check out this job opportunity: ${title}\n\nDescription:\n${description.aboutTheJob}`,
                    url: window.location.href, // Current page URL
                });
                alert("Job shared successfully!");
            } else {
                alert("Web Share API is not supported in this browser.");
            }
        } catch (error) {
            console.error("Error sharing job:", error);
        }
    };


    // Function to save job details to a file
    const saveToFile = async () => {
        try {
            if ("showSaveFilePicker" in window) {
                const fileHandle = await (window as any).showSaveFilePicker({
                    suggestedName: `${title}.txt`,
                    types: [
                        {
                            description: "Text Files",
                            accept: {
                                "text/plain": [".txt"],
                            },
                        },
                    ],
                });

                const writable = await fileHandle.createWritable();
                const fileContent = `
          Job Title: ${title}
          About the Job: ${description.aboutTheJob}
          Essential Requirements: ${description.essentialRequirements}
          Specific Responsibilities: ${description.specificJobResponsibilities}
          Qualifications: ${description.qualifications}
          Category: ${category}
          Payment: $${paymentFrom} - $${paymentTo}
          Location: ${location.street}, ${location.city}, ${location.state}, ${location.zipCode}
          Apply By: ${applyByDate}
        `;
                await writable.write(fileContent.trim());
                await writable.close();
                alert("Job details saved successfully!");
            } else {
                alert("File System Access API is not supported in this browser.");
            }
        } catch (error) {
            console.error("Error saving file:", error);
        }
    };

    // Function to handle Apply button click
    const handleApplyClick = (jobID: string) => {
        navigate(`/apply/${jobID}`); // Redirect to the Apply Page with the job ID
    };

    // Function to render responsibilities
    const renderResponsibilities = (responsibilities: string) => {
        return responsibilities
            .split(/\d\.\s/)
            .filter(Boolean)
            .map((item, index) => (
                <Typography key={index} variant="body2" gutterBottom>
                    {index + 1}. {item.trim()}
                </Typography>
            ));
    };


    return (
        <Box className="job-detail-container">
            {/* Left Column */}
            <div className="job-detail-left">
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>

                <div className="job-detail-field">
                    <Typography variant="body1" gutterBottom>
                        <strong>About the Job</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {description.aboutTheJob || "N/A"}
                    </Typography>
                </div>

                <div className="job-detail-field">
                    <Typography variant="body1" gutterBottom>
                        <strong>Essential Requirements</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {description.essentialRequirements || "N/A"}
                    </Typography>
                </div>

                <div className="job-detail-field">
                    <Typography variant="body1" gutterBottom>
                        <strong>Specific Job Responsibilities</strong>
                    </Typography>
                    <div className="responsibilities-list">
                        {renderResponsibilities(description.specificJobResponsibilities || "N/A")}
                    </div>
                </div>

                <div className="job-detail-field">
                    <Typography variant="body1" gutterBottom>
                        <strong>Qualifications</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {description.qualifications || "N/A"}
                    </Typography>
                </div>
            </div>

            {/* Divider */}
            <div className="job-detail-divider"></div>

            {/* Right Column */}
            <div className="job-detail-right">
                <div className="job-detail-field">
                    <Typography variant="body1" gutterBottom>
                        <strong>Category:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {category}
                    </Typography>
                </div>

                <div className="job-detail-field">
                    <Typography variant="body1" gutterBottom>
                        <strong>Payment Range:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        ${paymentFrom || "N/A"} - ${paymentTo || "N/A"}
                    </Typography>
                </div>

                <div className="job-detail-field">
                    <Typography variant="body1" gutterBottom>
                        <strong>Location:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {`${location.street}, ${location.city}, ${location.state}, ${location.zipCode}`}
                    </Typography>
                </div>

                <div className="job-detail-field">
                    <Typography variant="body1" gutterBottom>
                        <strong>Apply By:</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {applyByDate || "N/A"}
                    </Typography>
                </div>

                {/* Save Button */}
                <div className="button-container">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleApplyClick(jobID)}
                        className="apply-button"
                    >
                        Apply
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={saveToFile}
                        className="save-button"
                    >
                        Save
                    </Button>


                    {/* Share Job */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleShareJob}
                        className="share-button"
                    >
                        Share
                    </Button>
                </div>


            </div>
        </Box>
    );
};

export default JobDetail;