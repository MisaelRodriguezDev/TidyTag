import React, { useState } from "react";
import type {Product} from "../../../types/Product";
import formattedPrice from "../../../utils/formattedPrice";
import BaseModal from "../common/Modal";

interface InventoryTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  onUpdateQuantity?: (id: string, newQuantity: number) => void;
}

// Iconos para los botones
const SellIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const RestockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onEdit,
  onDelete,
  onUpdateQuantity,
}) => {
  // Estado para controlar el modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isRestockMode, setIsRestockMode] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Abrir modal con modo (vender o reabastecer)
  const openModal = (product: Product, restock: boolean) => {
    setSelectedProduct(product);
    setIsRestockMode(restock);
    setQuantity(1);
  };

  // Cerrar modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Confirmar acción
  const handleConfirm = () => {
    if (!selectedProduct || !onUpdateQuantity) return;

    const newQty = isRestockMode
      ? selectedProduct.quantity + quantity
      : selectedProduct.quantity - quantity;

    // Validar que no quede negativo
    if (newQty < 0) {
      alert(`No puedes vender más de lo que hay en inventario.\nCantidad disponible: ${selectedProduct.quantity}`);
      return;
    }

    onUpdateQuantity(selectedProduct.id, newQty);
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleConfirm();
  };

  // Vista móvil - Tarjetas
  const MobileView = () => (
    <div className="md:hidden space-y-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-lg truncate pr-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{product.category || "Sin categoría"}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              product.quantity > 0 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {product.quantity} unidades
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500 text-xs">Precio</p>
              <p className="font-medium">$ {formattedPrice(product.price)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Código</p>
              <p className="font-mono text-sm truncate">{product.barcode}</p>
            </div>
          </div>

          {/* Botones responsivos para móvil */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {onUpdateQuantity && (
                <>
                  <button
                    onClick={() => openModal(product, false)}
                    disabled={product.quantity <= 0}
                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                      product.quantity > 0
                        ? "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-2 focus:ring-blue-300"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <SellIcon />
                    <span>Vender</span>
                  </button>
                  <button
                    onClick={() => openModal(product, true)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-100 text-green-800 hover:bg-green-200 rounded-md text-sm font-medium transition focus:ring-2 focus:ring-green-300"
                  >
                    <RestockIcon />
                    <span>Reabastecer</span>
                  </button>
                </>
              )}
            </div>
            
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(product)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-md text-sm font-medium transition focus:ring-2 focus:ring-yellow-300"
                >
                  <EditIcon />
                  <span>Editar</span>
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => onDelete(product.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-800 hover:bg-red-200 rounded-md text-sm font-medium transition focus:ring-2 focus:ring-red-300"
                >
                  <DeleteIcon />
                  <span>Eliminar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Vista desktop - Tabla
  const DesktopView = () => (
    <div className="hidden md:block bg-white shadow-sm rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Nombre", "Categoría", "Cantidad", "Precio", "Código de Barras", "Acciones"].map(
              (header) => (
                <th
                  key={header}
                  className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-3 sm:px-4 lg:px-6 py-4 text-gray-700 max-w-[150px] lg:max-w-none truncate">
                {product.name}
              </td>
              <td className="px-3 sm:px-4 lg:px-6 py-4 text-gray-700 hidden sm:table-cell">
                {product.category || "-"}
              </td>
              <td className="px-3 sm:px-4 lg:px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.quantity > 0 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.quantity}
                </span>
              </td>
              <td className="px-3 sm:px-4 lg:px-6 py-4 text-gray-700">
                $ {formattedPrice(product.price)}
              </td>
              <td className="px-3 sm:px-4 lg:px-6 py-4 text-gray-700 font-mono text-sm hidden lg:table-cell">
                {product.barcode}
              </td>
              <td className="px-3 sm:px-4 lg:px-6 py-4">
                <div className="flex flex-col xs:flex-row flex-wrap gap-1 sm:gap-2 justify-start lg:justify-center">
                  {onUpdateQuantity && (
                    <>
                      <button
                        onClick={() => openModal(product, false)}
                        disabled={product.quantity <= 0}
                        className={`flex items-center justify-center gap-1 px-2 xs:px-3 py-1 xs:py-1.5 rounded-md text-xs xs:text-sm font-medium transition min-w-[70px] ${
                          product.quantity > 0
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-2 focus:ring-blue-300"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <SellIcon />
                        <span>Vender</span>
                      </button>
                      <button
                        onClick={() => openModal(product, true)}
                        className="flex items-center justify-center gap-1 px-2 xs:px-3 py-1 xs:py-1.5 bg-green-100 text-green-800 hover:bg-green-200 rounded-md text-xs xs:text-sm font-medium transition min-w-[70px] focus:ring-2 focus:ring-green-300"
                      >
                        <RestockIcon />
                        <span>Reabastecer</span>
                      </button>
                    </>
                  )}

                  {onEdit && (
                    <button
                      onClick={() => onEdit(product)}
                      className="flex items-center justify-center gap-1 px-2 xs:px-3 py-1 xs:py-1.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-md text-xs xs:text-sm font-medium transition min-w-[70px] focus:ring-2 focus:ring-yellow-300"
                    >
                      <EditIcon />
                      <span>Editar</span>
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(product.id)}
                      className="flex items-center justify-center gap-1 px-2 xs:px-3 py-1 xs:py-1.5 bg-red-100 text-red-800 hover:bg-red-200 rounded-md text-xs xs:text-sm font-medium transition min-w-[70px] focus:ring-2 focus:ring-red-300"
                    >
                      <DeleteIcon />
                      <span>Eliminar</span>
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

  return (
    <div>
      <MobileView />
      <DesktopView />

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No hay productos en el inventario</div>
          <div className="text-gray-500 text-sm mt-2">
            Agrega productos para comenzar a gestionar tu inventario
          </div>
        </div>
      )}

      {/* Modal de cantidad - Responsive */}
      {selectedProduct && (
        <BaseModal
          title={isRestockMode ? "Reabastecer producto" : "Vender producto"}
          onClose={closeModal}
        >
          <div className="flex flex-col gap-4 p-2 sm:p-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-700 text-sm sm:text-base">
                Producto: <strong className="break-words">{selectedProduct.name}</strong>
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Stock actual: <span className={`font-medium ${
                  selectedProduct.quantity > 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {selectedProduct.quantity} unidades
                </span>
              </p>
            </div>

            <div>
              <label className="text-gray-700 text-sm font-medium block mb-2">
                Cantidad a {isRestockMode ? "agregar" : "vender"}:
              </label>
              <input
                type="number"
                min={1}
                {...(!isRestockMode ? { max: selectedProduct.quantity } : {})}
                onKeyDown={handleKeyDown}
                className="w-full border border-gray-300 rounded-md p-3 text-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                autoFocus
              />
              {!isRestockMode && (
                <p className="text-xs text-gray-500 mt-1">
                  Máximo: {selectedProduct.quantity} unidades disponibles
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end mt-4">
              <button
                onClick={closeModal}
                className="flex-1 sm:flex-none px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition font-medium text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 sm:flex-none px-4 py-3 rounded-md font-medium text-white transition text-sm sm:text-base ${
                  isRestockMode
                    ? "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                }`}
              >
                {isRestockMode ? "Agregar al Inventario" : "Confirmar Venta"}
              </button>
            </div>
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default InventoryTable;