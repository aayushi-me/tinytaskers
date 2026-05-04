/**
 * AuthPage.tsx
 *
 * This component handles user authentication for the application.
 * It provides functionality for both login and registration workflows.
 * Form inputs are dynamically adjusted based on whether the user is logging in or registering.
 */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../store/userSlice";
import "../styles/auth-popup.css";
import { AppDispatch } from '../store/store';

const AuthPage: React.FC = () => {
  // State to toggle between login and register views
  const [isRegister, setIsRegister] = useState(false);

  // Form state to capture user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    dob: "",
  });

  // State to manage error messages
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>(); // Use the correctly typed dispatch

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state before submission

    if (isRegister) {
      dispatch(registerUser({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        dob: formData.dob,
      }));
    } else {
      dispatch(loginUser({
        email: formData.email,
        password: formData.password,
      }));
    }
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit} className="popup-content">
        {/* Dynamic title based on authentication mode */}
        <h2>{isRegister ? "Register" : "Login"}</h2>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        {/* Additional inputs for registration */}
        {isRegister && (
          <>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="login-btn">
          {isRegister ? "Register" : "Login"}
        </button>

        {/* Toggle Authentication Mode */}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="toggle-auth"
        >
          {isRegister ? "Already have an account? Login" : "New user? Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
