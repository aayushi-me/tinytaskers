import Application from "../models/applicationModel.js";
import Counter from "../models/counterModel.js";
import Listing from "../models/listingModel.js";
import User from "../models/userModel.js"; // Import User model

// Generate unique application ID
export const generateApplicationID = async () => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "applicationID" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return `APP-${counter.seq}`; // Correctly formatted template string
  } catch (error) {
    console.error("Error generating applicationID:", error);
    throw new Error("Failed to generate applicationID");
  }
};

// Submit an application
export const submitApplication = async (req, res) => {
  try {
    const { jobID, jobName, jobSeekerID, comment, applicationStatus = "Pending", appliedOn } = req.body;

    if (!jobID || !jobName || !jobSeekerID) {
      return res.status(400).json({ message: "Missing required fields: jobID, jobName, or jobSeekerID" });
    }

    const applicationID = await generateApplicationID();

    const newApplication = new Application({
      applicationID,
      jobID,
      jobName,
      jobSeekerID,
      comment,
      applicationStatus,
      appliedOn: appliedOn || new Date().toISOString(),
    });

    const savedApplication = await newApplication.save();
    res.status(201).json({
      message: "Application submitted successfully",
      applicationID,
      data: savedApplication,
    });
  } catch (error) {
    console.error("Error in submitApplication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get applications by job seeker ID with location and category
export const getApplicationsByJobSeekerID = async (req, res) => {
  const { jobSeekerID } = req.params;

  if (!jobSeekerID) {
    return res.status(400).json({ message: "Job Seeker ID is required" });
  }

  const { page = 1, limit = 10 } = req.query;

  try {
    const applications = await Application.find({ jobSeekerID })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const jobIDs = applications.map((app) => app.jobID);
    const listings = await Listing.find({ jobID: { $in: jobIDs } });

    const enrichedApplications = applications.map((app) => {
      const listing = listings.find((list) => list.jobID === app.jobID);
      return {
        applicationID: app.applicationID,
        jobName: app.jobName,
        location: listing?.location || "N/A",
        category: listing?.category || "N/A",
        applicationStatus: app.applicationStatus,
        appliedOn: app.appliedOn,
        comment: app.comment,
      };
    });

    const totalApplications = await Application.countDocuments({ jobSeekerID });

    res.status(200).json({
      data: enrichedApplications,
      total: totalApplications,
      page: Number(page),
      totalPages: Math.ceil(totalApplications / limit),
    });
  } catch (error) {
    console.error("Error in getApplicationsByJobSeekerID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get applications by job name
export const getApplicationsByJobName = async (req, res) => {
  const { jobName } = req.params;

  if (!jobName) {
    return res.status(400).json({ message: "Job name is required" });
  }

  try {
    const applications = await Application.find({ jobName: { $regex: jobName, $options: "i" } }); // Case-insensitive match
    res.status(200).json({ data: applications });
  } catch (error) {
    console.error("Error in getApplicationsByJobName:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get all applications with filtering
export const getAllApplications = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const filter = status ? { applicationStatus: status } : {};

  try {
    const applications = await Application.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalApplications = await Application.countDocuments(filter);

    res.status(200).json({
      data: applications,
      total: totalApplications,
      page: Number(page),
      totalPages: Math.ceil(totalApplications / limit),
    });
  } catch (error) {
    console.error("Error in getAllApplications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  const { applicationID } = req.params;
  const { applicationStatus } = req.body;

  if (!applicationID || !applicationStatus) {
    return res.status(400).json({ message: "Missing required fields: applicationID or applicationStatus" });
  }

  try {
    const updatedApplication = await Application.findOneAndUpdate(
      { applicationID },
      { applicationStatus },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Error in updateApplicationStatus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Fetch user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by an authentication middleware
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by an authentication middleware
    const updates = req.body;

    // Prevent certain fields from being updated
    delete updates.email; // Email is not editable
    delete updates.password; // Password is not editable here

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getApplicationsByJobID = async (req, res) => {
  const { jobID } = req.params;

  if (!jobID) {
    return res.status(400).json({ message: "Job ID is required" });
  }

  try {
    // Fetch applications for the given jobID
    const applications = await Application.find({ jobID });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this job ID" });
    }

    // Fetch job seeker details
    const applicationDetails = await Promise.all(
      applications.map(async (app) => {
        let jobSeekerID;
        try {
          // Ensure jobSeekerID is a number
          jobSeekerID = Number(app.jobSeekerID);
          if (isNaN(jobSeekerID)) {
            throw new Error(`Invalid jobSeekerID: ${app.jobSeekerID}`);
          }

          // Fetch user details
          const user = await User.findOne({ userID: jobSeekerID }).select("name email");
          return {
            applicationID: app.applicationID,
            jobName: app.jobName,
            applicantName: user?.name || "N/A",
            applicantEmail: user?.email || "N/A",
            applicationStatus: app.applicationStatus,
            appliedOn: app.appliedOn,
            comment: app.comment,
            resume: app.resume || "N/A",
          };
        } catch (err) {
          console.error(`Error processing application ${app.applicationID}:`, err.message);
          return {
            applicationID: app.applicationID,
            jobName: app.jobName,
            applicantName: "N/A",
            applicantEmail: "N/A",
            applicationStatus: app.applicationStatus,
            appliedOn: app.appliedOn,
            comment: app.comment,
            resume: app.resume || "N/A",
          };
        }
      })
    );

    res.status(200).json({ data: applicationDetails });
  } catch (error) {
    console.error("Error in getApplicationsByJobID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
