import { saveUser, loginUser } from "../services/authService.js";
import Counter from "../models/counterModel.js";
import User from "../models/userModel.js"; // Import User model
import jwt from "jsonwebtoken"; // Ensure you have jwt for token generation

// Generate unique user ID
export const generateUserID = async () => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "userID" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    console.log("Counter for userID updated to:", counter.seq);
    return counter.seq;
  } catch (error) {
    console.error("Error generating userID:", error);
    throw new Error("Failed to generate userID");
  }
};

// User Registration
export const registerUser = async (req, res) => {
  try {
    console.log("Request body received:", req.body);

    const { name, email, password, dob, role } = req.body;

    if (!name || !email || !password || !dob || !role) {
      return res.status(400).json({
        message: "Missing required fields: name, email, password, dob, or role.",
      });
    }

    const userID = await generateUserID();
    console.log("Generated userID:", userID);

    const userData = {
      userID,
      name,
      email,
      password,
      dob,
      role,
    };

    const savedUser = await saveUser(userData);

    res.status(201).json({
      message: "User registered successfully",
      userID: savedUser.userID,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);

    if (error.message === "Email is already registered") {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

// Admin Registration
export const registerAdmin = async (req, res) => {
  try {
    const userID = await generateUserID();

    const adminData = {
      ...req.body,
      userID,
    };

    const savedAdmin = await saveUser(adminData);
    res.status(201).json({
      message: "Admin registered successfully",
      userID: savedAdmin.userID,
    });
  } catch (error) {
    if (error.message === "Email is already registered") {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = {
      id: user._id,
      userID: foundUser.userID,
      role: foundUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Fetch User Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userID; // Extract `userID` from the decoded token
    console.log("Fetching profile for userID:", userId); // Debugging

    // Query the database by `userID`
    const user = await User.findOne({ userID: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Upload Profile Photo
export const uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.userID;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePhoto = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const user = await User.findOneAndUpdate(
      { userID: userId },
      { profilePhoto },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile photo updated successfully",
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    console.error("Error in uploadProfilePhoto:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userID; // Extract `userID` from the decoded token
    const updates = req.body;

    // Prevent certain fields from being updated
    delete updates.email; // Email is not editable
    delete updates.password; // Password is not editable here

    // Use `findOneAndUpdate` to match `userID`
    const user = await User.findOneAndUpdate({ userID: userId }, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete User Profile
// authController.js
export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.userID; // Extract `userID` from the decoded token

    // Delete the user from the database
    const deletedUser = await User.findOneAndDelete({ userID: userId });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
