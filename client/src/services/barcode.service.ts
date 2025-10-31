import axios from "axios";
import { productByBarcodeSchema, type ProductByBarcode } from "../schemas/Barcode";

export default async function getProductDataByBarcode(barcode: string): Promise<ProductByBarcode> {
  try {
    const { data } = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);

    const product = data?.product;

    const info: ProductByBarcode = {
      name: product?.product_name ?? '',
      category: product?.categories ? product.categories.split(",")[0].trim() : '',
      barcode: data?.code ?? barcode,
    };

    return productByBarcodeSchema.parse(info);
  } catch (error) {
    console.error("Error al obtener datos del producto:", error);

    // Retorna info por defecto si hay cualquier error
    const fallback: ProductByBarcode = {
      name: '',
      category: '',
      barcode,
    };
    return productByBarcodeSchema.parse(fallback);
  }
}
