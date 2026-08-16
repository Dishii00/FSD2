import React, { createContext, useContext, useState, useCallback } from 'react';
import { PRESET_PERSONAS, ROLE_PERMISSIONS_MAP, PERMISSIONS, ROLES } from '../config/rbacConfig';

const RBACContext = createContext(null);

export function RBACProvider({ children }) {
  const [activeUser, setActiveUser] = useState(PRESET_PERSONAS[0]); // Default: Admin
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'editor' | 'admin' | 'unauthorized'
  const [unauthorizedAttempt, setUnauthorizedAttempt] = useState(null);
  const [accessLogs, setAccessLogs] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('exp1_3_2_theme') || 'dark');

  // Permission evaluation helpers
  const userPermissions = ROLE_PERMISSIONS_MAP[activeUser.role] || [];

  const hasPermission = useCallback(
    (permission) => userPermissions.includes(permission),
    [userPermissions]
  );

  const hasRole = useCallback(
    (role) => activeUser.role === role,
    [activeUser]
  );

  // Protected Route Navigation Guard
  const navigate = useCallback((targetTab) => {
    const timestamp = new Date().toLocaleTimeString();

    let requiredPermission = null;
    let requiredRole = null;

    if (targetTab === 'editor') {
      requiredPermission = PERMISSIONS.STUDIO_ACCESS;
    } else if (targetTab === 'admin') {
      requiredPermission = PERMISSIONS.ADMIN_ACCESS;
      requiredRole = ROLES.ADMIN;
    }

    // Evaluate Guard
    if (requiredPermission && !userPermissions.includes(requiredPermission)) {
      // Access Denied! Record log & redirect to Unauthorized Page
      const logEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        user: activeUser.name,
        role: activeUser.role,
        target: targetTab,
        status: 'BLOCKED (403 Forbidden)',
        reason: `Missing required permission: "${requiredPermission}"`,
        timestamp,
      };

      setAccessLogs((prev) => [logEntry, ...prev]);
      setUnauthorizedAttempt({
        targetTab,
        requiredPermission,
        requiredRole,
        userRole: activeUser.role,
      });
      setActiveTab('unauthorized');
      return false;
    }

    // Access Allowed! Record log & navigate
    const logEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      user: activeUser.name,
      role: activeUser.role,
      target: targetTab,
      status: 'ALLOWED (200 OK)',
      reason: 'Authorized role and permission claims validated',
      timestamp,
    };

    setAccessLogs((prev) => [logEntry, ...prev]);
    setActiveTab(targetTab);
    return true;
  }, [activeUser, userPermissions]);

  // Persona Switcher
  const switchPersona = (personaId) => {
    const persona = PRESET_PERSONAS.find((p) => p.id === personaId);
    if (persona) {
      setActiveUser(persona);
      // Reset navigation to dashboard on persona switch
      setActiveTab('dashboard');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('exp1_3_2_theme', nextTheme);
  };

  const value = {
    activeUser,
    userPermissions,
    activeTab,
    unauthorizedAttempt,
    accessLogs,
    theme,
    hasPermission,
    hasRole,
    navigate,
    switchPersona,
    toggleTheme,
  };

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) throw new Error('useRBAC must be used within RBACProvider');
  return context;
}
