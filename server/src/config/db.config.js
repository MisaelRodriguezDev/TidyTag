import { Sequelize } from "sequelize";
import env from "./env.config.js"

// Cargar las variables de entorno desde el archivo .env

/**
 * @module Config/db
 */

/**
 * Opciones de configuración para la conexión a la base de datos.
 * @typedef {Object} SequelizeOptions
 * @property {string} host - El host de la base de datos (ej. localhost).
 * @property {number} port - El puerto del servidor de base de datos (ej. 5432 para PostgreSQL).
 * @property {string} dialect - El dialecto de la base de datos (ej. 'postgres', 'mysql').
 * @property {Object} define - Configuración adicional para las tablas.
 * @property {boolean} define.freezeTableName - Si se debe evitar que Sequelize modifique el nombre de las tablas.
 * @property {boolean} define.timestamps - Si se deben omitir los campos de marca de tiempo automáticos como `createdAt` y `updatedAt`.
 * @property {Object} pool - Configuración del pool de conexiones.
 * @property {number} pool.max - El número máximo de conexiones en el pool.
 * @property {number} pool.min - El número mínimo de conexiones en el pool.
 * @property {number} pool.idle - El tiempo en milisegundos antes de que se cierre una conexión inactiva.
 * @property {Object} dialectOptions - Opciones específicas para el dialecto de la base de datos.
 * @property {boolean} dialectOptions.useUTC - Si se debe usar UTC para las fechas y horas.
 * @property {Object} dialectOptions.ssl - ssl
 * @property {string} timezone - La zona horaria utilizada en la conexión a la base de datos.
 */

/**
 * Opciones para configurar la conexión a la base de datos con Sequelize.
 * @type {SequelizeOptions}
 */
const OPTIONS = {
    //@ts-ignore
    host: env.DB_HOST, // Host de la base de datos (ej. localhost)
    //@ts-ignore
    port: env.DB_PORT, // Puerto del servidor de base de datos (ej. 5432)
    //@ts-ignore
    dialect: env.DB_DIALECT, // Dialecto de la base de datos (ej. 'postgres', 'mysql')
    define: {
        freezeTableName: true, // Evita que Sequelize cambie los nombres de las tablas automáticamente
        timestamps: true // Se crearán automáticamente los campos createdAt y updatedAt
    },
    pool: {
        max: 10, // Número máximo de conexiones en el pool
        min: 0, // Número mínimo de conexiones en el pool
        idle: 60 * 60 * 1000 // Tiempo en milisegundos antes de que se cierre una conexión inactiva
    },
    dialectOptions: {
        useUTC: false, // No usar UTC para fechas y horas
        ssl: {
            require: true,
            rejectUnauthorized: false,  // Tried both true and false here
      },
    },
    timezone: "-06:00" // Zona horaria para la conexión (ej. UTC-6), hora México
}

/**
 * Instancia de Sequelize para conectar a la base de datos.
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
    env.DB_NAME, // Nombre de la base de datos
    env.DB_USERNAME, // Usuario de la base de datos
    env.DB_PASSWORD, // Contraseña de la base de datos
    //@ts-ignore
    OPTIONS // Opciones de configuración para Sequelize
)

export default sequelize