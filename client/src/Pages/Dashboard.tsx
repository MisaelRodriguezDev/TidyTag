import React from "react";
import StatsCard from "../components/ui/StatsCard";
import RecentProducts from "../components/ui/RecentProducts";
import LowInventoryAlerts from "../components/ui/LowInventoryAlerts";

const Dashboard: React.FC = () => {

  const fetchProductData = async (barcode: string): Promise<void> => {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
    const data = await response.json();

    if (data.status === 1 && data.product) {
      console.log('Nombre del producto:', data.product.product_name);
      console.log('Marca:', data.product.brands);
      console.log('Ingredientes:', data.product.ingredients_text);
      console.log('Nutri-Score:', data.product.nutrition_grades);
      console.log('Imagen:', data.product.image_url);
    } else {
      console.log('Producto no encontrado o datos incompletos.');
    }
  } catch (error) {
    console.error('Error al obtener los datos del producto:', error);
  }
};

// Llamada a la función con el código de barras proporcionado
fetchProductData('8480000101365');

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
