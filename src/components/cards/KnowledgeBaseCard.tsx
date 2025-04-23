import React from 'react';
import { BookOpen, Search, FilePlus, PieChart, TrendingUp } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Card from '../common/Card';
import { useDashboard } from '../../contexts/DashboardContext';

interface KnowledgeBaseCardProps {
  onAddKnowledge: () => void;
}

const KnowledgeBaseCard: React.FC<KnowledgeBaseCardProps> = ({ onAddKnowledge }) => {
  const { 
    knowledgeEntries, 
    searchQuery, 
    setSearchQuery, 
    relevantEntries
  } = useDashboard();
  
  return (
    <div className="col-span-3 space-y-4">
      <Card title="Knowledge Base" icon={<BookOpen size={20} />}>
        <div className="flex mb-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search knowledge base..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <button 
            onClick={onAddKnowledge}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center space-x-2"
          >
            <FilePlus size={18} />
            <span>Add Knowledge</span>
          </button>
        </div>
        
        {searchQuery ? (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Search Results</h3>
            {relevantEntries.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {relevantEntries.map(entry => (
                  <div key={entry.id} className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-indigo-800">{entry.metadata.topic || 'Knowledge Entry'}</div>
                      <div className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                        {(entry.similarity * 100).toFixed(0)}% relevance
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{entry.text}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Source: {entry.metadata.source}</span>
                      <span className="text-xs text-gray-500">Confidence: {(entry.metadata.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <BookOpen size={36} />
                <p className="mt-2">No matching knowledge entries found</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Recent Knowledge Entries</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {knowledgeEntries.slice(0, 5).map(entry => (
                <div key={entry.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-gray-800">{entry.metadata?.topic || 'Knowledge Entry'}</div>
                    <div className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                      {entry.metadata?.source}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{entry.text.substring(0, 150)}...</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Confidence: {(entry.metadata?.confidence ? entry.metadata.confidence * 100 : 0).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Card title="Knowledge Distribution" icon={<PieChart size={20} />}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={[
                    { name: 'Metallurgical Literature', value: 35 },
                    { name: 'Plant Case Studies', value: 25 },
                    { name: 'Research Papers', value: 20 },
                    { name: 'Expert Knowledge', value: 15 },
                    { name: 'Process Data', value: 5 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#22c55e" />
                  <Cell fill="#eab308" />
                  <Cell fill="#a855f7" />
                  <Cell fill="#ec4899" />
                </Pie>
                <RechartsTooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Knowledge Impact" icon={<TrendingUp size={20} />}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { parameter: 'Basicity', impact: 85 },
                  { parameter: 'MgO Content', impact: 75 },
                  { parameter: 'Temperature', impact: 70 },
                  { parameter: 'Al2O3 Content', impact: 65 },
                  { parameter: 'Fuel Rate', impact: 55 }
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="parameter" type="category" width={100} />
                <RechartsTooltip />
                <Bar dataKey="impact" name="Knowledge Influence" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBaseCard;