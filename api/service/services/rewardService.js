import Rating from "./../models/rating.js";

/**
 * Saves a new rating to the database.
 * 
 * @param {Object} newRating - The rating data to be saved.
 * @param {string} newRating.jobID - The ID of the job associated with the rating.
 * @param {number} newRating.rating - The rating value (1 to 5).
 * @param {string} newRating.reviewerID - The ID of the user providing the rating.
 * @param {string} newRating.reviewerRole - The role of the reviewer ("Job Seeker" or "Job Poster").
 * @returns {Promise<Object>} - A promise that resolves to the saved rating document.
 */
export const save = async (newRating) => {
    const rating = new Rating(newRating);
    return rating.save();
};

/**
 * Finds all ratings associated with a specific job ID.
 * 
 * @param {string} jobID - The ID of the job whose ratings are to be retrieved.
 * @returns {Promise<Array>} - A promise that resolves to an array of rating documents for the specified job.
 */
export const findByJobID = async (jobID) => {
    return Rating.find({ jobID });
};

/**
 * Updates an existing rating by its ID.
 * 
 * @param {string} ratingID - The ID of the rating to be updated.
 * @param {Object} updatedData - The updated data for the rating.
 * @param {number} [updatedData.rating] - The updated rating value (1 to 5).
 * @param {string} [updatedData.reviewerRole] - The updated role of the reviewer.
 * @returns {Promise<Object|null>} - A promise that resolves to the updated rating document or `null` if not found.
 */
export const update = async (ratingID, updatedData) => {
    return Rating.findByIdAndUpdate(ratingID, updatedData, { new: true });
};
