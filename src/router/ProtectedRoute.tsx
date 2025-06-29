import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUserRoles } from '../services/authService';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const token = getToken();
  const roles = getUserRoles();
  console.log(allowedRoles)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.some(role => allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 