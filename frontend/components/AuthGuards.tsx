import React, { ReactNode } from 'react';
import { useAuth } from '../stores/authStore';
import { UserRole } from '../types/auth';

interface RequireAuthProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  fallback = <div>Please log in to access this content.</div> 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

interface RequireRoleProps {
  children: ReactNode;
  role: UserRole | UserRole[];
  fallback?: ReactNode;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ 
  children, 
  role, 
  fallback = <div className="text-red-600">You don't have permission to access this content.</div> 
}) => {
  const { hasRole, hasAnyRole } = useAuth();

  const hasPermission = Array.isArray(role) 
    ? hasAnyRole(role)
    : hasRole(role);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export const RequireAdmin: React.FC<RequireAuthProps> = ({ children, fallback }) => (
  <RequireRole role="admin" fallback={fallback}>
    {children}
  </RequireRole>
);

export const RequireModerator: React.FC<RequireAuthProps> = ({ children, fallback }) => (
  <RequireRole role={["admin", "moderator"]} fallback={fallback}>
    {children}
  </RequireRole>
);

export const RequireAnalyst: React.FC<RequireAuthProps> = ({ children, fallback }) => (
  <RequireRole role={["admin", "analyst"]} fallback={fallback}>
    {children}
  </RequireRole>
);

export const RequireDeveloper: React.FC<RequireAuthProps> = ({ children, fallback }) => (
  <RequireRole role={["admin", "developer"]} fallback={fallback}>
    {children}
  </RequireRole>
);