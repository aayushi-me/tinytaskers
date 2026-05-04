import * as userProfileService from "../services/userProfileService.js";
import { setSuccess, setError } from "./response-handler.js";

/**
 * Handles the creation of a new user profile.
 *
 * @param {Object} request - The HTTP request object containing the user profile data in the body.
 * @param {Object} response - The HTTP response object to send the response.
 * @async
 */
export const post = async (request, response) => {
  try {
    const newUserProfile = { ...request.body }; // Extract user profile data from the request body
    const userProfile = await userProfileService.save(newUserProfile); // Save the user profile to the database
    setSuccess(userProfile, response); // Respond with success status and the created profile
  } catch (error) {
    setError(error, response); // Respond with error status and message
  }
};

/**
 * Handles fetching a user profile by ID.
 *
 * @param {Object} request - The HTTP request object containing the user ID in params.
 * @param {Object} response - The HTTP response object to send the response.
 * @async
 */
export const get = async (request, response) => {
  try {
    const { userID } = request.params; // Extract user ID from the request params
    const userProfile = await userProfileService.findById(userID); // Find the user profile by ID
    if (userProfile) {
      setSuccess(userProfile, response); // Respond with success status and the found profile
    } else {
      setError({ message: "User profile not found" }, response, 404); // Respond with error status and 404 if not found
    }
  } catch (error) {
    setError(error, response); // Respond with error status and message
  }
};

/**
 * Handles updating a user profile by ID.
 *
 * @param {Object} request - The HTTP request object containing the user ID in params and update data in the body.
 * @param {Object} response - The HTTP response object to send the response.
 * @async
 */
export const put = async (request, response) => {
  try {
    const { userID } = request.params; // Extract user ID from the request params
    const updateData = { ...request.body }; // Extract update data from the request body
    const updatedProfile = await userProfileService.update(userID, updateData); // Update the user profile
    if (updatedProfile) {
      setSuccess(updatedProfile, response); // Respond with success status and the updated profile
    } else {
      setError({ message: "User profile not found" }, response, 404); // Respond with error status and 404 if not found
    }
  } catch (error) {
    setError(error, response); // Respond with error status and message
  }
};

/**
 * Handles deleting a user profile by ID.
 *
 * @param {Object} request - The HTTP request object containing the user ID in params.
 * @param {Object} response - The HTTP response object to send the response.
 * @async
 */
export const deleteProfile = async (request, response) => {
  try {
    const { userID } = request.params; // Extract user ID from the request params
    console.log("Deleting profile with ID:", userID); // Debug log for deletion
    const result = await userProfileService.deleteById(userID); // Delete the user profile by ID
    if (result) {
      // Return a success message instead of a 204 status code
      response
        .status(200)
        .json({ message: `Profile with ID ${userID} deleted successfully` });
    } else {
      setError({ message: "User profile not found" }, response, 404); // Respond with error status and 404 if not found
    }
  } catch (error) {
    setError(error, response); // Respond with error status and message
  }
};
