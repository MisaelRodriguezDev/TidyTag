import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Clase para el link activo
  const activeClass = "text-blue-600 font-medium";
  const inactiveClass = "text-gray-600 hover:text-gray-900 font-medium";

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
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/inventario"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Inventario
            </NavLink>
            <NavLink
              to="/estadisticas"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Estadísticas
            </NavLink>
            <NavLink
              to="/perfil"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Perfil
            </NavLink>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t flex flex-col space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </NavLink>
            <NavLink
              to="/inventario"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={() => setIsMenuOpen(false)}
            >
              Inventario
            </NavLink>
            <NavLink
              to="/estadisticas"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={() => setIsMenuOpen(false)}
            >
              Estadísticas
            </NavLink>
            <NavLink
              to="/perfil"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              onClick={() => setIsMenuOpen(false)}
            >
              Perfil
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
