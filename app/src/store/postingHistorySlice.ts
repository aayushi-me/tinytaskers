import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getJobsByPosterId } from "../services/job_poster/posting-history-service";

type Location = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type Job = {
  jobID: string;
  title: string;
  category: string;
  paymentFrom: number;
  paymentTo: number;
  location: Location;
};

interface PostingHistoryState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: PostingHistoryState = {
  jobs: [],
  loading: false,
  error: null,
};

// Thunk to fetch jobs by poster ID
export const fetchJobsByPosterId = createAsyncThunk(
  "postingHistory/fetchJobsByPosterId",
  async (posterID: string, { rejectWithValue }) => {
    try {
      const jobs = await getJobsByPosterId(posterID);
      return jobs;
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred.");
    }
  }
);

const postingHistorySlice = createSlice({
  name: "postingHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsByPosterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobsByPosterId.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobsByPosterId.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

export default postingHistorySlice.reducer;
