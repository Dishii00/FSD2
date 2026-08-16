import React from 'react';
import { useRBAC } from '../context/RBACContext';

export default function PermissionGuard({ 
  requirePermission, 
  requireRole, 
  children, 
  fallback = null 
}) {
  const { hasPermission, hasRole } = useRBAC();

  const isPermitted = requirePermission ? hasPermission(requirePermission) : true;
  const isRoleValid = requireRole ? hasRole(requireRole) : true;

  if (isPermitted && isRoleValid) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}
