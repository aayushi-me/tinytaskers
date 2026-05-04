/**
 * LoginPopup.tsx
 *
 * A popup component for user login.
 * Includes fields for email and password, and handles login functionality using an API call.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth-popup.css";
import API from "../../api";

interface LoginPopupProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Handles the login form submission.
   * Sends a login request to the server and stores the authentication token on success.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      navigate("/dashboard"); // Redirect to the dashboard on successful login
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed. Please try again."); // Display error message
    }
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit} className="popup-content">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
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
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPopup;
