import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const claims = authService.getClaims();
    setPermissions(claims);
  }, []);

  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  const hasAnyPermission = (requiredPermissions: string[]) => {
    return requiredPermissions.some(p => permissions.includes(p));
  };

  return { permissions, hasPermission, hasAnyPermission };
};
