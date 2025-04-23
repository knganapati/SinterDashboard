import React from 'react';
import { Camera, Thermometer } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const ImagingTab: React.FC = () => {
  return (
    <div className="p-4">
      <Card title="Microstructure Analysis" icon={<Camera size={20} />}>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <Camera size={48} className="mx-auto mb-2" />
              <p>Microstructure Image Placeholder</p>
              <p className="text-sm mt-2">Upload an image for analysis</p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-medium mb-2">Image Analysis Results</h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-500">Porosity</div>
                <div className="text-lg font-medium">23.4%</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-500">Phase Distribution</div>
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie data={[
                        { name: 'Phase A', value: 45 },
                        { name: 'Phase B', value: 30 },
                        { name: 'Phase C', value: 25 }
                      ]} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={30} 
                        fill="#8884d8"
                      >
                        <Cell fill="#1e40af" />
                        <Cell fill="#4f46e5" />
                        <Cell fill="#818cf8" />
                      </Pie>
                      <RechartsTooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="text-sm text-gray-500">Estimated RI/RDI Impact</div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="text-center">
                    <div className="text-xs text-gray-400">RI</div>
                    <div className="text-blue-600 font-medium">+2.1%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">RDI</div>
                    <div className="text-red-600 font-medium">-1.5%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Thermal Imaging</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-48">
              <div className="text-center text-gray-500">
                <Thermometer size={48} className="mx-auto mb-2" />
                <p>Thermal Image Placeholder</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-medium mb-2">Thermal Analysis</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Maximum Temperature:</span>
                  <span className="font-medium">1284°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Average Temperature:</span>
                  <span className="font-medium">1132°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Temperature Std Dev:</span>
                  <span className="font-medium">86°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Hotspots Detected:</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImagingTab;