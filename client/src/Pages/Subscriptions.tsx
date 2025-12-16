import React, { useState } from "react";

interface Plan {
  name: string;
  price: number;
  features: string[];
}

const plans: Plan[] = [
  { name: "Gratis", price: 0, features: ["Acceso básico", "Hasta 10 productos"] },
  { name: "Basic", price: 100, features: ["Acceso completo", "Hasta 100 productos", "Soporte por email"] },
  { name: "Pro", price: 250, features: ["Acceso completo", "Productos ilimitados", "Soporte prioritario", "Reportes avanzados"] },
];

const Plans: React.FC = () => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (planName: string) => {
    setSelected(planName);
    alert(`Plan seleccionado: ${planName}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl grid sm:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-2xl p-6 text-center shadow-lg cursor-pointer transition transform hover:scale-105 ${
              selected === plan.name ? "border-purple-600 ring-2 ring-purple-200" : "border-gray-200"
            }`}
            onClick={() => handleSelect(plan.name)}
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {plan.price === 0 ? "Gratis" : `$${plan.price}`}
            </p>
            <ul className="mb-4 space-y-1">
              {plan.features.map((f) => (
                <li key={f} className="text-gray-600">{f}</li>
              ))}
            </ul>
            <button
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              {selected === plan.name ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
