import React from 'react';
import { Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { useDashboard } from '../../contexts/DashboardContext';
import { COLORS } from '../../utils/chartColors';

const HistoryTrendCard: React.FC = () => {
  const { historyData } = useDashboard();
  
  return (
    <Card title="Historical Trends" icon={<Activity size={20} />} className="col-span-2">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={historyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis yAxisId="left" orientation="left" stroke={COLORS.ri} />
            <YAxis yAxisId="right" orientation="right" stroke={COLORS.rdi} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="ri" name="RI (%)" stroke={COLORS.ri} activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="rdi" name="RDI (%)" stroke={COLORS.rdi} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HistoryTrendCard;