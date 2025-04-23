import React from 'react';
import { Database, Upload, FilePlus, Download } from 'lucide-react';
import Card from '../common/Card';

const DataTab: React.FC = () => {
  return (
    <div className="p-4">
      <Card title="Data Management" icon={<Database size={20} />}>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1">
              <Upload size={16} />
              <span>Upload Data</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm flex items-center space-x-1">
              <FilePlus size={16} />
              <span>New Dataset</span>
            </button>
          </div>
          <div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm flex items-center space-x-1">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium mb-2">Available Datasets</h3>
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Production Data 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Time Series</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,248</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 16, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Microstructure Images</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Image</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">523</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Thermal Profiles</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Thermal</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">312</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 12, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DataTab;