import React from "react";

interface BaseModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-screen flex flex-col animate-fadeIn">
        {/* Encabezado */}
        <div className="flex justify-between items-center p-3">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors text-xl"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Contenido con scroll si excede el alto */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
