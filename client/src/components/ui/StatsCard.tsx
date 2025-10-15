import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow ${className}`}
    >
      <h3 className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wide text-center">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900 text-center">{value}</p>
    </div>
  );
};

export default StatsCard;
