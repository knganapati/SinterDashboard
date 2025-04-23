import React, { useState } from 'react';
import { DashboardProvider } from '../contexts/DashboardContext';
import Header from './Header';
import TabBar from './TabBar';
import DashboardTab from './tabs/DashboardTab';
import PredictionsTab from './tabs/PredictionsTab';
import AnalysisTab from './tabs/AnalysisTab';
import KnowledgeTab from './tabs/KnowledgeTab';
import DataTab from './tabs/DataTab';
import ImagingTab from './tabs/ImagingTab';
import AddKnowledgeModal from './modals/AddKnowledgeModal';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddKnowledgeModal, setShowAddKnowledgeModal] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'predictions':
        return <PredictionsTab />;
      case 'analysis':
        return <AnalysisTab />;
      case 'knowledge':
        return <KnowledgeTab onAddKnowledge={() => setShowAddKnowledgeModal(true)} />;
      case 'data':
        return <DataTab />;
      case 'imaging':
        return <ImagingTab />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1">
          {renderContent()}
        </div>
        {showAddKnowledgeModal && (
          <AddKnowledgeModal 
            onClose={() => setShowAddKnowledgeModal(false)}
          />
        )}
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;