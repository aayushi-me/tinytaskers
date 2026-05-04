import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "MySuperSecretKey123";

/**
 * Save a new user to the database after validating and hashing the password.
 * @param {Object} userData - User details (userID, name, email, password, dob, role).
 * @returns {Promise<Object>} - The saved user document.
 * @throws {Error} - If the email is already registered.
 */
export const saveUser = async (userData) => {
  const { userID, name, email, password, dob, role } = userData;

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user instance
  const user = new User({
    userID,
    name,
    email,
    password: hashedPassword,
    dob,
    role,
  });

  return user.save();
};

/**
 * Authenticate a user by validating credentials and generating a JWT token.
 * @param {string} email - The email of the user attempting to log in.
 * @param {string} password - The user's plain text password.
 * @returns {Promise<string>} - A JWT token if authentication succeeds.
 * @throws {Error} - If the email is not found or the password is incorrect.
 */
export const loginUser = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // Generate a JWT token with the user's role
  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h", // Token expires in 1 hour
  });

  return token;
};
