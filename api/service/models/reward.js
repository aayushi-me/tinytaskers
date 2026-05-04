import mongoose from "mongoose";

/**
 * Mongoose schema for rewards.
 * 
 * This schema represents a reward associated with a job. It includes details such as:
 * - The job ID the reward is linked to.
 * - The ID and role of the user providing the reward (e.g., Job Seeker or Job Poster).
 * - The content of the reward.
 * - A timestamp indicating when the reward was created.
 * 
 * Fields:
 * - `jobID`: The ID of the job associated with the reward (required).
 * - `rewarderID`: The ID of the user providing the reward (required).
 * - `rewarderRole`: The role of the user providing the reward, either "Job Seeker" or "Job Poster" (required).
 * - `content`: The content or description of the reward (required).
 * - `timestamp`: The date and time when the reward was created (defaults to the current date and time).
 */
const rewardSchema = new mongoose.Schema({
    jobID: { type: String, required: true }, // The ID of the job associated with the reward
    rewarderID: { type: String, required: true }, // The ID of the user giving the reward
    rewarderRole: { 
        type: String, 
        required: true, 
        enum: ["Job Seeker", "Job Poster"] // Role must be either Job Seeker or Job Poster
    },
    content: { type: String, required: true }, // The actual reward content or description
    timestamp: { type: Date, default: Date.now } // The time when the reward was created
});

/**
 * Mongoose model for the Reward schema.
 * 
 * This model provides an interface to interact with the `rewards` collection in the database.
 */
const RewardModel = mongoose.model("Reward", rewardSchema);

export default RewardModel;
