/**
 * profileSlice.ts
 *
 * Redux slice to manage user profile state, including actions for:
 * - Fetching user profile
 * - Updating profile information
 * - Uploading profile photo
 * - Deleting user profile
 * Utilizes `createAsyncThunk` for handling asynchronous API requests.
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Interface for the user profile
interface Profile {
  name?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  jobTitle?: string;
  education?: string;
  hobbies?: string[];
  skills?: string[];
  workExperience?: string;
  profilePhoto?: string;
  profileSummary?: string;
}

// Interface for the profile state
interface ProfileState {
  profile: Profile;
  loading: boolean;
  error: string | null;
}

// Initial state for the profile slice
const initialState: ProfileState = {
  profile: {},
  loading: false,
  error: null,
};

/**
 * Fetch user profile.
 * @returns {Promise<Profile>} - The user's profile data.
 * @throws {string} - Error message if the request fails.
 */
export const fetchProfile = createAsyncThunk<Profile, void, { rejectValue: string }>(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');

      const response = await axios.get('http://localhost:3002/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch profile');
    }
  }
);

// Thunk to save updated profile
export const saveProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>(
  'profile/saveProfile',
  async (updatedProfile, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');

      const response = await axios.put('http://localhost:3002/auth/profile', updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to save profile');
    }
  }
);

// Thunk to update profile photo
export const updateProfilePhoto = createAsyncThunk<string, File, { rejectValue: string }>(
  'profile/updateProfilePhoto',
  async (file, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');

      const formData = new FormData();
      formData.append('profilePhoto', file);

      const response = await axios.put('http://localhost:3002/auth/profile/photo', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.profilePhoto;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to upload profile photo');
    }
  }
);

// Thunk to delete user profile
export const deleteProfile = createAsyncThunk<null, void, { rejectValue: string }>(
  'profile/deleteProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please log in.');

      const response = await axios.delete('http://localhost:3002/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Will trigger fulfilled action
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete profile');
    }
  }
);

// Create the profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchProfile actions
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch profile';
        state.loading = false;
      })

      // Handle saveProfile actions
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(saveProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to save profile';
        state.loading = false;
      })

      // Handle updateProfilePhoto actions
      .addCase(updateProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePhoto.fulfilled, (state, action: PayloadAction<string>) => {
        state.profile.profilePhoto = action.payload;
        state.loading = false;
      })
      .addCase(updateProfilePhoto.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to upload profile photo';
        state.loading = false;
      })

      // Handle deleteProfile actions
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = {}; // Clear profile after deletion
        state.loading = false;
      })
      .addCase(deleteProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to delete profile';
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;
