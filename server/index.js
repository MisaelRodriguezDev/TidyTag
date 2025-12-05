import app from "./src/app.js"; // Importa la instancia de la aplicación Express
import sequelize from "./src/config/db.config.js"; // Importa la configuración de la base de datos Sequelize
import env from "./src/config/env.config.js"

// Carga las variables de entorno definidas en el archivo .env

/**
 * Función principal que inicializa el servidor y establece la conexión con la base de datos.
 * 
 * - Autentica la conexión con la base de datos usando Sequelize.
 * - Sincroniza los modelos definidos con la base de datos.
 * - Inicia el servidor Express en el puerto especificado en las variables de entorno o 3000 por defecto.
 */
async function init() {
    try {
        // Puerto en el que escuchará el servidor
        const port = env.PORT || 3000;

        // Establece la conexión con la base de datos
        await sequelize.authenticate();
        
        // Sincroniza los modelos con la base de datos
        await sequelize.sync();
        
        // Inicia el servidor Express
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
        console.log("Connection has been established successfully.");
    } catch (error) {
        // Maneja errores de conexión o inicialización
        console.error(error)
        throw error
    }
}

// Llama a la función de inicialización
init();