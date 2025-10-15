import React from 'react';

interface Alert {
  id: number;
  product: string;
  category?: string;
  currentQty: number;
}

const AlertRow: React.FC<{ alert: Alert }> = ({ alert }) => (
  <tr
    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
  >
    <td className="py-3 px-2 text-gray-800 font-medium">{alert.product}</td>
    <td className="py-3 px-2 text-gray-600">{alert.category}</td>
    <td className="py-3 px-2 text-gray-800 text-center">{alert.currentQty}</td>
  </tr>
);

const AlertCard: React.FC<{ alert: Alert }> = ({ alert }) => (
  <div
    className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
  >

    <div className="flex justify-between text-sm text-gray-700">
      <div>
        <span className="block text-gray-500 text-xs">Categoría</span>
        <p>{alert.category}</p>
      </div>
      <div>
        <span className="block text-gray-500 text-xs">Cantidad</span>
        <p className='text-center'>{alert.currentQty}</p>
      </div>
    </div>
  </div>
);

const LowInventoryAlerts: React.FC = () => {
  const alerts: Alert[] = [
    { id: 1, product: "Cajas Kraft (Pequeñas)", category: "Empaque", currentQty: 12 },
    { id: 2, product: "Bolsas de Papel (L)", category: "Empaque", currentQty: 8 },
    { id: 3, product: "Etiquetas Térmicas", category: "Suministros", currentQty: 15 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">
        Alertas de Inventario Bajo
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-600">
              <th className="text-left py-3 px-2 font-medium">Producto</th>
              <th className="text-left py-3 px-2 font-medium">Categoría</th>
              <th className="text-left py-3 px-2 font-medium">Cantidad Actual</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <AlertRow key={alert.id} alert={alert} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default LowInventoryAlerts;
