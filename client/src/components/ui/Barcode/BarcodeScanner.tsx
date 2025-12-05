import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, type Html5QrcodeCameraScanConfig } from "html5-qrcode";

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  onError?: (error: string) => void;
  onClose?: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  onError,
  onClose,
}) => {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerId = "barcode-scanner-container";

  useEffect(() => {
    // Obtener cámaras disponibles al montar
    Html5Qrcode.getCameras()
      .then((cams) => {
        if (cams?.length) {
          const camList = cams.map((c) => ({
            id: c.id,
            label: c.label || c.id,
          }));
          setCameras(camList);
          setSelectedCamera(camList[0].id);
        } else {
          onError?.("No se encontró cámara disponible");
        }
      })
      .catch((err) => onError?.(err.message));

    // ✅ Limpieza segura al desmontar (evita pantalla en blanco)
    return () => {
      const stopAndClear = async () => {
        try {
          if (scannerRef.current) {
            await scannerRef.current.stop();
            await scannerRef.current.clear();
          }
        } catch {
          // Ignorar errores de cierre
        } finally {
          scannerRef.current = null;
          setScanning(false);
          onClose?.(); // Notificar cierre
        }
      };
      stopAndClear();
    };
  }, []);

  const startScanning = async () => {
    if (!selectedCamera) {
      onError?.("No se ha seleccionado cámara");
      return;
    }
    try {
      scannerRef.current = new Html5Qrcode(containerId);
      setScanning(true);

      const config: Html5QrcodeCameraScanConfig = {
        fps: 5,
        qrbox: 250,
      };

      await scannerRef.current.start(
        selectedCamera,
        config,
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        (errorMessage) => {
          onError?.(errorMessage);
        }
      );
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Error en el escaneo";
      onError?.(errorMsg);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current
        .stop()
        .finally(() => {
          scannerRef.current?.clear();
          setScanning(false);
        })
        .catch(() => {});
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim() === "") return;
    onScan(manualCode.trim());
    setManualCode("");
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
      {/* Selector de cámara */}
      {cameras.length > 1 && (
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <label className="text-gray-700 font-medium text-lg">
            Seleccionar cámara:
          </label>
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {cameras.map((cam) => (
              <option key={cam.id} value={cam.id}>
                {cam.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Botones escaneo */}
      <div className="flex justify-center gap-2 flex-wrap">
        {!scanning ? (
          <button
            onClick={startScanning}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Escanear código
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className="bg-gray-400 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Detener escaneo
          </button>
        )}
      </div>

      {/* Contenedor del scanner */}
      <div
        id={containerId}
        className="w-full h-50 sm:h-80 md:h-96 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
      />

      {/* Entrada manual */}
      <form onSubmit={handleManualSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Ingresar código manualmente"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition text-lg"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default BarcodeScanner;
