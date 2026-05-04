 import React from "react";
 import { useSelector } from "react-redux";
 import { RootState } from "../../../store/store";
 import { useTranslation } from "react-i18next";
 import Card from "@mui/material/Card";
 import CardContent from "@mui/material/CardContent";
 import Typography from "@mui/material/Typography";
 import CircularProgress from "@mui/material/CircularProgress";
 import Alert from "@mui/material/Alert";
 import "../../../styles/job_seeker/dashboard.css";

 /**
  * JobGrid Component
  *
  * A functional React component that displays a grid of job listings for job seekers.
  * Handles loading, error states, and renders job details in a slideshow format.
  *
  * @component
  * @returns {JSX.Element} The rendered JobGrid component.
  */
 const JobGrid = () => {
   const { t } = useTranslation(); // Translation hook for localization
   const { jobs, loading, error } = useSelector(
     (state: RootState) => state.dashboard
   ); // Access Redux store state for job data, loading status, and error messages

   /**
    * Display a loading spinner and message while jobs are being fetched.
    */
   if (loading) {
     return (
       <div className="loading-container">
         <CircularProgress /> {/* Loading spinner */}
         <p>{t("loading_jobs")}</p> {/* Translated loading message */}
       </div>
     );
   }

   /**
    * Display an error message if fetching jobs fails.
    */
   if (error) {
     return (
       <div className="error-container">
         <Alert severity="error">{t("error_message")}</Alert>{" "}
         {/* Error alert */}
       </div>
     );
   }

   // Duplicate job list to simulate a slideshow effect
   const duplicateJobs = [...jobs, ...jobs];

   return (
     <div className="slideshow-container">
       <div className="slideshow">
         {duplicateJobs.map((job, index) => (
           <Card className="job_card" key={`${job.jobID}-${index}`}>
             <CardContent>
               {/* Job Title */}
               <Typography variant="h6" gutterBottom>
                 {job.title || t("no_title")}{" "}
                 {/* Fallback to translated "No Title" */}
               </Typography>
               {/* Uncomment below to display job description */}
               {/* <Typography variant="body2" color="textSecondary">
                {job.description?.aboutTheJob || t("no_description")} 
              </Typography> */}
               {/* Payment Details */}
               <Typography variant="body2" color="primary">
                 {t("pay")}: ${job.paymentFrom || "N/A"} - $
                 {job.paymentTo || "N/A"} {t("per hour")}
               </Typography>
             </CardContent>
           </Card>
         ))}
       </div>
     </div>
   );
 };

 export default JobGrid;
