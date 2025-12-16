import React, { useState, useEffect } from "react";

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
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label className="block text-md text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    />
  </div>
);

const ToggleField = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-md text-gray-600">{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
  </div>
);

interface AppConfig {
  organization: {
    businessName: string;
    ownerEmail: string;
    phone: string;
  };
  inventory: {
    controlInventory: boolean;
    lowStockThreshold: string;
    currency: string;
  };
  notifications: {
    lowStockAlerts: boolean;
    salesAlerts: boolean;
  };
}

const Profile: React.FC = () => {
  const initialConfig: AppConfig = {
    organization: { businessName: "", ownerEmail: "", phone: "" },
    inventory: { controlInventory: true, lowStockThreshold: "5", currency: "MXN" },
    notifications: { lowStockAlerts: true, salesAlerts: false },
  };

  const [config, setConfig] = useState<AppConfig>(initialConfig);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("appConfig");
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch {
        console.error("Error cargando configuración almacenada");
      }
    }
  }, []);

  useEffect(() => {
    if (hasChanges) {
      localStorage.setItem("appConfig", JSON.stringify(config));
      setHasChanges(false);
    }
  }, [config, hasChanges]);

  const updateField = (section: keyof AppConfig, field: string, value: unknown) => {
    setConfig((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    setHasChanges(true);
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("appConfig");
    setConfig(saved ? JSON.parse(saved) : initialConfig);
    setHasChanges(false);
  };

  const users = [
    { id: "1", nombre: "Alex Kim", rol: "Administrador", estado: "Activo" },
    { id: "2", nombre: "Priya N.", rol: "Empleado", estado: "Activo" },
    { id: "3", nombre: "Diego M.", rol: "Invitado", estado: "Invitado" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-5 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Configuración</h1>

        {hasChanges && (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            Cambios sin guardar
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organización */}
        <ConfigCard title="Organización">
          <div className="space-y-4">
            <InputField
              label="Nombre del Negocio"
              placeholder="Ejemplo: Almacenes Rivera"
              value={config.organization.businessName}
              onChange={(v) => updateField("organization", "businessName", v)}
            />
            <InputField
              label="Correo del Propietario"
              type="email"
              placeholder="correo@empresa.com"
              value={config.organization.ownerEmail}
              onChange={(v) => updateField("organization", "ownerEmail", v)}
            />
            <InputField
              label="Teléfono"
              type="tel"
              placeholder="(555) 123-4567"
              value={config.organization.phone}
              onChange={(v) => updateField("organization", "phone", v)}
            />
          </div>
        </ConfigCard>

        {/* Inventario */}
        <ConfigCard title="Preferencias de Inventario">
          <div className="space-y-4">
            <ToggleField
              label="Controlar Inventario"
              checked={config.inventory.controlInventory}
              onChange={(v) => updateField("inventory", "controlInventory", v)}
            />
            <InputField
              label="Umbral de Bajo Stock"
              type="number"
              placeholder="Ejemplo: 5"
              value={config.inventory.lowStockThreshold}
              onChange={(v) => updateField("inventory", "lowStockThreshold", v)}
            />
            <InputField
              label="Moneda"
              value={config.inventory.currency}
              onChange={(v) => updateField("inventory", "currency", v)}
            />
          </div>
        </ConfigCard>

        {/* Notificaciones */}
        <ConfigCard title="Notificaciones">
          <div className="text-sm text-gray-500 mb-4">
            Configura cómo deseas recibir alertas y reportes automáticos del sistema.
          </div>

          <form className="space-y-5">
            <ToggleField 
              label="Alertas de Bajo Inventario" 
              checked={config.notifications.lowStockAlerts}
              onChange={(checked) => updateField('notifications', 'lowStockAlerts', checked)}
            />

            <ToggleField 
              label="Alertas de Ventas" 
              checked={config.notifications.salesAlerts}
              onChange={(checked) => updateField('notifications', 'salesAlerts', checked)}
            />
          </form>
        </ConfigCard>


        {/* Usuarios */}
        <ConfigCard title="Usuarios y Roles">
          <ul className="space-y-3">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex justify-between items-center border border-gray-200 rounded-lg p-3"
              >
                <div>
                  <p className="font-medium text-gray-800">{u.nombre}</p>
                  <p className="text-md text-gray-500">{u.rol}</p>
                </div>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    u.estado === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {u.estado}
                </span>
              </li>
            ))}
          </ul>

          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Invitar Usuario
          </button>
        </ConfigCard>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          onClick={handleCancel}
        >
          Cancelar
        </button>

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={() => setHasChanges(true)}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default Profile;
