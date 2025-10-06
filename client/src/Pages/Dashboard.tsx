import React from 'react';
import Header from '../components/ui/Header';
import StatsCard from '../components/ui/StatsCard';
import RecentProducts from '../components/ui/RecentProducts';
import LowInventoryAlerts from '../components/ui/LowInventoryAlerts';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatsCard 
            title="Total de Productos" 
            value="1,284" 
            className="bg-white rounded-lg shadow-sm p-6"
          />
          <StatsCard 
            title="Valor Total" 
            value="$86,420" 
            className="bg-white rounded-lg shadow-sm p-6"
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentProducts />
          <LowInventoryAlerts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;