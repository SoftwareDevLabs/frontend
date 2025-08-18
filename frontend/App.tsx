import React from 'react';
import { SettingsProvider } from './stores/settingsStore';
import { Navigation } from './components/Navigation';
import { SettingsPage } from './pages/SettingsPage';
import { DashboardPage } from './pages/DashboardPage';
import './styles.css';

function App() {
  // Simple routing based on hash
  const currentHash = window.location.hash.slice(1) || '/';
  
  const renderPage = () => {
    switch (currentHash) {
      case '/settings':
        return <SettingsPage />;
      case '/':
      default:
        return <DashboardPage />;
    }
  };

  // Update navigation links to use hash routing
  React.useEffect(() => {
    const handleHashChange = () => {
      // Force re-render when hash changes
      window.location.reload();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        {renderPage()}
      </div>
    </SettingsProvider>
  );
}

export default App;