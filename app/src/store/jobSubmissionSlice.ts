/**
 * jobSubmissionSlice.ts
 *
 * Redux slice for managing job submission state.
 * Includes functionality for fetching job details and submitting job applications.
 * Utilizes `createAsyncThunk` for handling asynchronous API requests.
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface for job details
interface JobDetails {
  title: string;
  description: {
    aboutTheJob: string;
    essentialRequirements: string;
    specificJobResponsibilities: string;
    qualifications: string;
  };
  category: string;
  paymentFrom: number;
  paymentTo: number;
  location: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  milestones: { milestone: string }[];
  applyByDate: string;
}

// Interface for job application form data
interface FormData {
  applicationID: string;
  jobSeekerID: string;
  applicationStatus: string;
  appliedOn: string;
  resume: File | null;
  comment: string;
  availability: string;
  expectedSalary: string;
  consent: boolean;
}

// Interface for the job submission slice state
interface JobSubmissionState {
  jobDetails: JobDetails | null;
  formData: FormData;
  loading: boolean;
  error: string | null;
}

// Initial state for the job submission slice
const initialState: JobSubmissionState = {
  jobDetails: null,
  formData: {
    applicationID: '',
    jobSeekerID: '',
    applicationStatus: 'Pending',
    appliedOn: new Date().toISOString().split('T')[0],
    resume: null,
    comment: '',
    availability: 'Full-time',
    expectedSalary: '',
    consent: false,
  },
  loading: false,
  error: null,
};

/**
 * Fetch job details by job ID.
 * @param {string} jobID - The ID of the job to fetch.
 * @throws {string} Rejected value with error message on failure.
 */
export const fetchJobDetails = createAsyncThunk<JobDetails, string, { rejectValue: string }>(
  'jobSubmission/fetchJobDetails',
  async (jobID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/listings/jobs/${jobID}`);
      const jobData = response.data.data;
      return {
        title: jobData.title,
        description: jobData.description,
        category: jobData.category,
        paymentFrom: jobData.paymentFrom,
        paymentTo: jobData.paymentTo,
        location: jobData.location,
        milestones: jobData.milestones,
        applyByDate: jobData.applyByDate,
      };
    } catch (error: any) {
      return rejectWithValue('Failed to fetch job details.');
    }
  }
);

/**
 * Submit a job application.
 * @param {object} payload - The payload containing job ID and application data.
 * @param {string} payload.jobID - The ID of the job being applied for.
 * @param {FormData} payload.applicationData - The application form data.
 * @throws {string} Rejected value with error message on failure.
 */
export const submitJobApplication = createAsyncThunk<void, { jobID: string; applicationData: FormData }, { rejectValue: string }>(
  'jobSubmission/submitJobApplication',
  async ({ jobID, applicationData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please log in.');
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const jobSeekerID = decodedToken.userID;

      const formData = new FormData();
      formData.append('jobID', jobID);
      formData.append('jobName', applicationData.comment);
      formData.append('applicationStatus', applicationData.applicationStatus);
      formData.append('appliedOn', applicationData.appliedOn);
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume);
      }
      formData.append('comment', applicationData.comment);
      formData.append('availability', applicationData.availability);
      formData.append('expectedSalary', applicationData.expectedSalary);
      formData.append('jobSeekerID', jobSeekerID);

      await axios.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      return rejectWithValue('Failed to submit application.');
    }
  }
);

// Create the job submission slice
const jobSubmissionSlice = createSlice({
  name: 'jobSubmission',
  initialState,
  reducers: {
    /**
     * Update the job application form data in the state.
     * @param {Partial<FormData>} payload - Partial updates for form data fields.
     */
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.jobDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch job details.';
        state.loading = false;
      })
      .addCase(submitJobApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitJobApplication.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitJobApplication.rejected, (state, action) => {
        state.error = action.payload || 'Failed to submit application.';
        state.loading = false;
      });
  },
});

export const { updateFormData } = jobSubmissionSlice.actions;

export default jobSubmissionSlice.reducer;
