import React from 'react';
import { Activity, HelpCircle, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="flex items-center space-x-2">
        <Activity size={24} />
        <h1 className="text-xl font-bold">Sinter Plant RI/RDI Prediction System</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-3 py-1 rounded bg-blue-800 hover:bg-blue-950 flex items-center space-x-1">
          <HelpCircle size={16} />
          <span>Help</span>
        </button>
        <button className="px-3 py-1 rounded bg-blue-800 hover:bg-blue-950 flex items-center space-x-1">
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Header;