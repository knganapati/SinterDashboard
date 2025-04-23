import React from 'react';
import { Activity, PieChart, Database } from 'lucide-react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import Card from '../common/Card';
import { useDashboard } from '../../contexts/DashboardContext';
import { COLORS } from '../../utils/chartColors';

const AnalysisTab: React.FC = () => {
  const { historyData, featureImportance } = useDashboard();
  
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card title="RI/RDI Correlation" icon={<Activity size={20} />}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="ri" name="RI" label={{ value: 'RI (%)', position: 'insideBottom', offset: -5 }} />
              <YAxis type="number" dataKey="rdi" name="RDI" label={{ value: 'RDI (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="RI/RDI Values" data={historyData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title="Parameter Relationships" icon={<PieChart size={20} />}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} width={730} height={250} data={featureImportance}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="RI Impact" dataKey="ri_impact" stroke={COLORS.ri} fill={COLORS.ri} fillOpacity={0.6} />
              <Radar name="RDI Impact" dataKey="rdi_impact" stroke={COLORS.rdi} fill={COLORS.rdi} fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title="Historical Data Analysis" icon={<Database size={20} />} className="col-span-2">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RI (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RDI (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basicity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MgO (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.ri}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">{item.rdi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.basicity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mg_content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisTab;