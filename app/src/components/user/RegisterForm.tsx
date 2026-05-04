/**
 * RegisterPopup.tsx
 *
 * A popup component for user registration.
 * Provides input fields for full name, email, password, date of birth, and role selection.
 * Handles registration functionality using an API call.
 */

import React, { useState } from "react";
import "../../styles/auth-popup.css";
import API from "../../api";

interface RegisterPopupProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("JobSeeker");
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the registration form submission.
   * Sends registration data to the server and switches to the login popup on success.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await API.post("/auth/register/user", {
        email,
        password,
        name,
        dob,
        role,
      });
      alert("Registration Successful!");
      onSwitchToLogin(); // Redirect to login popup after successful registration
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="popup">
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
      <form onSubmit={handleSubmit} className="popup-content">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="JobSeeker">Job Seeker</option>
            <option value="JobPoster">Job Poster</option>
          </select>
        </div>
        <button type="submit" className="login-btn">
          Register
        </button>
        <p className="register-link">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="login-link">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterPopup;
