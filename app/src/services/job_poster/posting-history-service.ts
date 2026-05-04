import { Job } from "../../models/Job";

const API_URL = "http://localhost:3002/listings/posters";

export const getJobsByPosterId = async (posterID: string): Promise<Job[]> => {
  try {
    const response = await fetch(`${API_URL}/${posterID}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch jobs.");
    }
    const data = await response.json();
    return data.data; // Assuming `data` is the array of jobs
  } catch (error) {
    throw error;
  }
};
