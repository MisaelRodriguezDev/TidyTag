import React from "react";

interface InventoryFiltersProps {
  category: string;
  onCategoryChange: (value: string) => void;
}

const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  category,
  onCategoryChange,
}) => {
  return (
    <div className="mb-6 flex gap-4">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
      >
        <option value="">Todas las categorías</option>
        <option value="Electrónica">Electrónica</option>
        <option value="Hogar">Hogar</option>
        <option value="Oficina">Oficina</option>
      </select>
    </div>
  );
};

export default InventoryFilters;
