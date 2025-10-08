import React from "react";

const Profile: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">Configuración</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Organización */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Organización
            </h2>
            <form className="space-y-4">
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Nombre del Negocio
                </label>
                <input
                    type="text"
                    placeholder="Ejemplo: Almacenes Rivera"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Correo del Propietario
                </label>
                <input
                    type="email"
                    placeholder="correo@empresa.com"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Teléfono
                </label>
                <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Ubicación Predeterminada
                </label>
                <input
                    type="text"
                    placeholder="Almacén Principal"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                />
                </div>
            </form>
            </div>

            {/* Preferencias de Inventario */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Preferencias de Inventario
            </h2>
            <form className="space-y-4">
                <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Controlar Inventario</label>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Umbral de Bajo Stock
                </label>
                <input
                    type="number"
                    placeholder="Ejemplo: 5"
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Tasa de Impuesto Predeterminada
                </label>
                <input
                    type="text"
                    placeholder="Ejemplo: 8%"
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
                </div>
                <div>
                <label className="block text-sm text-gray-600 mb-1">Moneda</label>
                <input
                    type="text"
                    placeholder="MXN — $"
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
                </div>
            </form>
            </div>

            {/* Notificaciones */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Notificaciones
            </h2>
            <form className="space-y-3">
                <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Alertas de Bajo Inventario</label>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Resumen Semanal por Correo</label>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Alertas de Ventas</label>
                <input type="checkbox" className="h-4 w-4" />
                </div>
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Correo para Alertas
                </label>
                <input
                    type="email"
                    placeholder="alertas@empresa.com"
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
                </div>
            </form>
            </div>

            {/* Usuarios y Roles */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Usuarios y Roles
            </h2>

            <ul className="space-y-3">
                {[
                { nombre: "Alex Kim", rol: "Administrador", estado: "Activo" },
                { nombre: "Priya N.", rol: "Empleado", estado: "Activo" },
                { nombre: "Diego M.", rol: "Invitado", estado: "Invitado" },
                ].map((user, i) => (
                <li
                    key={i}
                    className="flex justify-between items-center border border-gray-200 rounded-lg p-3"
                >
                    <div>
                    <p className="font-medium text-gray-800">{user.nombre}</p>
                    <p className="text-sm text-gray-500">{user.rol}</p>
                    </div>
                    <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                        user.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                    >
                    {user.estado}
                    </span>
                </li>
                ))}
            </ul>

            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                Invitar Usuario
            </button>
            </div>

            {/* Datos y Exportación */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Datos y Exportación
            </h2>
            <form className="space-y-4">
                <div>
                <label className="block text-sm text-gray-600 mb-1">
                    Formato de Exportación
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-2">
                    <option>CSV</option>
                    <option>XLSX</option>
                </select>
                </div>
                <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Incluir Archivados</label>
                <input type="checkbox" className="h-4 w-4" />
                </div>

                <div className="flex gap-4">
                <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                    Exportar
                </button>
                <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                    Importar
                </button>
                </div>
            </form>
            </div>

            {/* Zona Peligrosa */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Zona Peligrosa</h2>
            <p className="text-sm text-gray-600 mb-4">
                Estas acciones son irreversibles. Procede con precaución.
            </p>

            <div className="flex gap-4">
                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                Eliminar Todos los Productos
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                Restablecer Configuración
                </button>
            </div>
            </div>
        </div>

        {/* Botones de Acción */}
        <div className="mt-8 flex justify-end gap-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Cancelar
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Guardar Cambios
            </button>
        </div>
        </div>
    );
    };

export default Profile;
