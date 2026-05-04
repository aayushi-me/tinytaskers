import Listing from "../models/listingModel.js";
import { setSuccess, setError } from "./response-handler.js";

import mongoose from "mongoose";

// Define the schema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Name of the counter (e.g., "jobID")
  seq: { type: Number, default: 0 }, // Counter value
});

// Check if the model already exists before defining it
const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);

// Function to generate a unique Job ID
export const generateJobID = async () => {
  try {
    let currentID = 1; // Start from J1
    let isUnique = false;

    while (!isUnique) {
      // Construct the Job ID
      const jobID = `J${currentID}`;

      // Check if the jobID exists in the database
      const existingJob = await mongoose
        .model("Listing") // Replace 'Listing' with your actual model name
        .findOne({ jobID })
        .exec();

      if (!existingJob) {
        // If the jobID does not exist, it's unique
        isUnique = true;
        return jobID;
      }

      // Increment the ID and try again
      currentID++;
    }
  } catch (error) {
    console.error("Error generating job ID:", error);
    throw new Error("Failed to generate job ID");
  }
};

export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const createListing = async (request, response) => {
  try {
    const {
      posterID,
      title,
      description,
      category,
      payment_from,
      payment_to,
      location,
      Milestones,
      applyByDate, // Accept the apply-by date from the request
    } = request.body;

    const jobID = await generateJobID(); // Generate unique job ID
    const createdDate = formatDate(new Date()); // Format current timestamp
    const formattedApplyByDate = applyByDate
      ? formatDate(new Date(applyByDate))
      : null; // Format applyByDate if provided

    const newListing = new Listing({
      jobID,
      posterID,
      title,
      description: {
        aboutTheJob: description["About the Job"],
        essentialRequirements: description["Essential Requirements"],
        specificJobResponsibilities:
          description["Specific Job Responsibilities"],
        qualifications: description["Qualifications"] || "", // Optional
      },
      category,
      paymentFrom: payment_from,
      paymentTo: payment_to,
      location,
      milestones: Milestones
        ? Object.entries(Milestones).map(([key, value]) => ({
            milestone: `${key}: ${value}`,
          }))
        : [], // Handle undefined or null Milestones gracefully
      createdDate, // Use formatted createdDate
      applyByDate: formattedApplyByDate, // Use formatted applyByDate
    });

    await newListing.save();
    setSuccess(newListing, response);
  } catch (error) {
    setError(error, response);
  }
};

export const getAllJobIDs = async (request, response) => {
  try {
    const listings = await Listing.find({}, "jobID"); // Only retrieve jobID
    const jobIDs = listings.map((listing) => listing.jobID); // Extract the jobID field
    setSuccess(jobIDs, response); // Send the job IDs as a successful response
  } catch (error) {
    setError(error, response); // Handle errors
  }
};

export const getListingById = async (request, response) => {
  try {
    const { jobID } = request.params;
    const listing = await Listing.findOne({ jobID });
    if (!listing) {
      return setError(
        new Error("Job not found. The job with the given ID does not exist."),
        response
      );
    }
    setSuccess(listing, response);
  } catch (error) {
    setError(error, response);
  }
};

export const updateListingById = async (request, response) => {
  try {
    const { jobID } = request.params;
    const {
      title,
      description,
      category,
      payment_from,
      payment_to,
      location,
      Milestones,
      applyByDate,
    } = request.body;

    const formattedApplyByDate = applyByDate
      ? formatDate(new Date(applyByDate))
      : null; // Format applyByDate if provided

    // Construct the updated fields
    const updatedFields = {
      ...(title && { title }),
      ...(description && {
        description: {
          aboutTheJob: description["About the Job"],
          essentialRequirements: description["Essential Requirements"],
          specificJobResponsibilities:
            description["Specific Job Responsibilities"],
          qualifications: description["Qualifications"] || "", // Optional
        },
      }),
      ...(category && { category }),
      ...(payment_from && { paymentFrom: payment_from }),
      ...(payment_to && { paymentTo: payment_to }),
      ...(location && { location }),
      ...(Milestones && {
        milestones: Object.entries(Milestones).map(([key, value]) => ({
          milestone: `${key}: ${value}`,
        })),
      }),
      ...(formattedApplyByDate && { applyByDate: formattedApplyByDate }),
    };

    const updatedListing = await Listing.findOneAndUpdate(
      { jobID },
      updatedFields,
      { new: true } // Return the updated document
    );

    if (!updatedListing) {
      return setError(
        new Error("Job not found. The job with the given ID does not exist."),
        response
      );
    }

    setSuccess(updatedListing, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Delete a job listing by job ID
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */

export const deleteListingById = async (request, response) => {
  try {
    const { jobID } = request.params;
    const deletedListing = await Listing.findOneAndDelete({ jobID });
    if (!deletedListing) {
      return setError(
        response,
        new Error("Job not found. The job with the given ID does not exist.")
      );
    }
    setSuccess({ message: "Job deleted successfully." }, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Retrieve all listings by a specific poster ID
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
export const getListingsByPosterId = async (request, response) => {
  try {
    const { posterID } = request.params;
    const listings = await Listing.find({ posterID });
    if (!listings || listings.length === 0) {
      return setError(
        new Error("No listings found for the given poster ID."),
        response
      );
    }
    setSuccess(listings, response);
  } catch (error) {
    setError(error, response);
  }
};
