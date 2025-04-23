import React from 'react';
import { Menu, Settings, HelpCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md px-6 py-4 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Menu className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            GestureFlow
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <HelpCircle className="h-5 w-5" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-xs text-white font-medium">JS</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;