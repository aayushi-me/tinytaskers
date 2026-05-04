import axios from "axios";

// Create Axios instance with default configuration
const API = axios.create({
  baseURL: "http://localhost:3002", // Backend's base URL
  headers: {
    "Content-Type": "application/json", // Default headers for requests
  },
});

// Add a request interceptor to include the Authorization header
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    console.error("Request Interceptor Error:", error); // Log request interceptor errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle API responses globally
API.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      console.error(
        `API Error: ${error.response.status} - ${
          error.response.data.message || error.response.statusText
        }`
      );
      if (error.response.status === 401) {
        // Token expired or unauthorized access
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/"; // Redirect to login or home page
      }
    } else {
      console.error("Network or Server Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
