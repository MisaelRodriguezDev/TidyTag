import React, { useState } from "react";
import Header from "../components/ui/Header";
import InventoryTable from "../components/ui/Inventory/InventoryTable";
import SearchBar from "../components/ui/Inventory/SearchBar";
import InventoryFilters from "../components/ui/Inventory/InventoryFilters";
import ProductModal from "../components/ui/Inventory/ProductModal";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Laptop HP", category: "Electrónica", stock: 10, price: 850 },
    { id: "2", name: "Silla ergonómica", category: "Oficina", stock: 5, price: 120 },
    { id: "3", name: "Lámpara LED", category: "Hogar", stock: 20, price: 25 },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || p.category === category)
    );
  });

  // CRUD Functions
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
  };

  const updateProduct = (updated: Product) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const deleteProduct = (id: string) => {
    if (window.confirm("¿Desea eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Inventario</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={openAddModal}
          >
            Agregar Producto
          </button>
        </div>

        <SearchBar value={search} onChange={setSearch} />
        <InventoryFilters category={category} onCategoryChange={setCategory} />

        <InventoryTable
          products={filtered}
          onEdit={openEditModal}
          onDelete={deleteProduct}
        />
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={(product) =>
            editingProduct ? updateProduct(product) : addProduct(product)
          }
        />
      )}
    </div>
  );
};

export default Inventory;