import React, { useState, useEffect } from "react";
import InventoryTable from "../components/ui/Inventory/InventoryTable";
import SearchBar from "../components/ui/Inventory/SearchBar";
import InventoryFilters from "../components/ui/Inventory/InventoryFilters";
import BaseModal from "../components/ui/common/Modal";
import CreateProductForm from "../components/ui/Inventory/CreateProductForm";
import UpdateProductForm from "../components/ui/Inventory/UpdateProductForm";
import BarcodeScanner from "../components/ui/Barcode/BarcodeScanner";
import type Product from "../types/Product";

// Iconos para los botones (puedes reemplazar con tus propios iconos)
const ScanIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);

const AddIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

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

  const filtered = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || p.category === category)
    );
  });

  const deleteProduct = (id: string) => {
    if (window.confirm("¿Desea eliminar este producto?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
    }
  };

  const updateQtyProduct = (id: string, qty: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((p) => {
        if (p.id === id) {
          return { ...p, quantity: Math.max(0, qty) };
        }
        return p;
      });

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    const items = localStorage.getItem("products");
    if (items) {
      try {
        setProducts(JSON.parse(items));
      } catch {
        console.error("Error al actualizar productos tras cerrar modal");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Header responsivo */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Inventario</h1>
          
          {/* Botones de acción - Responsive */}
          <div className="flex gap-2 items-center justify-end sm:justify-start">
            {/* Botón Escanear - Con icono en móvil */}
            <button
              onClick={() => setIsScannerOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition cursor-pointer text-sm sm:text-base"
              title="Escanear código de barras"
            >
              <ScanIcon />
              <span>Escanear</span>
            </button>

            {/* Botón Agregar Producto - Con icono en móvil */}
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-2 sm:px-4 sm:py-2 rounded-lg transition-colors cursor-pointer text-sm sm:text-base"
              onClick={openAddModal}
            >
              <AddIcon />
              <span className="hidden sm:inline">Agregar Producto</span>
              <span className="sm:hidden">Agregar</span>
            </button>
          </div>
        </div>

       

        {/* Búsqueda y Filtros */}
        <div className="space-y-4 mb-6">
          <SearchBar value={search} onChange={setSearch} />
          <InventoryFilters category={category} onCategoryChange={setCategory} />
        </div>

        {/* Tabla de inventario */}
        <InventoryTable
          products={filtered}
          onEdit={openEditModal}
          onDelete={deleteProduct}
          onUpdateQuantity={updateQtyProduct}
        />

        {/* Botón flotante para móvil */}
        <div className="fixed bottom-6 right-6 sm:hidden z-10">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg flex items-center justify-center hover:bg-purple-700 transition cursor-pointer"
              title="Escanear código"
            >
              <ScanIcon />
            </button>
            <button
              onClick={openAddModal}
              className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition cursor-pointer"
              title="Agregar producto"
            >
              <AddIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de creación/edición */}
      {isModalOpen && (
        <BaseModal
          title={editingProduct ? "Editar Producto" : "Agregar Producto"}
          onClose={handleCloseModal}
        >
          {editingProduct ? (
            <UpdateProductForm product={editingProduct} onClose={handleCloseModal} />
          ) : (
            <CreateProductForm onClose={handleCloseModal} />
          )}
        </BaseModal>
      )}

      {/* Modal del escáner */}
      {isScannerOpen && (
        <BaseModal
          title="Escanear código de barras"
          onClose={() => setIsScannerOpen(false)}
        >
          <div className="p-2 sm:p-4">
            <BarcodeScanner
              onScan={(code) => {
                alert(`Código detectado: ${code}`);
                setIsScannerOpen(false);
              }}
              onError={(err) => console.error("Error escáner:", err)}
            />
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default Inventory;