/**
 * ProtectedRoute.tsx
 *
 * A higher-order component for route protection.
 * Checks for the presence of an authentication token in localStorage.
 * Redirects unauthenticated users to the landing page.
 */

import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode; // Components to render if the route is protected
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if the user is authenticated

  if (!token) {
    // Redirect unauthenticated users to the landing page
    return <Navigate to="/" replace />;
  }

  // Render the children if the user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
