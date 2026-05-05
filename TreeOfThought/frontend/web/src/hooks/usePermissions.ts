import { useMemo } from 'react';
import { authService } from '../services/authService';

export const usePermissions = () => {
  const claims = useMemo(() => authService.getClaims(), []);

  const hasPermission = (permission: string | string[], all = false) => {
    const permissions = Array.isArray(permission) ? permission : [permission];
    return all 
      ? permissions.every(p => claims.includes(p))
      : permissions.some(p => claims.includes(p));
  };

  return { claims, hasPermission };
};
