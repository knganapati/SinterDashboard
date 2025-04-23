import React from 'react';
import { Zap } from 'lucide-react';
import Card from '../common/Card';
import { useDashboard } from '../../contexts/DashboardContext';

const RecommendationsCard: React.FC = () => {
  const { recommendations } = useDashboard();
  
  return (
    <Card title="Knowledge-Based Recommendations" icon={<Zap size={20} />} className="col-span-2">
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex justify-between items-center">
              <div className="font-medium text-blue-800">{rec.parameter}</div>
              <div className="text-sm">
                <span className="text-gray-600">Current: </span>
                <span className="font-medium">{rec.current}</span>
                <span className="mx-2">→</span>
                <span className="text-gray-600">Recommended: </span>
                <span className="font-medium text-green-700">{rec.recommended}</span>
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-600">{rec.impact}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecommendationsCard;