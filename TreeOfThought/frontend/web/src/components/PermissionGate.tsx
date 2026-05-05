import React from 'react';
import { authService } from '../services/authService';

interface PermissionGateProps {
  children: React.ReactNode;
  permission: string | string[];
  all?: boolean; // If true, must have ALL permissions. If false, must have ANY one of them.
  fallback?: React.ReactNode;
}

const PermissionGate: React.FC<PermissionGateProps> = ({ 
  children, 
  permission, 
  all = false, 
  fallback = null 
}) => {
  const userClaims = authService.getClaims();
  const permissions = Array.isArray(permission) ? permission : [permission];

  const hasPermission = all 
    ? permissions.every(p => userClaims.includes(p))
    : permissions.some(p => userClaims.includes(p));

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PermissionGate;
