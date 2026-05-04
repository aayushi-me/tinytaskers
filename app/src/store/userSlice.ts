/**
 * userSlice.ts
 *
 * Redux slice for managing user authentication state.
 * Includes actions for:
 * - Logging in a user
 * - Registering a new user
 * Utilizes `createAsyncThunk` for asynchronous API interactions.
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api'; // Adjust the path as per your project structure
import { RootState } from './store';

// Define the user state interface
interface UserState {
  isAuthenticated: boolean;
  userData: any | null;
  loading: boolean;
  error: string | null;
}

// Initial state for user authentication
const initialState: UserState = {
  isAuthenticated: false,
  userData: null,
  loading: false,
  error: null,
};

// Interfaces for authentication input and response data
interface AuthData {
  email: string;
  password: string;
  fullName?: string;
  dob?: string;
}

interface AuthResponse {
  user?: any;
  token?: string;
}

interface ErrorResponse {
  message: string;
}

export const loginUser = createAsyncThunk<AuthResponse, AuthData, {
  state: RootState,
  rejectValue: ErrorResponse
}>(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", data);
      localStorage.setItem("token", response.data.token); // handle token storage as needed
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.response?.data?.message || 'Login failed' });
    }
  }
);

export const registerUser = createAsyncThunk<AuthResponse, AuthData, {
  state: RootState,
  rejectValue: ErrorResponse
}>(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register/user", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ message: error.response?.data?.message || 'Registration failed' });
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle login actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || null;
      })

      // Handle registration actions
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || null;
      });
  }
});

export default userSlice.reducer;
