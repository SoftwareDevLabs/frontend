import React from 'react';

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
  const currentHash = window.location.hash.slice(1) || '/';
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">SLM/LLM Frontend</h1>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem href="#/" isActive={currentHash === '/'}>
                Dashboard
              </NavItem>
              <NavItem href="#/settings" isActive={currentHash === '/settings'}>
                Settings
              </NavItem>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};