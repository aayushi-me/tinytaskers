import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  applicationID: { type: String, required: true, unique: true },
  jobID: { type: String, required: true },
  jobName: { type: String, required: true },
  jobSeekerID: { type: String, required: true },
  comment: { type: String },
  applicationStatus: {
    type: String,
    enum: ["Pending", "Approved", "Denied"],
    default: "Pending",
  },
  appliedOn: { type: Date, required: true },
  resume: { type: String },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
