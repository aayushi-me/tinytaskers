/**
 * store.ts
 *
 * Configures the Redux store for the application.
 * Combines reducers for various slices including user, profile, job applications, and more.
 * Provides typed exports for `RootState` and `AppDispatch`.
 */

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import profileReducer from "./profileSlice";
import jobApplicationsReducer from "./jobApplicationsSlice";
import jobSubmissionReducer from "./jobSubmissionSlice";
import dashboardReducer from "./dashboardSlice";
import jobPosterDashboardReducer from "./jobPosterDashboardSlice";
import postingHistoryReducer from "./postingHistorySlice";
import jobListingReducer from './jobListingSlice'; 
import jobDetailReducer from "./jobDetailSlice"; 

// Configure the Redux store with all slices
export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    jobApplications: jobApplicationsReducer,
    jobSubmission: jobSubmissionReducer,
    dashboard: dashboardReducer,
    jobPosterDashboard: jobPosterDashboardReducer,
    postingHistory: postingHistoryReducer,
    jobListing: jobListingReducer, 
    jobDetail: jobDetailReducer, 

  },
});

// Infer the state shape from the store
export type RootState = ReturnType<typeof store.getState>;

// Infer the dispatch type for the store
export type AppDispatch = typeof store.dispatch;
