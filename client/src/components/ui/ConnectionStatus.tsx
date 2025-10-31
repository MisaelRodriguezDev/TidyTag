import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = "https://tu-servidor.com/api/health"; // 🔁 cámbialo por tu endpoint

type ConnectionState = "offline" | "connected" | "synced";

const ConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<ConnectionState>("offline");

  const checkConnection = async () => {
    try {
      const response = await axios.get(SERVER_URL, { timeout: 3000 });

      if (response.status === 200) {
        setStatus("synced");
      } else {
        setStatus("connected");
      }
    } catch {
      try {
        await axios.get("https://www.google.com/generate_204", { timeout: 3000 });
        setStatus("connected");
      } catch {
        setStatus("offline");
      }
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStyle = () => {
    switch (status) {
      case "offline":
        return "bg-red-100 text-red-700";
      case "connected":
        return "bg-yellow-100 text-yellow-700";
      case "synced":
        return "bg-green-100 text-green-700";
    }
  };

  const getDotColor = () => {
    switch (status) {
      case "offline":
        return "bg-red-500";
      case "connected":
        return "bg-yellow-500";
      case "synced":
        return "bg-green-500";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "offline":
        return "Sin conexión";
      case "connected":
        return "Conectado";
      case "synced":
        return "Sincronizado";
    }
  };

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${getStyle()}`}
    >
      <span className={`w-2 h-2 rounded-full ${getDotColor()}`}></span>
      {getLabel()}
    </div>
  );
};

export default ConnectionStatus;
