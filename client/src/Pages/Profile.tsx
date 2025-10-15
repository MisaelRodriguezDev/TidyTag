import React from "react";

const ConfigCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
    {children}
  </div>
);

const InputField = ({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-md text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const ToggleField = ({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) => (
  <div className="flex items-center justify-between">
    <label className="text-md text-gray-600">{label}</label>
    <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4" />
  </div>
);

const Profile: React.FC = () => {
  const users = [
    { id: "1",nombre: "Alex Kim", rol: "Administrador", estado: "Activo" },
    { id: "2",nombre: "Priya N.", rol: "Empleado", estado: "Activo" },
    { id: "3",nombre: "Diego M.", rol: "Invitado", estado: "Invitado" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-5 flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Configuración</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConfigCard title="Organización">
          <form className="space-y-4">
            <InputField label="Nombre del Negocio" placeholder="Ejemplo: Almacenes Rivera" />
            <InputField label="Correo del Propietario" type="email" placeholder="correo@empresa.com" />
            <InputField label="Teléfono" type="tel" placeholder="(555) 123-4567" />
            <InputField label="Ubicación Predeterminada" placeholder="Almacén Principal" />
          </form>
        </ConfigCard>

        <ConfigCard title="Preferencias de Inventario">
          <form className="space-y-4">
            <ToggleField label="Controlar Inventario" defaultChecked />
            <InputField label="Umbral de Bajo Stock" type="number" placeholder="Ejemplo: 5" />
            <InputField label="Tasa de Impuesto Predeterminada" placeholder="Ejemplo: 8%" />
            <InputField label="Moneda" placeholder="MXN — $" />
          </form>
        </ConfigCard>

        <ConfigCard title="Notificaciones">
          <form className="space-y-3">
            <ToggleField label="Alertas de Bajo Inventario" defaultChecked />
            <ToggleField label="Resumen Semanal por Correo" defaultChecked />
            <ToggleField label="Alertas de Ventas" />
            <InputField label="Correo para Alertas" type="email" placeholder="alertas@empresa.com" />
          </form>
        </ConfigCard>

        <ConfigCard title="Usuarios y Roles">
          <ul className="space-y-3">
            {users.map((user) => (
              <li key={user.id} className="flex justify-between items-center border border-gray-200 rounded-lg p-3">
                <div>
                  <p className="font-medium text-gray-800">{user.nombre}</p>
                  <p className="text-md text-gray-500">{user.rol}</p>
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
        </ConfigCard>

        <ConfigCard title="Datos y Exportación">
          <form className="space-y-4">
            <InputField label="Formato de Exportación" placeholder="CSV / XLSX" />
            <ToggleField label="Incluir Archivados" />
            <div className="flex gap-4">
              <button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                Exportar
              </button>
              <button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                Importar
              </button>
            </div>
          </form>
        </ConfigCard>

        <ConfigCard title="Zona Peligrosa">
          <p className="text-md text-gray-600 mb-4">Estas acciones son irreversibles. Procede con precaución.</p>
          <div className="flex gap-4">
            <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
              Eliminar Todos los Productos
            </button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
              Restablecer Configuración
            </button>
          </div>
        </ConfigCard>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancelar</button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Guardar Cambios</button>
      </div>
    </div>
  );
};

export default Profile;
