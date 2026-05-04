import axios from 'axios';

// Define the interface for a job application
export interface JobApplication {
    id: string;
    jobTitle: string;
    companyName: string;
    status: string;
    appliedOn: string;
}

// Fetch job applications for the logged-in job seeker
export const fetchJobApplications = async (): Promise<JobApplication[]> => {
    try {
        const response = await axios.get<JobApplication[]>('/applications/seeker/:jobSeekerID'); // Replace :jobSeekerID dynamically if needed
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error("Unexpected API response:", response.data);
            return []; // Fallback to an empty array
        }
    } catch (error) {
        console.error('Error fetching job applications:', error);
        return []; // Return an empty array on error
    }
};