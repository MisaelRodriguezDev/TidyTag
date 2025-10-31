import React, { useEffect, useState } from "react";
import type { Product } from "../../../types/Product";

interface InventoryFiltersProps {
  category: string;
  onCategoryChange: (value: string) => void;
}

const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  category,
  onCategoryChange,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const categories = Array.from(new Set(products.map(p => p.category)))
    useEffect(() => {
    const items = localStorage.getItem("products");
    if (items) {
      try {
        setProducts(JSON.parse(items));
      } catch {
        console.error("Error al parsear productos en localStorage");
      }
    }
  }, []);
  return (
    <div className="mb-6 flex gap-4">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
      >
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
      </select>
    </div>
  );
};

export default InventoryFilters;
