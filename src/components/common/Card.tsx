import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, icon, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg flex items-center">
          {icon && <span className="mr-2 text-blue-600">{icon}</span>}
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
};

export default Card;