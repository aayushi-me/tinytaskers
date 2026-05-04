import express from "express";
import multer from "multer";
import { 
  submitApplication,
  // delete
  updateApplicationStatus,
  getApplicationsByJobName,
  getAllApplications,
  getApplicationsByJobSeekerID,
  getApplicationsByJobID
  // delete
} from "../controllers/applicationController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// Configure Multer for file uploads
const upload = multer({
  dest: "uploads/", // Save files in 'uploads' directory
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true); // Accept only PDF files
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

// Route for submitting applications
router.post("/", authenticate, upload.single("resume"), submitApplication);

//to be deleted
router.patch("/:applicationID/status", updateApplicationStatus);
router.get("/job/:jobName", getApplicationsByJobName);
router.get("/all", getAllApplications);
router.get("/seeker/:jobSeekerID", getApplicationsByJobSeekerID);
router.get("/job/:jobID/applications", getApplicationsByJobID);

//to be deleted

export default router;
