import React from 'react';
import { TrendingUp, AlertCircle, Save } from 'lucide-react';
import Card from '../common/Card';
import { useDashboard } from '../../contexts/DashboardContext';

const PredictionResultCard: React.FC = () => {
  const { predictionData } = useDashboard();
  
  return (
    <Card title="Prediction Results" icon={<TrendingUp size={20} />} className="col-span-1">
      {predictionData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex flex-col items-center">
              <div className="text-xs uppercase font-semibold text-blue-700 mb-1">Reduction Index (RI)</div>
              <div className="text-3xl font-bold text-blue-600">{predictionData.ri}%</div>
              <div className="text-xs text-blue-600 mt-1">
                Confidence: {(predictionData.confidence * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-100 flex flex-col items-center">
              <div className="text-xs uppercase font-semibold text-red-700 mb-1">Reduction-Degradation Index (RDI)</div>
              <div className="text-3xl font-bold text-red-600">{predictionData.rdi}%</div>
              <div className="text-xs text-red-600 mt-1">
                Confidence: {(predictionData.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Model Contributions</h3>
            <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
              {Object.entries(predictionData.modelContributions).map(([model, contribution], index) => {
                const colors = ['bg-blue-600', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
                const width = contribution * 100;
                return (
                  <div 
                    key={model}
                    style={{ width: `${width}%` }}
                    className={`h-full float-left ${model === 'rag' ? 'bg-indigo-500' : colors[index % colors.length]}`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center mt-2">
              {Object.entries(predictionData.modelContributions).map(([model, contribution], index) => {
                const colors = ['text-blue-600', 'text-green-500', 'text-yellow-500', 'text-purple-500', 'text-pink-500', 'text-indigo-500'];
                const color = model === 'rag' ? 'text-indigo-500' : colors[index % colors.length];
                return (
                  <div key={model} className="flex items-center mx-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${color.replace('text-', 'bg-')} mr-1`}></div>
                    <span className="capitalize">{model === 'rag' ? 'RAG' : model}</span>
                    <span className="ml-1 text-gray-600">({(contribution * 100).toFixed(0)}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Parameter Impact on RI</h3>
            <div className="space-y-2">
              {predictionData.parameterImpact.map((param, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-28 text-xs text-gray-600">{param.name}</div>
                  <div className="flex-1 mx-2">
                    <div className="h-4 bg-gray-100 rounded overflow-hidden">
                      <div 
                        className={param.impact >= 0 ? "h-full bg-blue-500" : "h-full bg-red-500"}
                        style={{ width: `${Math.abs(param.impact) * 2}%`, marginLeft: param.impact < 0 ? 'auto' : '0' }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-xs font-medium">
                    {param.impact >= 0 ? `+${param.impact.toFixed(1)}` : param.impact.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full mt-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-1 rounded border border-blue-200 text-sm flex items-center justify-center space-x-1">
            <Save size={16} />
            <span>Save Results</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <AlertCircle size={48} />
          <p className="mt-4 text-center">No prediction results yet. <br/>Set parameters and click "Predict RI/RDI"</p>
        </div>
      )}
    </Card>
  );
};

export default PredictionResultCard;