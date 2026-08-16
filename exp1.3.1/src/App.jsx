import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import JWTInspector from './components/JWTInspector';

function MainAppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Header />

      {/* Main View: Login if Unauthenticated, Dashboard if Authenticated */}
      {isAuthenticated ? <Dashboard /> : <LoginForm />}

      {/* Visual JWT Inspector Drawer */}
      <JWTInspector />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
