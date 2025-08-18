import React from 'react';
import { BackendSelector } from '../features/settings/BackendSelector';

export const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="mt-2 text-gray-600">
                Configure your application preferences and backend infrastructure.
              </p>
            </div>
            
            <BackendSelector />
          </div>
        </div>
      </div>
    </div>
  );
};