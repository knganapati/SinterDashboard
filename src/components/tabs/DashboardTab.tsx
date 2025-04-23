import React from 'react';
import ParametersCard from '../cards/ParametersCard';
import PredictionResultCard from '../cards/PredictionResultCard';
import RAGInsightsCard from '../cards/RAGInsightsCard';
import HistoryTrendCard from '../cards/HistoryTrendCard';
import RecommendationsCard from '../cards/RecommendationsCard';
import FeatureImportanceCard from '../cards/FeatureImportanceCard';

const DashboardTab: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <ParametersCard />
      <PredictionResultCard />
      <RAGInsightsCard />
      <HistoryTrendCard />
      <RecommendationsCard />
      <FeatureImportanceCard />
    </div>
  );
};

export default DashboardTab;