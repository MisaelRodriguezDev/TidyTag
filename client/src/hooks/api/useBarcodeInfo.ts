import { useQuery } from "@tanstack/react-query";
import getProductDataByBarcode from "../../services/barcode.service";

export const useBarcodeInfo = (barcode: string) => {
  return useQuery({
    queryKey: ['productByBarcode', barcode], // array con identificador y argumento
    queryFn: () => getProductDataByBarcode(barcode) // función que recibe el argumento
  });
}
