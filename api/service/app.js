import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import initializeRoutes from "./routers/index.js";
import Counter from "./models/counterModel.js"; 

// Function to initialize the applicationID counter
const initializeApplicationCounter = async () => {
  try {
    const existingCounter = await Counter.findById("applicationID");
    if (!existingCounter) {
      await Counter.create({ _id: "applicationID", seq: 0 });
      console.log("Initialized applicationID counter.");
    }
  } catch (error) {
    console.error("Error initializing applicationID counter:", error);
  }
};

// Function to initialize the userID counter
const initializeUserCounter = async () => {
  try {
    const existingCounter = await Counter.findById("userID");
    if (!existingCounter) {
      await Counter.create({ _id: "userID", seq: 0 });
      console.log("Initialized userID counter.");
    }
  } catch (error) {
    console.error("Error initializing userID counter:", error);
  }
};

// Wrapper to initialize all counters
const initializeCounters = async () => {
  await Promise.all([initializeApplicationCounter(), initializeUserCounter()]);
};

const initialize = (app) => {
  // Enable Cross-Origin Resource Sharing
  const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Allow cookies and authorization headers
  };
  app.use(cors(corsOptions));

  // Parse JSON and URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => {console.log("MongoDB connected");
      // Initialize counters after MongoDB connection is established
      initializeCounters();
    })
    .catch((error) => console.error("MongoDB connection error:", error.message));

  // Initialize application routes
  initializeRoutes(app);

  // 404 handler for unknown endpoints
  app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  });

  // Global error-handling middleware
  app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack); // Log the error stack
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  });
};

export default initialize;