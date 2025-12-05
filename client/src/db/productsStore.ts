import { db } from "./indexedDB";
import type { Product } from "../schemas/Product";

export const saveProductLocal = (product: Product) =>
  db.put("products", product);

export const deleteProductLocal = (id: string) =>
  db.delete("products", id);

export const getAllProductsLocal = () =>
  db.getAll("products");
