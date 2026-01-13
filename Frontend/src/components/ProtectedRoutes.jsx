// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contextAPI/AuthContext';

const ProtectedRoutes = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  // No user → redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  // Admin only route but not admin → redirect to home
    // Admin only route
  if (adminOnly) {
    if (isAdmin) {
      return children; 
    } else if (user) {
      // 👈 FIXED: Logged user but not admin → my-profile
      return <Navigate to="/my-profile" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

// 👈 THIS IS REQUIRED - Default Export
export default ProtectedRoutes;
