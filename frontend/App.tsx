import React, { useState, useEffect } from 'react';
import { SettingsProvider } from './stores/settingsStore';
import { AuthProvider, useAuth } from './stores/authStore';
import { Navigation } from './components/Navigation';
import { SettingsPage } from './pages/SettingsPage';
import { HomePage } from './components/HomePage';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import './styles.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentHash, setCurrentHash] = useState(window.location.hash.slice(1) || '/');
  
  // Handle hash changes without page reload
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1) || '/');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirect to dashboard when authenticated and on login/register pages
  useEffect(() => {
    if (isAuthenticated && (currentHash === '/login' || currentHash === '/register')) {
      window.location.hash = '/dashboard';
    }
  }, [isAuthenticated, currentHash]);
  
  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    // Public routes
    if (currentHash === '/login') {
      return <LoginForm />;
    }
    
    if (currentHash === '/register') {
      return <RegisterForm />;
    }

    // Protected routes
    if (!isAuthenticated) {
      if (currentHash === '/') {
        return <HomePage />;
      }
      // Redirect to login for protected routes
      window.location.hash = '/login';
      return <LoginForm />;
    }

    // Authenticated routes
    switch (currentHash) {
      case '/dashboard':
        return <Dashboard />;
      case '/admin':
        return <AdminPanel />;
      case '/settings':
        return <SettingsPage />;
      case '/':
      default:
        // For authenticated users, default to dashboard
        return <Dashboard />;
    }
  };

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        {renderPage()}
      </div>
    </SettingsProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;