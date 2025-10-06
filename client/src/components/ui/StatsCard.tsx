import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, className = '' }) => {
  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatsCard;