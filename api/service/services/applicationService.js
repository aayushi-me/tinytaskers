import Application from "../models/applicationModel.js";
import Counter from "../models/counterModel.js";

// Save a new application
export const save = async (newApplication) => {
  const application = new Application(newApplication);
  return application.save();
};

// Initialize counter for applicationID
export const initializeCounter = async () => {
  const existingCounter = await Counter.findById("applicationID");
  if (!existingCounter) {
    console.log("Initializing Counter for applicationID...");
    await Counter.create({ _id: "applicationID", seq: 0 });
  }
};

// Find an application by its ID
export const findById = async (applicationID) => {
  return Application.findOne({ applicationID });
};

// Update an application's status or details by its ID
export const update = async (applicationID, updateData) => {
  return Application.findOneAndUpdate({ applicationID }, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Validate against schema constraints
  });
};

// Delete an application by its ID
export const deleteById = async (applicationID) => {
  const result = await Application.findOneAndDelete({ applicationID });
  return result !== null; // Return true if an application was deleted
};

// Find all applications for a specific job name
export const findByJobName = async (jobName) => {
  return Application.find({ jobName });
};

// Find all applications
export const findAll = async () => {
  return Application.find();
};

// Find applications by job seeker ID
export const findByJobSeekerId = async (jobSeekerID) => {
  return Application.find({ jobSeekerID });
};
