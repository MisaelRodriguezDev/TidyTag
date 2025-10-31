import React, { useEffect, useState } from "react";
import StatsCard from "../components/ui/StatsCard";
import RecentProducts from "../components/ui/RecentProducts";
import LowInventoryAlerts from "../components/ui/LowInventoryAlerts";
import type { Product } from "../types/Product";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [info, setInfo] = useState<{
    total: number;
    valor: number;
    low: number;
    categories: number;
  }>({
    total: 0,
    valor: 0,
    low: 0,
    categories: 0,
  });

  // Cargar productos desde localStorage
  useEffect(() => {
    const items = localStorage.getItem("products");
    if (items) {
      try {
        const parsed: Product[] = JSON.parse(items);
        setProducts(parsed);
      } catch {
        console.error("Error al parsear productos en localStorage");
      }
    }
  }, []);

  // Actualizar info cada vez que cambian los productos
  useEffect(() => {
    const acumulado = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
    const low = products.filter(p => p.quantity <= 10).length;
    const categories = new Set(products.map(p => p.category)).size;

    setInfo({
      total: products.length,
      valor: acumulado,
      low,
      categories,
    });
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sección de estadísticas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard title="Total de Productos" value={`${info.total}`} />
        <StatsCard title="Valor Total" value={`$ ${info.valor.toLocaleString()}`} />
        <StatsCard title="Categorías" value={`${info.categories}`} />
        <StatsCard title="Bajo Inventario" value={`${info.low}`} />
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
