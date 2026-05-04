// import express from "express";
import express from "express";
import * as ratingController from "./../controllers/ratingController.js";

const router = express.Router();

router.route('/jobs/:jobID/ratings')
    .post(ratingController.createRating)  // Create a new rating
    .get(ratingController.getJobRatings); // Get all ratings for a job

router.route('/:ratingID')
    .put(ratingController.updateRating); // Update a rating

export default router;