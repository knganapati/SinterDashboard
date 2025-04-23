import React from 'react';
import { Settings, Zap, RefreshCw } from 'lucide-react';
import Card from '../common/Card';
import ParameterInput from '../common/ParameterInput';
import { useDashboard } from '../../contexts/DashboardContext';

const ParametersCard: React.FC = () => {
  const { parameters, handleParameterChange, simulatePrediction, loading } = useDashboard();
  
  return (
    <Card title="Input Parameters" icon={<Settings size={20} />} className="col-span-1">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <ParameterInput 
            label="Basicity (CaO/SiO₂)" 
            value={parameters.basicity} 
            onChange={(e) => handleParameterChange('basicity', e.target.value)}
            min={1.0}
            max={3.0}
            step={0.1}
          />
          <ParameterInput 
            label="MgO Content (%)" 
            value={parameters.mg_content} 
            onChange={(e) => handleParameterChange('mg_content', e.target.value)}
            min={2.0}
            max={6.0}
            step={0.1}
          />
          <ParameterInput 
            label="Al₂O₃ Content (%)" 
            value={parameters.al_content} 
            onChange={(e) => handleParameterChange('al_content', e.target.value)}
            min={0.5}
            max={3.0}
            step={0.1}
          />
          <ParameterInput 
            label="SiO₂ Content (%)" 
            value={parameters.silica} 
            onChange={(e) => handleParameterChange('silica', e.target.value)}
            min={3.0}
            max={8.0}
            step={0.1}
          />
          <ParameterInput 
            label="Temperature (°C)" 
            value={parameters.temperature} 
            onChange={(e) => handleParameterChange('temperature', e.target.value)}
            min={1100}
            max={1350}
            step={10}
          />
          <ParameterInput 
            label="Bed Height (mm)" 
            value={parameters.bed_height} 
            onChange={(e) => handleParameterChange('bed_height', e.target.value)}
            min={400}
            max={700}
            step={10}
          />
          <ParameterInput 
            label="Fuel Rate (kg/m²)" 
            value={parameters.fuel_rate} 
            onChange={(e) => handleParameterChange('fuel_rate', e.target.value)}
            min={30}
            max={60}
            step={1}
          />
          <ParameterInput 
            label="Moisture (%)" 
            value={parameters.moisture} 
            onChange={(e) => handleParameterChange('moisture', e.target.value)}
            min={5}
            max={9}
            step={0.1}
          />
        </div>
        <div className="flex justify-center pt-2">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2"
            onClick={simulatePrediction}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span>Predicting...</span>
              </>
            ) : (
              <>
                <Zap size={20} />
                <span>Predict RI/RDI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ParametersCard;