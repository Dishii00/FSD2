import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtAuthService } from '../services/jwtAuthService';

const AuthContext = createContext(null);

const TOKEN_KEY = 'exp1_3_1_jwt_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
  });

  const [storageType, setStorageType] = useState('localStorage'); // 'localStorage' | 'sessionStorage' | 'memory'
  const [decodedUser, setDecodedUser] = useState(null);
  const [decodedHeader, setDecodedHeader] = useState(null);
  const [rawTokenParts, setRawTokenParts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Decode & Verify Token on state change
  const syncAuthState = useCallback((currentToken) => {
    if (!currentToken) {
      setDecodedUser(null);
      setDecodedHeader(null);
      setRawTokenParts(null);
      setError(null);
      return;
    }

    try {
      const decoded = jwtAuthService.verifyAndDecodeToken(currentToken);
      setDecodedUser(decoded.payload);
      setDecodedHeader(decoded.header);
      setRawTokenParts(decoded.parts);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDecodedUser(null);
      setDecodedHeader(null);
      setRawTokenParts(null);
    }
  }, []);

  useEffect(() => {
    syncAuthState(token);
  }, [token, syncAuthState]);

  // Handle Token Persistence Mode Switch
  const updateStorageType = (newType) => {
    setStorageType(newType);
    if (!token) return;

    // Clear previous stores
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);

    if (newType === 'localStorage') {
      localStorage.setItem(TOKEN_KEY, token);
    } else if (newType === 'sessionStorage') {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  };

  // Login Action
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { token: newJwt } = await jwtAuthService.login(email, password);
      setToken(newJwt);

      if (storageType === 'localStorage') {
        localStorage.setItem(TOKEN_KEY, newJwt);
      } else if (storageType === 'sessionStorage') {
        sessionStorage.setItem(TOKEN_KEY, newJwt);
      }

      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  // Logout Action
  const logout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setDecodedUser(null);
    setDecodedHeader(null);
    setRawTokenParts(null);
    setError(null);
  };

  // Security Test Tool: Force Token Expiry
  const forceExpireToken = () => {
    if (!token || !decodedUser) return;
    const expiredUser = { ...decodedUser };
    const expiredToken = jwtAuthService.createJWT(expiredUser, -10); // 10 seconds in the past
    setToken(expiredToken);
    if (storageType === 'localStorage') localStorage.setItem(TOKEN_KEY, expiredToken);
  };

  // Security Test Tool: Corrupt Token Signature
  const corruptToken = () => {
    if (!token) return;
    const corrupted = token + '_corrupted_hash';
    setToken(corrupted);
  };

  const value = {
    token,
    decodedUser,
    decodedHeader,
    rawTokenParts,
    isAuthenticated: !!decodedUser,
    error,
    loading,
    storageType,
    isInspectorOpen,
    setIsInspectorOpen,
    login,
    logout,
    updateStorageType,
    forceExpireToken,
    corruptToken,
    syncAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
