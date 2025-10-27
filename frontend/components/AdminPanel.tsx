import React from 'react';
import { RequireAdmin } from './AuthGuards';

// Mock data for admin panel
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@sdlccore.com',
    status: 'Active',
    roles: ['admin'],
    created: '08/15/2025'
  },
  {
    id: 2,
    username: 'developer1',
    email: 'dev@sdlccore.com',
    status: 'Active',
    roles: ['developer'],
    created: '08/16/2025'
  },
  {
    id: 3,
    username: 'analyst1',
    email: 'analyst@sdlccore.com',
    status: 'Active',
    roles: ['analyst'],
    created: '08/17/2025'
  }
];

const mockRoles = [
  {
    id: 1,
    name: 'admin',
    description: 'Full system administrator access'
  },
  {
    id: 2,
    name: 'user',
    description: 'Standard user access'
  },
  {
    id: 3,
    name: 'moderator',
    description: 'Content moderation access'
  },
  {
    id: 4,
    name: 'analyst',
    description: 'Analytics and reporting access'
  },
  {
    id: 5,
    name: 'developer',
    description: 'Development and deployment access'
  }
];

export const AdminPanel: React.FC = () => {
  return (
    <RequireAdmin fallback={
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-lg font-medium mb-2">Access Denied</div>
          <div className="text-red-600">You need administrator privileges to access this panel.</div>
        </div>
      </div>
    }>
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage users and roles in the system.</p>
        </div>

        {/* Users Management */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Users Management</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role, index) => (
                          <span 
                            key={index}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.created}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Roles Management */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Roles</h2>
          </div>
          
          <div className="px-6 py-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockRoles.map((role) => (
                <div key={role.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${
                      role.name === 'admin' ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {role.name}
                    </h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      role.name === 'admin' 
                        ? 'bg-red-100 text-red-800'
                        : role.name === 'developer'
                        ? 'bg-blue-100 text-blue-800'
                        : role.name === 'analyst'
                        ? 'bg-green-100 text-green-800'
                        : role.name === 'moderator'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {role.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {role.description}
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-xs text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button className="text-xs text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RequireAdmin>
  );
};