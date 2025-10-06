import React from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  updated: string;
  quantity: number;
}

const RecentProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Cajas Kraft (Pequeñas)",
      category: "Empaque",
      updated: "Actualizado hace 20 días",
      quantity: 12,
    },
    {
      id: 2,
      name: "Escáner de Códigos de Barras USB",
      category: "Tecnología",
      updated: "Agregado hace 14 días",
      quantity: 48,
    },
    {
      id: 3,
      name: "Bolsas de Papel (L)",
      category: "Empaque",
      updated: "Actualizado hace 30 días",
      quantity: 8,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
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
              <p className="text-sm text-gray-600 mt-1">
                {product.category} • {product.updated}
              </p>
            </div>

            {/* Cantidad */}
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.quantity <= 10
                  ? "bg-red-50 text-red-700"
                  : product.quantity <= 20
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-blue-50 text-blue-700"
              }`}
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
