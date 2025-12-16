import React, { useEffect, useState, useMemo, useRef } from "react";
import env from "../../config/env";

const SERVER_URL = `${env.SERVER_URL}/health`;

type ConnectionState = "offline" | "connected" | "synced";

const ConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<ConnectionState>("offline");

  const intervalRef = useRef<number | null>(null);

  // Backoff adaptativo según el estado
  const getNextInterval = (state: ConnectionState) => {
    switch (state) {
      case "offline":
        return 5000; // verificar más frecuente al estar sin internet
      case "connected":
        return 15000; // hay internet pero servidor no responde
      case "synced":
        return 60000; // estado estable, verificar poco
      default:
        return 15000;
    }
  };

  const checkServerStatus = async () => {
    // Si no hay internet, no pegues al servidor
    if (!navigator.onLine) {
      setStatus("offline");
      return;
    }

    // Timeout con AbortController
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch(SERVER_URL, {
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.ok) {
        setStatus("synced");
      } else {
        setStatus("connected");
      }
    } catch {
      // fetch falla → hay internet pero servidor no responde
      if (navigator.onLine) {
        setStatus("connected");
      } else {
        setStatus("offline");
      }
    }
  };

  // Manejo de intervalos dinámicos
  const setupInterval = (state: ConnectionState) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      checkServerStatus();
    }, getNextInterval(state));
  };

  // Reaccionar a cambios de estado
  useEffect(() => {
    setupInterval(status);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  // Listeners de navegador (offline/online)
  useEffect(() => {
    const handleOnline = () => checkServerStatus();
    const handleOffline = () => setStatus("offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Chequeo inicial
    checkServerStatus();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Memo de estilos para evitar recalcular en cada render
  const { style, dot, label } = useMemo(() => {
    switch (status) {
      case "offline":
        return {
          style: "bg-red-100 text-red-700",
          dot: "bg-red-500",
          label: "Sin conexión",
        };
      case "connected":
        return {
          style: "bg-yellow-100 text-yellow-700",
          dot: "bg-yellow-500",
          label: "Conectado",
        };
      case "synced":
        return {
          style: "bg-green-100 text-green-700",
          dot: "bg-green-500",
          label: "Sincronizado",
        };
      default:
        return {
          style: "bg-gray-100 text-gray-700",
          dot: "bg-gray-500",
          label: "Desconocido",
        };
    }
  }, [status]);

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${style}`}
    >
      <span className={`w-2 h-2 rounded-full ${dot}`}></span>
      {label}
    </div>
  );
};

export default ConnectionStatus;
