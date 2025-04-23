import React from 'react';
import { Activity } from 'lucide-react';
import ParametersCard from '../cards/ParametersCard';
import RAGInsightsCard from '../cards/RAGInsightsCard';
import Card from '../common/Card';
import { useDashboard } from '../../contexts/DashboardContext';

const PredictionsTab: React.FC = () => {
  const { performance, modelConfidence } = useDashboard();
  
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <ParametersCard />
      <div className="col-span-2">
        <Card title="Model Performance" icon={<Activity size={20} />}>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(performance).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="text-xs text-gray-500 uppercase">{key.replace('_', ' ')}</div>
                <div className="text-lg font-semibold">{value}%</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Model Confidence</h3>
            <div className="space-y-2">
              {Object.entries(modelConfidence).map(([model, confidence]) => (
                <div key={model} className="flex items-center">
                  <div className="w-24 text-xs text-gray-600 capitalize">{model}</div>
                  <div className="flex-1 mx-2">
                    <div className="h-4 bg-gray-100 rounded overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-xs font-medium">{(confidence * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <div className="mt-4">
          <RAGInsightsCard />
        </div>
      </div>
    </div>
  );
};

export default PredictionsTab;