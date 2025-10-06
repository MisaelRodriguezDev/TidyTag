import React, { useState, useEffect } from "react";

interface Product {
  id?: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

interface ProductModalProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setStock(product.stock);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: product?.id, name, category, stock, price });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {product ? "Editar Producto" : "Agregar Producto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
