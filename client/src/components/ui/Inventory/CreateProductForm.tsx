import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, type CreateProductInput } from "../../../schemas/Product";

const CreateProductForm: React.FC<{ onClose: () => void, product?: Partial<CreateProductInput> }> = ({ onClose, product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: product ?? {}
  });

const onSubmit = (data: CreateProductInput) => {
  const items = localStorage.getItem("products");
  const existing = items ? JSON.parse(items) : [];

  const timestamp = new Date().toISOString();

  const updated = [
    ...existing,
    {
      ...data,
      id: Date.now(),
      created_at: timestamp,
      updated_at: timestamp,
    },
  ];

  localStorage.setItem("products", JSON.stringify(updated));
  reset();
  onClose();
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="flex flex-col">
        <span>Nombre:</span>
        <input {...register("name")} className="border p-2 rounded w-full" />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </label>

      <label className="flex flex-col">
        <span>Categoría:</span>
        <input {...register("categoryId")} className="border p-2 rounded w-full" />
        {errors.categoryId && <span className="text-red-500">{errors.categoryId.message}</span>}
      </label>

      <label className="flex flex-col">
        <span>Precio:</span>
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="border p-2 rounded w-full"
        />
        {errors.price && <span className="text-red-500">{errors.price.message}</span>}
      </label>

      <label className="flex flex-col">
        <span>Cantidad:</span>
        <input
          type="number"
          {...register("stock", { valueAsNumber: true })}
          className="border p-2 rounded w-full"
        />
        {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
      </label>

      <label className="flex flex-col">
        <span>Código de barras:</span>
        <input {...register("barcode")} className="border p-2 rounded w-full" />
        {errors.barcode && <span className="text-red-500">{errors.barcode.message}</span>}
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
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default CreateProductForm;
