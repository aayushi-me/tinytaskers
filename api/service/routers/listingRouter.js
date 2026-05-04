import express from "express";
import { createListing, getListingById, updateListingById, deleteListingById, getAllJobIDs, getListingsByPosterId } from "../controllers/listingController.js";

const router = express.Router();

// Define routes
router.post("/", createListing);
router.get("/jobs/:jobID", getListingById);
router.patch("/jobs/:jobID", updateListingById);
router.delete("/jobs/:jobID", deleteListingById);
router.get("/job-ids", getAllJobIDs);
router.get("/posters/:posterID", getListingsByPosterId);

export default router;
