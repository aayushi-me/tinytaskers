import mongoose from "mongoose";

/**
 * Mongoose schema for user profiles.
 * This schema defines the structure of the `UserProfile` collection in the database.
 */
const userProfileSchema = new mongoose.Schema({
  /**
   * Unique identifier for the user profile.
   * @type {String}
   * @required
   */
  userID: {
    type: String,
    required: true,
    unique: true,
  },

  /**
   * Type of the user profile.
   * Can be either "job_seeker" or "job_poster".
   * @type {String}
   * @enum ["job_seeker", "job_poster"]
   * @required
   */
  userType: {
    type: String,
    required: true,
    enum: ["job_seeker", "job_poster"],
  },

  /**
   * Name of the user.
   * @type {String}
   * @required
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * Email address of the user.
   * @type {String}
   * @required
   */
  email: {
    type: String,
    required: true,
  },

  /**
   * Age of the user.
   * Required only for users with the "job_seeker" userType.
   * @type {Number}
   * @required (conditionally based on `userType`)
   */
  age: {
    type: Number,
    required: function () {
      return this.userType === "job_seeker";
    },
  },

  /**
   * Location of the user.
   * @type {String}
   * @required
   */
  location: {
    type: String,
    required: true,
  },

  /**
   * Skills of the user.
   * This is an array of strings and is required only for "job_seeker" userType.
   * @type {Array<String>}
   * @required (conditionally based on `userType`)
   */
  skills: {
    type: [String],
    required: function () {
      return this.userType === "job_seeker";
    },
  },

  /**
   * Short biography of the user.
   * @type {String}
   * @required
   */
  bio: {
    type: String,
    required: true,
  },

  /**
   * Company name associated with the user.
   * Required only for users with the "job_poster" userType.
   * @type {String}
   * @required (conditionally based on `userType`)
   */
  companyName: {
    type: String,
    required: function () {
      return this.userType === "job_poster";
    },
  },
});

/**
 * Mongoose model for the `UserProfile` schema.
 * This is used to interact with the `UserProfile` collection in the database.
 */
const UserProfileModel = mongoose.model("UserProfile", userProfileSchema);

export default UserProfileModel;
