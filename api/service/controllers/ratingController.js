import * as ratingService from "./../services/ratingService.js";
import { setSuccess, setError } from "./response-handler.js";

/**
 * Creates a new rating for a specific job.
 * 
 * @param {Object} request - Express request object.
 * @param {Object} request.params - The route parameters.
 * @param {string} request.params.jobID - The ID of the job for which the rating is being created.
 * @param {Object} request.body - The request body containing rating details (e.g., rating value, review).
 * @param {Object} response - Express response object.
 * @returns {void}
 */
export const createRating = async (request, response) => {
    try {
        const { jobID } = request.params;
        const newRating = { ...request.body, jobID };
        const rating = await ratingService.save(newRating);
        setSuccess(rating, response);
    } catch (error) {
        setError(error, response);
    }
};

/**
 * Retrieves all ratings for a specific job.
 * 
 * @param {Object} request - Express request object.
 * @param {Object} request.params - The route parameters.
 * @param {string} request.params.jobID - The ID of the job whose ratings are to be retrieved.
 * @param {Object} response - Express response object.
 * @returns {void}
 */
export const getJobRatings = async (request, response) => {
    try {
        const { jobID } = request.params;
        const ratings = await ratingService.findByJobID(jobID);
        setSuccess(ratings, response);
    } catch (error) {
        setError(error, response);
    }
};

/**
 * Updates an existing rating.
 * 
 * @param {Object} request - Express request object.
 * @param {Object} request.params - The route parameters.
 * @param {string} request.params.ratingID - The ID of the rating to be updated.
 * @param {Object} request.body - The request body containing updated rating details (e.g., rating value, review).
 * @param {Object} response - Express response object.
 * @returns {void}
 */
export const updateRating = async (request, response) => {
    try {
        const { ratingID } = request.params;
        const updatedData = { ...request.body };
        const updatedRating = await ratingService.update(ratingID, updatedData);
        setSuccess(updatedRating, response);
    } catch (error) {
        setError(error, response);
    }
};