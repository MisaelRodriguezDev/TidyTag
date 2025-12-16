//@ts-nocheck
import cors from "cors"; // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
import env from "../config/env.config.js"


/**
 * @module Middleware/Cors
 */

/**
 * Constante que contendrá los sitios que pueden interactuar con el backend.
 */
//@ts-ignore
const ALLOWED_ORIGINS =  env.ALLOWED_ORIGINS.split(","); // "*," -- desarrollo 

/**
 * Configuración de CORS (Intercambio de Recursos de Origen Cruzado).
 * Esta configuración se utiliza para controlar los orígenes permitidos en las solicitudes HTTP 
 * y especificar los métodos y cabeceras permitidas para acceder a los recursos del servidor.
 * 
 * @type {Object}
 * @property {Function} origin - Función que valida si un origen es permitido. Si el origen es nulo y el entorno es "desarrollo", permite la solicitud sin origen. 
 *   Si el origen no está en la lista de orígenes permitidos, se devuelve un error.
 * @param {string} origin - El origen de la solicitud (generalmente, el dominio que realiza la solicitud).
 * @param {Function} callback - Función de retorno que se usa para continuar con la validación del origen.
 * 
 * @property {Array} methods - Métodos HTTP permitidos. En este caso, se permiten las solicitudes GET, POST, PUT y DELETE.
 * 
 * @property {Array} allowedHeaders - Cabeceras permitidas en las solicitudes. En este caso, "Content-Type" y "Authorization".
 * 
 * @property {boolean} credentials - Indica si se deben incluir las credenciales (cookies, encabezados de autorización) en las solicitudes CORS.
 */
export const corsOptions = {
    origin: (origin, callback) => {
        if (!origin && env.NODE_ENV === "development" || ALLOWED_ORIGINS.includes("*")) return callback(null, true); // Permitir solicitudes sin origen
        if (!ALLOWED_ORIGINS.includes(origin)) {
            return callback(new Error("Origen no permitido por CORS")); // Origen denegado
        }
        return callback(null, true); // Origen permitido
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

const corsMiddleware = cors(corsOptions)

export default corsMiddleware