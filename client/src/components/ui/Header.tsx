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
            <Link to="/" className="text-blue-600 font-medium hover:text-blue-800">Inicio</Link>
            <Link to="/inventario" className="text-gray-600 hover:text-gray-900 font-medium">Inventario</Link>
            <Link to="/estadisticas" className="text-gray-600 hover:text-gray-900 font-medium">Estadísticas</Link>
            <Link to="/perfil" className="text-gray-600 hover:text-gray-900 font-medium">Perfil</Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="/" className="block py-2 text-blue-600 font-medium hover:text-blue-800">Inicio</Link>
            <Link to="/inventario" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Inventario</Link>
            <Link to="/estadisticas" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Estadísticas</Link>
            <Link to="/perfil" className="block py-2 text-gray-600 hover:text-gray-900 font-medium">Perfil</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;