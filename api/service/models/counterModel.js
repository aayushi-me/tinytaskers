import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Counter name (e.g., "applicationID", "userID")
  seq: { type: Number, default: 0 }, // Sequence value
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
