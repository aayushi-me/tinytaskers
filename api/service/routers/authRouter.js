import express from "express";
import {
  registerUser,
  registerAdmin,
  login,
  getProfile,
  updateProfile,
  uploadProfilePhoto,
  deleteProfile
} from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Registration routes
router.post("/register/user", registerUser);
router.post("/register/admin", registerAdmin);

// Login route
router.post("/login", login);

// Profile routes
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.put(
  "/profile/photo",
  authenticate,
  upload.single("profilePhoto"),
  uploadProfilePhoto
);

// Delete user profile
router.delete("/profile", authenticate, deleteProfile); // New route

export default router;
