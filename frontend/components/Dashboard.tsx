import React from 'react';
import { useAuth } from '../stores/authStore';
import { Role } from '../types/auth';

const RoleBadge: React.FC<{ role: Role }> = ({ role }) => {
  const getColorClass = (roleName: string) => {
    switch (roleName) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'developer':
        return 'bg-blue-100 text-blue-800';
      case 'analyst':
        return 'bg-green-100 text-green-800';
      case 'moderator':
        return 'bg-yellow-100 text-yellow-800';
      case 'user':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorClass(role.name)}`}>
      {role.name}
    </span>
  );
};

export const Dashboard: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleRefreshProfile = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-green-600 text-sm font-medium">Logged in successfully! 👋</span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your personal dashboard, {user.username}!</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        </div>
        
        <div className="px-6 py-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Username:</dt>
              <dd className="text-sm text-gray-900">{user.username}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Email:</dt>
              <dd className="text-sm text-gray-900">{user.email}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Account Status:</dt>
              <dd className="text-sm text-gray-900">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Member Since:</dt>
              <dd className="text-sm text-gray-900">{user.memberSince}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Login:</dt>
              <dd className="text-sm text-gray-900">{user.lastLogin}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Roles:</dt>
              <dd className="text-sm text-gray-900">
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <RoleBadge key={role.id} role={role} />
                  ))}
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        
        <div className="px-6 py-4">
          <div className="flex flex-wrap gap-4">
            <a
              href="#/admin"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Admin Panel
            </a>
            
            <button
              onClick={handleRefreshProfile}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Refreshing...' : 'Refresh Profile'}
            </button>
            
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">System Info</h2>
        </div>
        
        <div className="px-6 py-4">
          <div className="text-sm text-gray-600">
            <div>SDLC Core Frontend Infrastructure</div>
            <div>Role-based Authentication System</div>
          </div>
        </div>
      </div>
    </div>
  );
};