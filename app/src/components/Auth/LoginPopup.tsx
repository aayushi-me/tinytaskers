/**
 * LoginPopup.tsx
 *
 * A popup component for user login.
 * Handles authentication, saves the token in localStorage, and navigates users based on their role.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth-popup.css";
import API from "../../api";
import { getRoleFromToken } from "../../services/jwt-decode-util";

interface LoginPopupProps {
  onClose: () => void; // Callback to close the popup
  onSwitchToRegister: () => void; // Callback to switch to the registration popup
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Handles form submission for user login.
   * Sends login credentials to the server and navigates the user based on their role.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Decode token to determine user role
      const role = getRoleFromToken();

      if (role === "JobSeeker") {
        navigate("/dashboard");
      } else if (role === "JobPoster") {
        navigate("/PosterDashboard");
      } else {
        console.log("Invalid role detected. Please contact support.");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
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
        <p className="register-link">
          New user?{" "}
          <button onClick={onSwitchToRegister} className="register-btn">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
