import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Job } from '../types/jobManagment'; // Import Job type

// Async thunk to fetch job listings
export const fetchJobs = createAsyncThunk<Job[]>(
  'jobListing/fetchJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3002/listings/job-ids');
      return response.data.data; // Ensure data matches Job type
    } catch (error) {
      return rejectWithValue('Failed to fetch jobs. Please try again later.');
    }
  }
);

// Initial state
interface JobListingState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobListingState = {
  jobs: [],
  loading: false,
  error: null,
};

// Job listing slice
const jobListingSlice = createSlice({
  name: 'jobListing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default jobListingSlice.reducer;
