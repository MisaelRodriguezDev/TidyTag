import React from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

interface InventoryTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">${p.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(p)}
                    className="text-yellow-600 hover:text-yellow-800 font-medium"
                  >
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
