// config/index.js
import { config } from "dotenv";
import { z } from "zod";

// Cargar variables de entorno
config();

// Esquema de validación de las variables de entorno
const envSchema = z.object({
    DB_USERNAME: z.string().nonempty("DB_USERNAME es obligatorio"),
    DB_HOST: z.string().nonempty("DB_HOST es obligatorio"),
    DB_PORT: z.coerce.number(),
    DB_PASSWORD: z.string().nonempty("DB_PASSWORD es obligatorio"),
    DB_DIALECT: z.string().nonempty("DB_DIALECT es obligatorio"),
    DB_NAME: z.string().nonempty("DB_NAME es obligatorio"),
    SECRET_KEY: z.string().nonempty("SECRET_KEY es obligatorio"),
    PORT: z.coerce.number().default(3000)
});

// Validar y extraer las variables
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Error de configuración de entorno:");
    console.error(z.treeifyError(_env.error));
    process.exit(1); // termina la app si falta alguna variable
}

// Crear objeto inmutable con las variables validadas
const env = Object.freeze(_env.data);

export default env;
