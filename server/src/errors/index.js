/**
 * @module Errors
 */

/**
 * Clase base para los errores personalizados de la aplicación.
 * @extends Error
 */
export class AppError extends Error {
    /**
     * Crea una instancia de un error personalizado.
     * @param {string} message - El mensaje de error a mostrar.
     * @param {number} statusCode - El código de estado HTTP asociado al error.
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;  // Indica que el error es conocido (es manejable)
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error de validación de datos.
 * Se utiliza cuando los datos proporcionados no son válidos.
 * 
 * @extends AppError
 */
export class ValidationError extends AppError {
    /**
     * Crea una instancia de un error de validación.
     * 
     * El mensaje predeterminado es "Datos inválidos" y el código de estado es 400.
     * 
     * @param {string} [message] - El mensaje del error.
     */
    constructor(message = "Datos inválidos") {
        super(message, 400); // Código 400 para errores de validación
    }
}

/**
 * Error de autenticación.
 * Se utiliza cuando un usuario no está autorizado para realizar una acción.
 * 
 * @extends AppError
 */
export class AuthError extends AppError {
    /**
     * Crea una instancia de un error de autenticación.
     * 
     * El mensaje predeterminado es "No autorizado" y el código de estado es 401.
     * 
     * @param {string} [message] - El mensaje del error.
     */
    constructor(message = "No autorizado") {
        super(message, 401); // Código 401 para errores de autenticación
    }
}

/**
 * Error de recurso no encontrado.
 * Se utiliza cuando no se encuentra un recurso solicitado.
 * 
 * @extends AppError
 */
export class NotFoundError extends AppError {
    /**
     * Crea una instancia de un error de recurso no encontrado.
     * 
     * El mensaje predeterminado es "Recurso no encontrado" y el código de estado es 404.
     * 
     * @param {string} [message] - El mensaje del error.
     */
    constructor(message = "Recurso no encontrado") {
        super(message, 404); // Código 404 para recursos no encontrados
    }
}

/**
 * Error de base de datos.
 * Se utiliza cuando ocurre un error relacionado con la base de datos.
 * 
 * @extends AppError
 */
export class DatabaseError extends AppError {
    /**
     * Crea una instancia de un error de base de datos.
     * 
     * El mensaje predeterminado es "Error de base de datos" y el código de estado es 500.
     * 
     * @param {string} [message] - El mensaje del error.
     */
    constructor(message = "Error de base de datos") {
        super(message, 500); // Código 500 para errores del servidor
    }
}