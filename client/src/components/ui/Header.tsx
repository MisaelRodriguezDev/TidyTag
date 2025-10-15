import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/tidytag.png";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/inventario", label: "Inventario" },
  { to: "/estadisticas", label: "Estadísticas" },
  { to: "/perfil", label: "Perfil" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeClass = "text-blue-600 font-medium";
  const inactiveClass = "text-gray-600 hover:text-gray-900 font-medium";

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo de TidyTag" width={40} className="rounded-md" />
            <h1 className="text-2xl font-bold text-gray-800">TidyTag</h1>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            aria-label="Abrir menú"
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
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t flex flex-col space-y-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
