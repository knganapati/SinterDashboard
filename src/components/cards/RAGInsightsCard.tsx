import React from 'react';
import { BookOpen } from 'lucide-react';
import Card from '../common/Card';
import { useDashboard } from '../../contexts/DashboardContext';

const RAGInsightsCard: React.FC = () => {
  const { ragInsights, predictionData } = useDashboard();
  
  return (
    <Card title="Knowledge-Enhanced Insights" icon={<BookOpen size={20} />} className="col-span-2">
      {ragInsights ? (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex justify-between items-center">
              <h3 className="text-indigo-800 font-medium">RAG Enhancement</h3>
              <div className="text-sm text-indigo-600">Confidence: {Math.round(predictionData?.confidence ? predictionData.confidence * 100 : 0)}%</div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Base ML Prediction</div>
                <div className="flex justify-between text-sm">
                  <div>RI: <span className="font-medium">{ragInsights.base_prediction.ri}%</span></div>
                  <div>RDI: <span className="font-medium">{ragInsights.base_prediction.rdi}%</span></div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500 mb-1">Knowledge Adjustments</div>
                <div className="flex justify-between text-sm">
                  <div>RI: <span className={`font-medium ${parseFloat(ragInsights.adjustments.ri) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(ragInsights.adjustments.ri) >= 0 ? '+' : ''}{ragInsights.adjustments.ri}%
                  </span></div>
                  <div>RDI: <span className={`font-medium ${parseFloat(ragInsights.adjustments.rdi) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(ragInsights.adjustments.rdi) >= 0 ? '+' : ''}{ragInsights.adjustments.rdi}%
                  </span></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Knowledge Sources</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {ragInsights.relevant_knowledge.map((knowledge, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-gray-800 capitalize">{knowledge.parameter.replace('_', ' ')}</div>
                    <div className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                      {knowledge.source}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{knowledge.excerpt}</p>
                  <div className="mt-1 text-xs text-gray-500">Confidence: {(knowledge.confidence * 100).toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Knowledge-Based Explanation</h3>
            <p className="text-sm text-gray-700">
              The predicted values have been enhanced using metallurgical domain knowledge. 
              {parseFloat(ragInsights.adjustments.ri) !== 0 && 
                ` RI was ${parseFloat(ragInsights.adjustments.ri) > 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(ragInsights.adjustments.ri))}% based on parameter optimization insights.`}
              {parseFloat(ragInsights.adjustments.rdi) !== 0 && 
                ` RDI was ${parseFloat(ragInsights.adjustments.rdi) > 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(ragInsights.adjustments.rdi))}% based on historical case studies and metallurgical principles.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <BookOpen size={48} />
          <p className="mt-4 text-center">No knowledge insights yet. <br/>Run a prediction to see RAG-enhanced results.</p>
        </div>
      )}
    </Card>
  );
};

export default RAGInsightsCard;