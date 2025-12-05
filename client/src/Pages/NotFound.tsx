import React from "react";
import { Link } from "react-router-dom"; // si usas React Router

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      
      {/* 404 Header */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-800 mb-4">404</h1>
      
      {/* Mensaje principal */}
      <p className="text-xl sm:text-2xl text-gray-600 mb-6">
        Ooops… La página que buscas no existe
      </p>

      {/* Icono de cara triste 
        **CORRECCIÓN: Reemplazado por un icono de cara triste y color AZUL.
      */}
      <div className="mb-6">
        <svg 
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-blue-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Path para una cara triste */}
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Botón de navegación */}
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-300"
      >
        Volver al inicio
      </Link>

      {/* Footer */}
      <p className="mt-6 text-gray-400 text-sm sm:text-base">
        TidyTag PWA © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default NotFoundPage;