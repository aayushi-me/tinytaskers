import { Job } from "../../models/Job";

const API_URL = "http://localhost:3002/listings/posters";

/**
 * Fetches jobs for a specific poster ID from the API.
 * 
 * @param posterID - The unique identifier for the job poster.
 * @returns A promise that resolves to an array of `Job` objects.
 * 
 * @throws Will throw an error if the API request fails or the response is not okay.
 */
export const getJobsByPosterId = async (posterID: string): Promise<Job[]> => {
  try {
    const response = await fetch(`${API_URL}/${posterID}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch jobs.");
    }
    const data = await response.json();
    return data.data; // Extract jobs from `data.data`
  } catch (error) {
    throw error;
  }
};
