import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../../styles/job_seeker/JobListing.css";
import { useNavigate } from "react-router-dom";
import { Job } from "../../../types/jobManagment"; // Import the Job type if it's in a separate file

interface JobListProps {
  jobs: Job[]; // Define the type for the jobs prop
}

// Component to display the list of jobs and their details
const JobList = () => {
    // State to manage the list of jobs
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  // Categories list
  const categories = [
    "Store Jobs",
    "Food Jobs",
    "Babysitting and Childcare",
    "School Help and Tutoring",
    "Creative Work",
    "Fun Places",
    "Online Jobs",
    "Starter Internships",
    "Sports and Fitness",
    "Seasonal Work",
    "Delivery Jobs",
    "Tech Support",
    "Cleaning Jobs",
    "Entertainment Jobs",
    "Personal Helper",
    "Social Media Jobs",
    "Community Service Jobs",
    "Event Jobs",
    "Animal Care",
  ];

  const navigate = useNavigate();


  // Payment list
  const paymentRanges = ["Below $20", "$20 - $50", "$50 - $100", "Above $100"];

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const jobIDsResponse = await axios.get(
          "http://localhost:3002/listings/job-ids"
        );
        const jobIDs = jobIDsResponse.data.data;

        const fetchedJobs: Job[] = [];
        for (const jobID of jobIDs) {
          const response = await axios.get(
            `http://localhost:3002/listings/jobs/${jobID}`
          );
          const jobData = response.data.data;
          console.log("Job Data from API:", jobData); // Log data here

          fetchedJobs.push({
            jobID: jobData.jobID,
            posterID: jobData.posterID || "Unknown",
            title: jobData.title,
            description: jobData.description,
            category: jobData.category,
            paymentFrom: jobData.paymentFrom || jobData.payment_from, 
            paymentTo: jobData.paymentTo || jobData.payment_to,     
            location: jobData.location,
            applyByDate: jobData.applyByDate,
            milestones: jobData.Milestones || {},  
          });
          console.log("Mapped Job Data:", fetchedJobs[fetchedJobs.length - 1]); // Log mapped data

        }
        console.log("Fetched Jobs:", fetchedJobs);
        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
      } catch (err) {
        console.error("Error Fetching Jobs:", err);
        setError("Failed to fetch job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle search functionality
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(term)
      );
    });

    setFilteredJobs(filtered);
  };

  // Navigate to the apply page
  const handleApplyClick = (jobID: string) => {
    navigate(`/Apply/${jobID}`); // Navigate to the apply page for the job
  };
  
  // Navigate to the job details page
  const handleDetailsClick = (jobID: string) => {
    navigate(`/job-details/${jobID}`); // Navigate to the job details page
  };


  // Apply filters
  const applyFilters = () => {
    const filtered = jobs.filter((job) => {
      const matchesCategory = selectedCategories.length
        ? selectedCategories.includes(job.category)
        : true;

        const matchesPayment = selectedPayment.length
        ? selectedPayment.some((range) => {
            const paymentFrom = job.paymentFrom; // Already a number
            const paymentTo = job.paymentTo; // Already a number
  
            if (range === "Below $20") return paymentFrom < 20;
            if (range === "$20 - $50") return paymentFrom >= 20 && paymentTo <= 50;
            if (range === "$50 - $100") return paymentFrom > 50 && paymentTo <= 100;
            if (range === "Above $100") return paymentTo > 100;
            return true;
          })
        : true;

      const matchesLocation = location
        ? Object.values(job.location)
            .join(" ")
            .toLowerCase()
            .includes(location.toLowerCase())
        : true;

        const matchesSearch = searchTerm
        ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(job.description)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true;
      

      return matchesCategory && matchesPayment && matchesLocation && matchesSearch;
    });

    setFilteredJobs(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePaymentChange = (range: string) => {
    setSelectedPayment((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

    // Clear all filters and reset to the original job list
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPayment([]);
    setLocation("");
    setSearchTerm("");
    setFilteredJobs(jobs); // Reset to original jobs
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

    // Render the job list and filters
  return (
    <div className="job-listing-layout">
      <div className="search-container">
        <TextField
          className="search-bar"
          label="Search Jobs"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
        />
      </div>

      <div className="main-content">
        <div className="filters-container">
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Payment</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {paymentRanges.map((range) => (
      <FormControlLabel
        key={range}
        control={
          <Checkbox
            checked={selectedPayment.includes(range)}
            onChange={() => handlePaymentChange(range)}
          />
        }
        label={range}
      />
    ))}
     </AccordionDetails>
     </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Location</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Enter Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                fullWidth
              />
            </AccordionDetails>
          </Accordion>

          <Button
            className="apply-button"
            variant="contained"
            color="primary"
            onClick={applyFilters}
            style={{ marginTop: "16px", width: "100%" }}
          >
            Apply Filters
          </Button>

          <Button
            className="clear-filters"
            onClick={clearFilters}
            size="small"
            style={{ marginTop: "8px", width: "100%" }}
          >
            Clear All
          </Button>
        </div>

        <div className="job-list-container">
          <List>
            {filteredJobs.map((job) => (
              <div key={job.jobID}>
                <ListItem>
                <ListItemText
          primary={
            <Typography variant="h6">
              <strong>{job.title}</strong>
            </Typography>
          }
          secondary={
            <>
              <Typography>
                <strong>Category:</strong> {job.category}
              </Typography>
              <Typography>
  <strong>Payment Range:</strong>{" "}
  {job.paymentFrom !== undefined && job.paymentTo !== undefined
    ? `$${job.paymentFrom} - $${job.paymentTo}`
    : "N/A"}
</Typography>


              <Typography>
                <strong>Location:</strong> {`${job.location.city}, ${job.location.state}`}
              </Typography>
              <Typography>
                <strong>Apply By:</strong> {job.applyByDate || "N/A"}
              </Typography>
            </>
                    }
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className="button-container">
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="detail-button"
                        onClick={() => handleDetailsClick(job.jobID)}
                        sx={{ flex: 1 }}
                      >
                        Details
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApplyClick(job.jobID)}
                        sx={{ flex: 1 }}
                        className="apply-button"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default JobList;