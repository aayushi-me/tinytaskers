import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch job details
export const fetchJobDetail = createAsyncThunk<any, string>(
  "jobDetail/fetchJobDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3002/listings/jobs/${id}`);
      return response.data.data; // Adjust based on API response structure
    } catch (error) {
      return rejectWithValue("Failed to fetch job details. Please try again later.");
    }
  }
);

// Initial state
interface JobDetailState {
  jobDetail: any | null; // Replace `any` with a proper type if available
  loading: boolean;
  error: string | null;
}

const initialState: JobDetailState = {
  jobDetail: null,
  loading: false,
  error: null,
};

// Job detail slice
const jobDetailSlice = createSlice({
  name: "jobDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.jobDetail = action.payload;
      })
      .addCase(fetchJobDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default jobDetailSlice.reducer;