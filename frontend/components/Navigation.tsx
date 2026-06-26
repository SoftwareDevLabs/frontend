import React, { useState } from 'react';
import { useAuth } from '../stores/authStore';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, isActive = false }) => {
  return (
    <a
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {children}
    </a>
  );
};

export const Navigation: React.FC = () => {
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const currentHash = window.location.hash.slice(1) || '/';

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      window.location.hash = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
                SDLC Core
              </a>
            </div>
            
            {isAuthenticated && (
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem href="#/" isActive={currentHash === '/'}>
                  Home
                </NavItem>
                <NavItem href="#/dashboard" isActive={currentHash === '/dashboard'}>
                  Dashboard
                </NavItem>
                {hasRole('admin') && (
                  <NavItem href="#/admin" isActive={currentHash === '/admin'}>
                    Admin
                  </NavItem>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-sm text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="mr-2">{user.username}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a
                      href="#/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavItem href="#/login">
                  Login
                </NavItem>
                <NavItem href="#/register">
                  Register
                </NavItem>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};