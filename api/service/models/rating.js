import mongoose from "mongoose";

/**
 * Mongoose schema for ratings.
 * 
 * This schema represents a rating given to a job. It includes details such as:
 * - The job ID the rating is associated with.
 * - The rating value (must be between 1 and 5).
 * - The ID and role of the reviewer (e.g., Job Seeker or Job Poster).
 * 
 * Fields:
 * - `jobID`: The ID of the job being rated (required).
 * - `rating`: The rating value, constrained between 1 and 5 (required).
 * - `reviewerID`: The ID of the user providing the rating (required).
 * - `reviewerRole`: The role of the user providing the rating, either "Job Seeker" or "Job Poster" (required).
 */
const ratingSchema = new mongoose.Schema({
    jobID: { type: String, required: true }, // The ID of the job being rated
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating value (1-5)
    reviewerID: { type: String, required: true }, // The ID of the reviewer
    reviewerRole: { 
        type: String, 
        required: true, 
        enum: ["Job Seeker", "Job Poster"] // Role must be either Job Seeker or Job Poster
    },
});

/**
 * Mongoose model for the Rating schema.
 * 
 * This model provides an interface to interact with the `ratings` collection in the database.
 */
const RatingModel = mongoose.model("Rating", ratingSchema);

export default RatingModel;
