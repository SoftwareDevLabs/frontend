import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Welcome to SDLC Core
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              A comprehensive software development lifecycle management platform with role-based authentication.
            </p>
            <div className="mt-8">
              <a
                href="#/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Get Started Sign In
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Key Features
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need for modern software development lifecycle management
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Role-Based Access */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">Role-Based Access</h3>
              <p className="mt-2 text-gray-600 text-center">
                Secure authentication system with granular role-based permissions.
              </p>
            </div>

            {/* LLM Integration */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">LLM Integration</h3>
              <p className="mt-2 text-gray-600 text-center">
                Advanced AI capabilities with multiple LLM provider support.
              </p>
            </div>

            {/* Analytics & Monitoring */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">Analytics & Monitoring</h3>
              <p className="mt-2 text-gray-600 text-center">
                Comprehensive analytics and monitoring for development workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role-Based Access Details */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Role-Based Access</h2>
            <p className="text-gray-600 mb-6">
              Secure authentication system with granular role-based permissions.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-red-600 font-semibold">A</span>
                </div>
                <h3 className="font-semibold text-gray-900">Admin</h3>
                <p className="text-sm text-gray-600">Full system access</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-semibold">D</span>
                </div>
                <h3 className="font-semibold text-gray-900">Developer</h3>
                <p className="text-sm text-gray-600">Code deployment</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-green-600 font-semibold">A</span>
                </div>
                <h3 className="font-semibold text-gray-900">Analyst</h3>
                <p className="text-sm text-gray-600">Data analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-yellow-600 font-semibold">M</span>
                </div>
                <h3 className="font-semibold text-gray-900">Moderator</h3>
                <p className="text-sm text-gray-600">Content management</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-gray-600 font-semibold">U</span>
                </div>
                <h3 className="font-semibold text-gray-900">User</h3>
                <p className="text-sm text-gray-600">Basic access</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LLM Integration Details */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">LLM Integration</h2>
            <p className="text-gray-600 mb-6">
              Advanced AI capabilities with multiple LLM provider support.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold text-gray-900">OpenAI GPT</h3>
                <p className="text-sm text-gray-600">Industry-leading language models</p>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold text-gray-900">Anthropic Claude</h3>
                <p className="text-sm text-gray-600">Safe and helpful AI assistant</p>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold text-gray-900">Custom Models</h3>
                <p className="text-sm text-gray-600">Support for specialized models</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Monitoring Details */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics & Monitoring</h2>
            <p className="text-gray-600">
              Comprehensive analytics and monitoring for development workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};