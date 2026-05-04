/**
 * RegisterPopup.tsx
 *
 * A popup component for user registration.
 * Handles form inputs for name, email, password, date of birth, and role selection.
 * Validates the Date of Birth field to ensure users are at least 14 years old.
 * Sends registration data to the server and handles error responses.
 */

import React, { useState } from "react";
import "../../styles/auth-popup.css";
import API from "../../api";

interface RegisterPopupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    role: "JobSeeker",
  });
  const [error, setError] = useState<string | null>(null);

  // Function to calculate the maximum allowed date for Date of Birth
  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 14); // Subtract 14 years from the current date
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await API.post("/auth/register/user", formData);
      alert("Registration Successful!");
      onSwitchToLogin(); // Switch to login popup after successful registration
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Register</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Name Field */}
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Full Name:
            </label>
            <input
              id="name"
              type="text"
              placeholder="Please enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Please enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Please enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Date of Birth Field */}
          <div style={{ marginBottom: "15px", width: "100%" }}>
            <label
              htmlFor="dob"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Date of Birth:
            </label>
            <input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              max={getMaxDate()} // Set maximum allowed date dynamically
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Role Field */}
          <div style={{ marginBottom: "20px", width: "100%" }}>
            <label
              htmlFor="role"
              style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
            >
              Role:
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <option value="JobSeeker">Job Seeker</option>
              <option value="JobPoster">Job Poster</option>
            </select>
          </div>

          {/* Register Button */}
          <button type="submit">
            Register
          </button>
        </form>

        {error && (
          <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* Existing User Section */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <span>Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            style={{
              color: "#007bff",
              background: "none",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;
