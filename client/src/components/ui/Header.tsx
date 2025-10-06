import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <h1 className="text-2xl font-bold text-gray-800">TidyTag</h1>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-blue-600 font-medium">Inicio</Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 font-medium flex items-center">
                Inventario
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 w-48 z-10">
                <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Aañadir Producto</Link>
                <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Configuración</Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="#" className="block py-2 text-blue-600 font-medium">Dashboard</Link>
            <div className="py-2">
              <button className="w-full text-left py-2 text-gray-600 font-medium flex justify-between items-center">
                Inventario
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="pl-4 mt-2 space-y-2">
                <Link to="#" className="block py-1 text-gray-600 hover:text-gray-900">Añadir Producto</Link>
                <Link to="#" className="block py-1 text-gray-600 hover:text-gray-900">Configuración</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;