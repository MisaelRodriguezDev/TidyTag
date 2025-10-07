import React from "react";
import type ProductType from "../../../types/Product"; // Ajusta la ruta según tu proyecto

interface InventoryTableProps {
  products: ProductType[];
  onEdit?: (product: ProductType) => void;
  onDelete?: (id: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Cantidad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Código de Barras
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.category || "-"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">${p.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.barcode}</td>
              <td className="px-6 py-4 whitespace-nowrap max-w-[180px]">
                <div className="flex gap-2 justify-center flex-shrink-0">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(p)}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-md shadow-sm transition duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    >
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(p.id)}
                      className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded-md shadow-sm transition duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
