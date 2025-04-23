import React from 'react';
import { Activity, TrendingUp, BarChart2, BookOpen, Database, Camera } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200 bg-white overflow-x-auto">
      <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<Activity size={18} />} label="Dashboard" />
      <TabButton active={activeTab === 'predictions'} onClick={() => setActiveTab('predictions')} icon={<TrendingUp size={18} />} label="Predictions" />
      <TabButton active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} icon={<BarChart2 size={18} />} label="Analysis" />
      <TabButton active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={<BookOpen size={18} />} label="Knowledge Base" />
      <TabButton active={activeTab === 'data'} onClick={() => setActiveTab('data')} icon={<Database size={18} />} label="Data Management" />
      <TabButton active={activeTab === 'imaging'} onClick={() => setActiveTab('imaging')} icon={<Camera size={18} />} label="Imaging" />
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button 
      className={`px-4 py-3 flex items-center space-x-2 ${active 
        ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default TabBar;