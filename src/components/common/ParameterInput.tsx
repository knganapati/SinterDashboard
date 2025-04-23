import React from 'react';

interface ParameterInputProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
}

const ParameterInput: React.FC<ParameterInputProps> = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step 
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600 flex justify-between">
        <span>{label}</span>
        <span className="text-blue-600 font-medium">{value}</span>
      </label>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default ParameterInput;