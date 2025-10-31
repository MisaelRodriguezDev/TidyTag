import { ValidationError } from "../errors";

/**
 * @module Middleware/ValidateSchema
 */

/**
 * @typedef {import("zod").ZodSchema} Schema
 */

/**
 * Middleware para validar el cuerpo de la solicitud (`req.body`) contra un esquema de validación.
 * @function
 * @param {Schema} schema - El esquema de validación de `Zod`.
 * @returns {import("express").RequestHandler} Middleware Express que valida `req.body` contra el esquema proporcionado.
 */
const validateSchema = (schema) => (req, _, next) => {
    try {
        // Validar y purificar los datos
        const validatedData = schema.parse(req.body);
        
        // Reemplazar el body con los datos validados (por si hay transformaciones)
        req.body = validatedData;
        
        next();
    } catch (error) {
        // Verificar si es un error de Zod con la estructura esperada
        if (error && typeof error === 'object' && 'errors' in error && Array.isArray(error.errors)) {
            const zodError = /** @type {{errors: Array<{message: string}>}} */ (error);
            const errorMessages = zodError.errors
                .map(e => `- ${e.message}`)
                .join("\n");
            next(new ValidationError(`Datos inválidos:\n${errorMessages}`));
        } else {
            // Para errores inesperados
            const errorMessage = error instanceof Error ? error.message : "Error de validación desconocido";
            next(new ValidationError(`Error de validación: ${errorMessage}`));
        }
    }
};

export default validateSchema;