import mongoose from "mongoose";

/**
 * Schema for storing job location details
 * Fields:
 * - street: Street address of the job location
 * - city: City of the job location
 * - state: State of the job location
 * - zipCode: ZIP code of the job location
 */


const locationSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
});

/**
 * Schema for storing job description details
 * Fields:
 * - aboutTheJob: Brief overview of the job (required)
 * - essentialRequirements: Key skills and attributes required for the job (required)
 * - specificJobResponsibilities: Detailed list of responsibilities (required)
 * - qualifications: Optional qualifications needed for the job
 */

const descriptionSchema = new mongoose.Schema({
  aboutTheJob: { type: String, required: true },
  essentialRequirements: { type: String, required: true },
  specificJobResponsibilities: { type: String, required: true },
  qualifications: { type: String }, // Optional
});


/**
 * Schema for storing individual milestones
 * Fields:
 * - milestone: Description of the milestone (required)
 */
const milestoneSchema = new mongoose.Schema({
  milestone: { type: String, required: true },
});


/**
 * Main schema for job listings
 * Fields:
 * - jobID: Unique identifier for the job listing (required, unique)
 * - posterID: ID of the user who posted the job (required)
 * - title: Title of the job listing (required)
 * - description: Nested description schema containing details about the job (required)
 * - category: Category of the job (optional)
 * - paymentFrom: Minimum payment for the job (required)
 * - paymentTo: Maximum payment for the job (required)
 * - location: Embedded location schema with address details (optional)
 * - milestones: Array of milestone schemas to track progress (optional)
 * - createdDate: Date when the job was created, stored as a formatted string (required)
 * - applyByDate: Deadline to apply for the job, stored as a formatted string (optional)
 */

const listingSchema = new mongoose.Schema({
  jobID: { type: String, required: true, unique: true },
  posterID: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: descriptionSchema, required: true }, // Nested description schema
  category: { type: String },
  paymentFrom: { type: Number, required: true },
  paymentTo: { type: Number, required: true },
  location: locationSchema,
  milestones: [milestoneSchema], // Supports multiple milestones
  createdDate: { type: String, required: true }, // Date stored as formatted string
  applyByDate: { type: String, required: false }, // Apply-by date stored as formatted string
});

/**
 * Create and export the Mongoose model for job listings
 * The model provides an interface to interact with the "Listing" collection in the database.
 */
const ListingModel = mongoose.model("Listing", listingSchema);
export default ListingModel;
