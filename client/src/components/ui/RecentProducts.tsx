import React, { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import formattedDate from "../../utils/formattedDate";

const RecentProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Cargar productos desde localStorage al montar
  useEffect(() => {
    const items = localStorage.getItem("products");
    if (items) {
      try {
        const parsed: Product[] = JSON.parse(items);
        setProducts(parsed);
      } catch (error) {
        console.error("Error al parsear productos desde localStorage:", error);
      }
    }
  }, []);

  // Función para definir colores según stock
  function setColorByStock(qty: number) {
    if (qty <= 10) return "bg-red-50 text-red-700";
    if (qty <= 20) return "bg-yellow-50 text-yellow-700";
    return "bg-blue-50 text-blue-700";
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        Productos Recientes
      </h2>

      <div className="space-y-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-start border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
          >
            {/* Información del producto */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-md text-gray-600 mt-1">
                {product.category} • {formattedDate(product.updated_at, 'last_modification')}
              </p>
            </div>

            {/* Cantidad */}
            <div
              className={`px-3 py-1 rounded-full text-md font-medium ${setColorByStock(
                product.quantity
              )}`}
            >
              {product.quantity} unidades
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
