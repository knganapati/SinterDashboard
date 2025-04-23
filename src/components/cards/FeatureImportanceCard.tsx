import React from 'react';
import { BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { useDashboard } from '../../contexts/DashboardContext';
import { COLORS } from '../../utils/chartColors';

const FeatureImportanceCard: React.FC = () => {
  const { featureImportance } = useDashboard();
  
  return (
    <Card title="Feature Importance" icon={<BarChart2 size={20} />} className="col-span-2">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={featureImportance}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ri_impact" name="Impact on RI" fill={COLORS.ri} />
            <Bar dataKey="rdi_impact" name="Impact on RDI" fill={COLORS.rdi} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default FeatureImportanceCard;