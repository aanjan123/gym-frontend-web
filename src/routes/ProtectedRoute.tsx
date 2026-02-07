import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'superadmin' | 'owner';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
