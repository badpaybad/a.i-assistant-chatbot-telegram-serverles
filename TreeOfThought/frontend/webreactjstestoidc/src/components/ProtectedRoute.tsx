import React, { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    // If not authenticated and not loading, show alert
    if (!auth.isLoading && !auth.isAuthenticated) {
      alert('Bạn chưa login!');
    }
  }, [auth.isLoading, auth.isAuthenticated]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
