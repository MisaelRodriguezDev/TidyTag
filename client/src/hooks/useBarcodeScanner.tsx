// useBarcodeReader.ts
import { useState, useCallback } from 'react';

interface UseBarcodeReaderProps {
  onScan: (barcode: string) => void;
  onError?: (error: string) => void;
}

export const useBarcodeReader = ({ onScan, onError }: UseBarcodeReaderProps) => {
  const [lastScanned, setLastScanned] = useState<string>('');
  const [scanHistory, setScanHistory] = useState<string[]>([]);

  const handleScan = useCallback((barcode: string) => {
    console.log('Código escaneado:', barcode);
    setLastScanned(barcode);
    setScanHistory(prev => [barcode, ...prev.slice(0, 9)]); // Mantener solo los últimos 10
    onScan(barcode);
  }, [onScan]);

  const handleError = useCallback((error: string) => {
    console.error('Error en escáner:', error);
    onError?.(error);
  }, [onError]);

  const clearHistory = useCallback(() => {
    setScanHistory([]);
    setLastScanned('');
  }, []);

  return {
    lastScanned,
    scanHistory,
    handleScan,
    handleError,
    clearHistory,
  };
};