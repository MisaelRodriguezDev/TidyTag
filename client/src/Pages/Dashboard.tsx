import React from "react";
import StatsCard from "../components/ui/StatsCard";
import RecentProducts from "../components/ui/RecentProducts";
import LowInventoryAlerts from "../components/ui/LowInventoryAlerts";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Sección de estadísticas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard title="Total de Productos" value="1,284" />
          <StatsCard title="Valor Total" value="$86,420" />
          <StatsCard title="Categorías" value="12" />
          <StatsCard title="Bajo Inventario" value="3" />
        </section>

        {/* Sección de contenido principal */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentProducts />
          <LowInventoryAlerts />
        </section>
    </div>
  );
};

export default Dashboard;
