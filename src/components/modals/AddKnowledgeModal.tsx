import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

interface AddKnowledgeModalProps {
  onClose: () => void;
}

const AddKnowledgeModal: React.FC<AddKnowledgeModalProps> = ({ onClose }) => {
  const { newKnowledgeEntry, setNewKnowledgeEntry, addKnowledgeEntry } = useDashboard();
  
  const handleSave = () => {
    addKnowledgeEntry();
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium text-gray-900">Add Knowledge Entry</h3>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XCircle size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Knowledge Content</label>
              <textarea
                value={newKnowledgeEntry.text}
                onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, text: e.target.value})}
                rows={6}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter detailed knowledge about sinter plant operations, RI/RDI relationships, or parameter effects..."
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <input
                  type="text"
                  value={newKnowledgeEntry.source}
                  onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, source: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Research paper, plant data, expert knowledge..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                <input
                  type="text"
                  value={newKnowledgeEntry.topic}
                  onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, topic: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="E.g., MgO impact, temperature effect..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confidence (0-1)</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={newKnowledgeEntry.confidence}
                onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, confidence: e.target.value})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low confidence (0)</span>
                <span>Current: {newKnowledgeEntry.confidence}</span>
                <span>High confidence (1)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center space-x-2"
              onClick={handleSave}
              disabled={!newKnowledgeEntry.text}
            >
              <CheckCircle size={18} />
              <span>Add Entry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKnowledgeModal;