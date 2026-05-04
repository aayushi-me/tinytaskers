import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the structure of a job
type Job = {
  jobID: string;
  title: string;
  description: {
    aboutTheJob: string;
  };
  paymentFrom: number | string;
  paymentTo: number | string;
};

// Define the interface for the dashboard state
interface DashboardState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: DashboardState = {
  jobs: [], // Stores the list of fetched jobs
  loading: false, // Tracks the loading status of job data
  error: null, // Stores any error message during job fetch
};

/**
 * Asynchronous thunk to fetch job data from the server.
 * It first fetches a list of job IDs and then retrieves job details for each ID.
 *
 * @async
 * @function fetchJobs
 * @returns {Promise<Job[]>} Resolves to an array of job objects.
 * @throws Will throw an error if the API calls fail.
 */
export const fetchJobs = createAsyncThunk("dashboard/fetchJobs", async () => {
  // Fetch job IDs
  const jobIDsResponse = await axios.get(
    "http://localhost:3002/listings/job-ids"
  );
  const jobIDs = jobIDsResponse.data.data;

  // Fetch job details for each job ID
  const jobDetailsResponses = await Promise.all(
    jobIDs.map((jobID: string) =>
      axios.get(`http://localhost:3002/listings/jobs/${jobID}`)
    )
  );

  // Return job details as an array
  return jobDetailsResponses.map((response) => response.data.data);
});

/**
 * Redux slice for managing job data and dashboard state.
 * Handles fetching job data and managing loading/error states.
 */
const dashboardSlice = createSlice({
  name: "dashboard", // Name of the slice
  initialState, // Initial state object
  reducers: {}, // Placeholder for potential synchronous reducers
  extraReducers: (builder) => {
    builder
      /**
       * Updates the state when `fetchJobs` is pending.
       * Sets loading to true and clears any previous error.
       *
       * @param {DashboardState} state - The current state of the dashboard slice.
       */
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /**
       * Updates the state when `fetchJobs` is fulfilled.
       * Stores the fetched job data and sets loading to false.
       *
       * @param {DashboardState} state - The current state of the dashboard slice.
       * @param {Object} action - The Redux action object.
       * @param {Job[]} action.payload - The array of fetched job objects.
       */
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      /**
       * Updates the state when `fetchJobs` is rejected.
       * Sets loading to false and stores an error message.
       *
       * @param {DashboardState} state - The current state of the dashboard slice.
       */
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch job data. Please try again later.";
      });
  },
});

export default dashboardSlice.reducer;

