import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface defining the structure of the Job Poster Dashboard state.
 *
 * @typedef {Object} JobPosterDashboardState
 * @property {number} totalJobsPosted - The total number of jobs posted by the job poster.
 */
interface JobPosterDashboardState {
  totalJobsPosted: number;
}

/**
 * Initial state for the Job Poster Dashboard slice.
 *
 * @type {JobPosterDashboardState}
 */
const initialState: JobPosterDashboardState = {
  totalJobsPosted: 0, // Initial value for total jobs posted
};

/**
 * Redux slice for managing the Job Poster Dashboard state.
 * This slice handles updates to job statistics like the total number of jobs posted.
 */
const jobPosterDashboardSlice = createSlice({
  name: "jobPosterDashboard", // Name of the slice
  initialState, // Initial state object
  reducers: {
    /**
     * Updates the total number of jobs posted in the state.
     *
     * @param {JobPosterDashboardState} state - Current state of the slice.
     * @param {PayloadAction<{ totalJobsPosted: number }>} action - Action containing the updated stats.
     */
    updateStats: (
      state,
      action: PayloadAction<{ totalJobsPosted: number }>
    ) => {
      state.totalJobsPosted = action.payload.totalJobsPosted; // Update the total jobs posted
    },
  },
});

/**
 * Export the action creator for updating job statistics.
 * This is used to dispatch the `updateStats` action from components or thunks.
 */
export const { updateStats } = jobPosterDashboardSlice.actions;

/**
 * Export the reducer for the Job Poster Dashboard slice.
 * This reducer is added to the Redux store.
 */
export default jobPosterDashboardSlice.reducer;
