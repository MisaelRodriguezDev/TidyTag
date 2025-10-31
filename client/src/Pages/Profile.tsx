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
  checked = false, 
  onChange 
}: { 
  label: string; 
  checked?: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <label className="text-md text-gray-600">{label}</label>
    <input 
      type="checkbox" 
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
  </div>
);

// Interfaces para el tipo de datos
interface OrganizationData {
  businessName: string;
  ownerEmail: string;
  phone: string;
  defaultLocation: string;
}

interface InventoryData {
  controlInventory: boolean;
  lowStockThreshold: string;
  taxRate: string;
  currency: string;
}

interface NotificationsData {
  lowStockAlerts: boolean;
  weeklySummary: boolean;
  salesAlerts: boolean;
  alertEmail: string;
}

interface ExportData {
  exportFormat: string;
  includeArchived: boolean;
}

interface AppConfig {
  organization: OrganizationData;
  inventory: InventoryData;
  notifications: NotificationsData;
  export: ExportData;
}

const Profile: React.FC = () => {
  // Estado inicial
  const initialConfig: AppConfig = {
    organization: {
      businessName: "",
      ownerEmail: "",
      phone: "",
      defaultLocation: "",
    },
    inventory: {
      controlInventory: true,
      lowStockThreshold: "5",
      taxRate: "8%",
      currency: "MXN — $",
    },
    notifications: {
      lowStockAlerts: true,
      weeklySummary: true,
      salesAlerts: false,
      alertEmail: "",
    },
    export: {
      exportFormat: "CSV",
      includeArchived: false,
    },
  };

  const [config, setConfig] = useState<AppConfig>(initialConfig);
  const [hasChanges, setHasChanges] = useState(false);

  // Cargar configuración desde localStorage al iniciar
  useEffect(() => {
    const savedConfig = localStorage.getItem('appConfig');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Error al cargar configuración:', error);
      }
    }
  }, []);

  // Guardar en localStorage cuando haya cambios
  useEffect(() => {
    if (hasChanges) {
      localStorage.setItem('appConfig', JSON.stringify(config));
      setHasChanges(false);
    }
  }, [config, hasChanges]);

  // Función para actualizar cualquier campo
  const updateField = (section: keyof AppConfig, field: string, value: unknown) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  // Función para guardar cambios manualmente
  const handleSave = () => {
    localStorage.setItem('appConfig', JSON.stringify(config));
    setHasChanges(false);
    alert("Cambios guardados correctamente");
  };

  // Función para cancelar y resetear
  const handleCancel = () => {
    const savedConfig = localStorage.getItem('appConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    } else {
      setConfig(initialConfig);
    }
    setHasChanges(false);
  };

  // Función para restablecer configuración
  const handleReset = () => {
    if (window.confirm("¿Estás seguro de que quieres restablecer toda la configuración? Se perderán todos los cambios no guardados.")) {
      setConfig(initialConfig);
      localStorage.removeItem('appConfig');
      setHasChanges(false);
    }
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
        <ConfigCard title="Organización">
          <form className="space-y-4">
            <InputField 
              label="Nombre del Negocio" 
              placeholder="Ejemplo: Almacenes Rivera" 
              value={config.organization.businessName}
              onChange={(value) => updateField('organization', 'businessName', value)}
            />
            <InputField 
              label="Correo del Propietario" 
              type="email" 
              placeholder="correo@empresa.com" 
              value={config.organization.ownerEmail}
              onChange={(value) => updateField('organization', 'ownerEmail', value)}
            />
            <InputField 
              label="Teléfono" 
              type="tel" 
              placeholder="(555) 123-4567" 
              value={config.organization.phone}
              onChange={(value) => updateField('organization', 'phone', value)}
            />
            <InputField 
              label="Ubicación Predeterminada" 
              placeholder="Almacén Principal" 
              value={config.organization.defaultLocation}
              onChange={(value) => updateField('organization', 'defaultLocation', value)}
            />
          </form>
        </ConfigCard>

        <ConfigCard title="Preferencias de Inventario">
          <form className="space-y-4">
            <ToggleField 
              label="Controlar Inventario" 
              checked={config.inventory.controlInventory}
              onChange={(checked) => updateField('inventory', 'controlInventory', checked)}
            />
            <InputField 
              label="Umbral de Bajo Stock" 
              type="number" 
              placeholder="Ejemplo: 5" 
              value={config.inventory.lowStockThreshold}
              onChange={(value) => updateField('inventory', 'lowStockThreshold', value)}
            />
            <InputField 
              label="Tasa de Impuesto Predeterminada" 
              placeholder="Ejemplo: 8%" 
              value={config.inventory.taxRate}
              onChange={(value) => updateField('inventory', 'taxRate', value)}
            />
            <InputField 
              label="Moneda" 
              placeholder="MXN — $" 
              value={config.inventory.currency}
              onChange={(value) => updateField('inventory', 'currency', value)}
            />
          </form>
        </ConfigCard>

        <ConfigCard title="Notificaciones">
          <form className="space-y-3">
            <ToggleField 
              label="Alertas de Bajo Inventario" 
              checked={config.notifications.lowStockAlerts}
              onChange={(checked) => updateField('notifications', 'lowStockAlerts', checked)}
            />
            <ToggleField 
              label="Resumen Semanal por Correo" 
              checked={config.notifications.weeklySummary}
              onChange={(checked) => updateField('notifications', 'weeklySummary', checked)}
            />
            <ToggleField 
              label="Alertas de Ventas" 
              checked={config.notifications.salesAlerts}
              onChange={(checked) => updateField('notifications', 'salesAlerts', checked)}
            />
            <InputField 
              label="Correo para Alertas" 
              type="email" 
              placeholder="alertas@empresa.com" 
              value={config.notifications.alertEmail}
              onChange={(value) => updateField('notifications', 'alertEmail', value)}
            />
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
            <InputField 
              label="Formato de Exportación" 
              placeholder="CSV / XLSX" 
              value={config.export.exportFormat}
              onChange={(value) => updateField('export', 'exportFormat', value)}
            />
            <ToggleField 
              label="Incluir Archivados" 
              checked={config.export.includeArchived}
              onChange={(checked) => updateField('export', 'includeArchived', checked)}
            />
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
            <button 
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
              onClick={handleReset}
            >
              Restablecer Configuración
            </button>
          </div>
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
          onClick={handleSave}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default Profile;