import React from 'react';

interface Alert {
  id: number;
  product: string;
  category?: string;
  currentQty: number;
}

const LowInventoryAlerts: React.FC = () => {
  const alerts: Alert[] = [
    {
      id: 1,
      product: "Kraft Boxes (Small)",
      category: "Packaging",
      currentQty: 12,
    },
    {
      id: 2,
      product: "Paper Bags (L)",
      category: "Packaging",
      currentQty: 8,
    },
    {
      id: 3,
      product: "Thermal Labels",
      category: "Supplies",
      currentQty: 15,
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Alerta de Inventario Bajo</h2>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Producto</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Categoria/Cantidad</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Acción</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 px-2 text-sm text-gray-800">{alert.product}</td>
                <td className="py-3 px-2 text-sm text-gray-600">
                  {alert.category}{alert.currentQty}
                </td>
                <td className="py-3 px-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-800">{alert.product}</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Categoria/Cantidad:</span>
                <span className="ml-1 text-gray-800">{alert.category}{alert.currentQty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowInventoryAlerts;