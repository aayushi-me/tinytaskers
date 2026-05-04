/**
 * jobApplicationsSlice.ts
 *
 * Redux slice to manage the state of job applications.
 * Handles fetching job applications for a specific job seeker using `createAsyncThunk` and Redux Toolkit.
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface for a job application object
interface JobApplication {
  applicationID: string;
  jobName: string;
  location: string;
  category: string;
  applicationStatus: string;
  appliedOn: string;
  comment?: string;
}

// Interface for the job applications state
interface JobApplicationsState {
  applications: JobApplication[];
  loading: boolean;
  error: string | null;
}

// Initial state for the job applications slice
const initialState: JobApplicationsState = {
  applications: [],
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch job applications for the current job seeker.
 * Extracts the job seeker ID from the authentication token in localStorage.
 * @throws Error if the token is missing or invalid.
 */
export const fetchJobApplications = createAsyncThunk<
  JobApplication[], // Return type
  void, // Argument type
  { rejectValue: string }
>('jobApplications/fetchJobApplications', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found. Please log in.');
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const jobSeekerID = decodedToken.userID;

    if (!jobSeekerID) {
      throw new Error('Job seeker ID not found in token. Please log in.');
    }

      // Fetch applications for the job seeker
      const response = await axios.get(
        `http://localhost:3002/applications/seeker/${jobSeekerID}`
      );

    return response.data.data.map((app: any) => {
      const location = `${app.location.street}, ${app.location.city}, ${app.location.state}, ${app.location.zipCode}`;
      return {
        applicationID: app.applicationID,
        jobName: app.jobName,
        location: location || 'N/A',
        category: app.category || 'N/A',
        applicationStatus: app.applicationStatus,
        appliedOn: app.appliedOn,
        comment: app.comment || '',
      };
    });
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || 'Failed to fetch job applications.'
    );
  }
});

// Create the job applications slice
const jobApplicationsSlice = createSlice({
  name: 'jobApplications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobApplications.fulfilled, (state, action: PayloadAction<JobApplication[]>) => {
        state.applications = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobApplications.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch job applications.';
        state.loading = false;
      });
  },
});

export default jobApplicationsSlice.reducer;
