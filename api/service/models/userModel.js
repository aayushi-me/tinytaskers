import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  role: {
    type: String,
    enum: ["JobSeeker", "JobPoster"], // Only allow these roles
    default: "JobSeeker",
  },
  languages: { type: [String], required: false }, // Array of spoken languages
  jobTitle: { type: String, required: false }, // Current job title/occupation
  workExperience: { type: String, required: false }, // Work experience in years or description
  skills: { type: [String], required: false }, // Array of skills
  education: { type: String, required: false }, // Education details (degree, institution, year)
  communicationPreference: {
    type: String,
    enum: ["Email", "Phone", "SMS"],
    required: false,
    default: "Email", // Default communication preference
  },
  profileSummary: { type: String, required: false }, // Short bio or summary
  hobbies: { type: [String], required: false }, // Array of hobbies or interests
  profilePhoto: { type: String, required: false }, // Profile photo URL or Base64
  createdOn: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
