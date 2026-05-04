import express from "express";
import * as rewardController from "../controllers/rewardController.js";

const router = express.Router();

router.route('/jobs/:jobID/rewards')
    .post(rewardController.createReward)  // Create a new reward
    .get(rewardController.getJobRewards); // Get all rewards for a job

export default router;