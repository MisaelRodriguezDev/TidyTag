import { AppError } from '../errors/index.js';

/**
 * @module Middleware/Error
 */

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Middleware para el manejo centralizado de errores en la aplicación.
 *
 * Este middleware captura errores lanzados en las rutas o controladores y
 * envía una respuesta apropiada al cliente dependiendo del entorno de ejecución.
 *
 * @param {AppError} err - El error lanzado.
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @param {NextFunction} next - La función para pasar al siguiente middleware.
 */
const errorMiddleware = (err, req, res, next) => {
    // Determina el código de estado (por defecto 500 si no se proporciona).
    const statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === "production") {
        // Producción: Respuesta simplificada para errores operativos conocidos.
        if (err.isOperational) {
            return res.status(statusCode).json({
                status: statusCode,
                message: err.message,
            });
        }

        // Para errores no operativos, loggea el error y envía una respuesta genérica.
        console.error("ERROR: ", err);
        return res.status(500).json({
            status: 500,
            message: "Error interno del servidor",
        });
    } else {
        // Entorno de desarrollo: Respuesta más detallada con información del stack.
        console.error("ERROR: ", err);
        return res.status(statusCode).json({
            status: statusCode,
            message: err.message,
            stack: err.stack,
        });
    }
};

export default errorMiddleware;