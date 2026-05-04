import * as ratingService from "./../services/ratingService.js";
import { setSuccess, setError } from "./response-handler.js";

/**
 * Creates a new rating for a specific job.
 *
 * This function takes a job ID from the request parameters and rating details from the request body.
 * It then saves the new rating in the database and returns the created rating.
 *
 * @param {Object} request - Express request object.
 * @param {Object} request.params - The route parameters.
 * @param {string} request.params.jobID - The ID of the job for which the rating is being created.
 * @param {Object} request.body - The request body containing rating details (e.g., rating value, review).
 * @param {Object} response - Express response object used to send the API response.
 * @returns {void} Sends the created rating or an error response.
 */
export const createReward = async (request, response) => {
    try {
        const { jobID } = request.params;
        const newReward = { ...request.body, jobID };
        const reward = await rewardService.save(newReward);
        setSuccess(reward, response);
    } catch (error) {
        setError(error, response);
    }
};

/**
 * Retrieves all ratings for a specific job.
 *
 * This function fetches all ratings associated with a given job ID from the database.
 *
 * @param {Object} request - Express request object.
 * @param {Object} request.params - The route parameters.
 * @param {string} request.params.jobID - The ID of the job whose ratings are to be retrieved.
 * @param {Object} response - Express response object used to send the API response.
 * @returns {void} Sends the list of ratings or an error response.
 */
export const getJobRewards = async (request, response) => {
    try {
        const { jobID } = request.params;
        const rewards = await rewardService.findByJobID(jobID);
        setSuccess(rewards, response);
    } catch (error) {
        setError(error, response);
    }
};