import UserProfile from "../models/userProfileModel.js";

/**
 * Saves a new user profile to the database.
 *
 * @param {Object} newUserProfile - The data for the new user profile.
 * @returns {Promise<Object>} - The saved user profile document.
 * @throws {Error} - Throws an error if saving fails.
 */
export const save = async (newUserProfile) => {
  const userProfile = new UserProfile(newUserProfile); // Create a new instance of the UserProfile model
  return userProfile.save(); // Save the profile to the database
};

/**
 * Finds a user profile by its unique user ID.
 *
 * @param {String} userID - The unique identifier of the user profile to find.
 * @returns {Promise<Object|null>} - The user profile document if found, or `null` if not found.
 * @throws {Error} - Throws an error if the query fails.
 */
export const findById = async (userID) => {
  return UserProfile.findOne({ userID }); // Find the user profile by userID
};

/**
 * Updates an existing user profile by its unique user ID.
 *
 * @param {String} userID - The unique identifier of the user profile to update.
 * @param {Object} updateData - The data to update in the user profile.
 * @returns {Promise<Object|null>} - The updated user profile document if found, or `null` if not found.
 * @throws {Error} - Throws an error if the update operation fails.
 */
export const update = async (userID, updateData) => {
  return UserProfile.findOneAndUpdate(
    { userID }, // Query to find the user profile by userID
    updateData, // Data to update in the profile
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied during the update
    }
  );
};

/**
 * Deletes a user profile by its unique user ID.
 *
 * @param {String} userID - The unique identifier of the user profile to delete.
 * @returns {Promise<Boolean>} - Returns `true` if the user profile was deleted, or `false` if no matching profile was found.
 * @throws {Error} - Throws an error if the deletion operation fails.
 */
export const deleteById = async (userID) => {
  const result = await UserProfile.findOneAndDelete({ userID }); // Delete the user profile by userID
  return result !== null; // Return `true` if deletion was successful, otherwise `false`
};
//add