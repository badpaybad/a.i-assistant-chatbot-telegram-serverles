import React from 'react';
import { usePermissions } from '../hooks/usePermissions';

interface PermissionGateProps {
  children: React.ReactNode;
  permissions: string[];
  noAccess?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ 
  children, 
  permissions, 
  noAccess = null 
}) => {
  const { hasAnyPermission } = usePermissions();

  if (hasAnyPermission(permissions)) {
    return <>{children}</>;
  }

  return <>{noAccess}</>;
};
