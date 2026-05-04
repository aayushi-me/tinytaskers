// import express from "express";
// import * as userProfileController from "../controllers/userProfileController.js";

// const router = express.Router();

// router.route("/")
//   .post(userProfileController.post);

// router
//   .route("/profiles")
//   .get(userProfileController.get)
//   .put(userProfileController.put)
//   .delete(userProfileController.deleteProfile);

// export default router;

import express from "express";
import * as userProfileController from "../controllers/userProfileController.js";

const router = express.Router();

// Route to create a new user profile
router.route("/")
  .post(userProfileController.post);

// Route to handle all profiles retrieval
router.route("/profiles")
  .get(userProfileController.get);

// Route to handle specific profile operations using userID
router.route("/:userID")
  .get(userProfileController.get) // Fetch a specific profile by userID
  .put(userProfileController.put) // Update a specific profile by userID
  .delete(userProfileController.deleteProfile); // Delete a specific profile by userID

export default router;

