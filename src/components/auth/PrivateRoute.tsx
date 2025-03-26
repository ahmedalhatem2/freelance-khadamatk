import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthProvider";

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles = ["client", "provider", "admin"],
}) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (!allowedRoles.includes(userRole)) {
    // Redirect to home page if user doesn't have the required role
    return <Navigate to="/" replace />;
  }

  // Render child routes if authenticated and authorized
  return <Outlet />;
};

export default PrivateRoute;
