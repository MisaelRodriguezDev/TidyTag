import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProductSchema,
  type UpdateProductInput,
} from "../../../schemas/Product";
import type Product from "../../../types/Product";

interface UpdateProductFormProps {
  product: Product; // 👈 Pasamos el producto seleccionado
  onClose: () => void;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  product,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProductInput>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: product, // 👈 Establecemos los valores iniciales
  });

  // 👇 Si el producto cambia, actualizamos los valores del formulario
  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const onSubmit = (data: UpdateProductInput) => {
    const items = localStorage.getItem("products");
    if (!items) return;

    let products: Product[] = [];

    try {
      products = JSON.parse(items);
    } catch (error) {
      console.error("Error al parsear productos:", error);
      return;
    }

    const updatedProducts = products.map((p) => {
      if (p.barcode === data.barcode) {
        return {
          ...p,
          ...Object.fromEntries(
            Object.entries(data).filter(
              ([key, value]) =>
                value !== undefined && p[key as keyof Product] !== value
            )
          ),
        };
      }
      return p;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="flex flex-col">
        <span>Nombre:</span>
        <input {...register("name")} className="border p-2 rounded w-full" />
      </label>

      <label className="flex flex-col">
        <span>Categoría:</span>
        <input {...register("category")} className="border p-2 rounded w-full" />
      </label>

      <label className="flex flex-col">
        <span>Precio:</span>
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="flex flex-col">
        <span>Cantidad:</span>
        <input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="flex flex-col">
        <span>Código de barras (obligatorio):</span>
        <input
          {...register("barcode")}
          className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
          readOnly // 👈 No queremos que se cambie el código
        />
        {errors.barcode && (
          <span className="text-red-500">{errors.barcode.message}</span>
        )}
      </label>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-md transition"
        >
          Actualizar
        </button>
      </div>
    </form>
  );
};

export default UpdateProductForm;
