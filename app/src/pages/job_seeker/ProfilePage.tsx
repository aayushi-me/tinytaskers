/**
 * ProfilePage.tsx
 * 
 * This component renders the profile page for a user, allowing them to:
 * - View their profile information
 * - Edit and save changes to their profile
 * - Upload a profile photo
 * - Export their profile as a JSON file
 * - Delete their account
 */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProfile, saveProfile, updateProfilePhoto, deleteProfile } from "../../store/profileSlice";
import { RootState, AppDispatch } from "../../store/store";
import {
  Typography,
  Box,
  Container,
  Grid,
  Button,
  Avatar,
  TextField,
  Paper,
} from "@mui/material";
import Header from "../../components/job_seeker/Shared/Header";
import Footer from "../../components/job_seeker/Shared/Footer";
import "../../styles/job_seeker/profilePage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // For navigation after actions

const useAppDispatch: () => AppDispatch = useDispatch;

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // To navigate to dashboard after delete
  const { profile, loading, error } = useSelector((state: RootState) => state.profile);

  // Local state for edit mode and edited profile data
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  // Fetch the profile data on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Sync the local edited profile state with the Redux profile state
  useEffect(() => {
    setEditedProfile({
      ...profile,
      dob: profile.dob ? profile.dob.split("T")[0] : "", // Extract plain date
    });
  }, [profile]);

  /**
   * Validates the user's date of birth to ensure the user is at least 14 years old.
   * @param {string} dob - The date of birth in "YYYY-MM-DD" format.
   * @returns {boolean} - Whether the date of birth is valid.
   */
  const validateDOB = (dob: string): boolean => {
    const [year, month, day] = dob.split("-").map(Number);
    const today = new Date();
    const age = today.getFullYear() - year;

    if (age > 14) return true;
    if (age === 14) {
      const thisYearBirthday = new Date(year + 14, month - 1, day);
      return today >= thisYearBirthday;
    }
    return false;
  };

  /**
   * Handles profile photo upload and updates the profile photo in the Redux store.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(updateProfilePhoto(file));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  /**
   * Saves changes to the profile data after validation.
   */
  const handleSaveChanges = async () => {
    if (!validateDOB(editedProfile.dob || "")) {
      alert("Users must be at least 14 years old.");
      return;
    }

    try {
      await dispatch(saveProfile(editedProfile)).unwrap(); // Save profile with plain date
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("An error occurred while saving your profile. Please try again.");
    }
  };

  /**
   * Exports the profile data as a JSON file using the File System Access API.
   */
  const handleExportProfile = async () => {
    if ("showSaveFilePicker" in window) {
      try {
        const options = {
          suggestedName: "profile.json",
          types: [
            {
              description: "JSON Files",
              accept: { "application/json": [".json"] },
            },
          ],
        };

        const fileHandle = await (window as any).showSaveFilePicker(options);
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(profile, null, 2));
        await writable.close();
        alert("Profile exported successfully!");
      } catch (error) {
        console.error("Error exporting profile:", error);
        alert("Failed to export profile. Please try again.");
      }
    } else {
      alert("File System Access API is not supported in your browser.");
    }
  };

  /**
   * Deletes the user's account and navigates back to the landing page.
   */
  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteProfile()).unwrap(); // Call deleteProfile action
      alert("Your account has been deleted.");
      navigate("/"); // Redirect to the landing page after deletion
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("An error occurred while deleting your account. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-page">
      <Header />
      <div className="content-container">
        <Container maxWidth="lg">
          <Paper elevation={3} className="profile-header">
            <Box className="profile-header-content">
              <Box className="profile-avatar-container">
                <Avatar
                  src={profile.profilePhoto || "default-avatar.png"}
                  alt={profile.name || "Your Name"}
                  sx={{ width: 120, height: 120 }}
                />
                <Typography variant="h5" className="profile-name" mt={2}>
                  {profile.name || "Your Name"}
                </Typography>
                <Box className="profile-actions" mt={2}>
                <Button variant="outlined" component="label">
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </Button>
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    if (isEditing) {
                      handleSaveChanges();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={handleExportProfile}
                >
                  Export Profile
                </Button>
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  color="error"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </Box>
              </Box>
              <Box className="profile-summary-container">
                <Typography variant="h6">Profile Summary</Typography>
                {isEditing ? (
                  <TextField
                    name="profileSummary"
                    value={editedProfile.profileSummary || ""}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                  />
                ) : (
                  <Typography variant="body1" mt={1}>
                    {profile.profileSummary ||
                      "No summary available. Add a short description about yourself."}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
          <Grid container spacing={4} mt={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} className="profile-card">
                <Typography variant="h6" mb={2}>
                  Personal Information
                </Typography>
                <TextField
                  label="Name"
                  name="name"
                  value={editedProfile.name || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={editedProfile.email || ""}
                  disabled
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone"
                  name="phoneNumber"
                  value={editedProfile.phoneNumber || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={editedProfile.dob || ""} // Display plain date
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} className="profile-card">
                <Typography variant="h6" mb={2}>
                  Professional Information
                </Typography>
                <TextField
                  label="Job Title"
                  name="jobTitle"
                  value={editedProfile.jobTitle || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Education"
                  name="education"
                  value={editedProfile.education || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Hobbies"
                  name="hobbies"
                  value={editedProfile.hobbies?.join(", ") || ""}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      hobbies: e.target.value.split(", "),
                    })
                  }
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Skills"
                  name="skills"
                  value={editedProfile.skills?.join(", ") || ""}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      skills: e.target.value.split(", "),
                    })
                  }
                  disabled={!isEditing}
                  fullWidth
                  margin="normal"
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
