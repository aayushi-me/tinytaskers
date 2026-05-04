import axios from "axios";

export const getApplicantsByJobID = async (jobID: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3002/applications/job/${jobID}/applications`
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch applicants.");
  }
};

// Update application status
export const updateApplicationStatus = async (applicationID: string, approved: string) => {
  try {
    const response = await axios.patch(
      `http://localhost:3002/applications/${applicationID}/status`,
      {
        applicationStatus: approved.toString(), // Converts boolean to string for the request
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update application status.");
  }
};