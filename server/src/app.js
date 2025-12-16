import express from "express"; // Framework para construir aplicaciones web en Node.js
import cookieParser from "cookie-parser"; // Middleware para analizar cookies
import corsMiddleware from "./middleware/cors.middleware.js"; // Middleeare de cors
import errorMiddleware from "./middleware/errorHandler.middleware.js"; // Middleware para el manejo centralizado de errores
import categoryRoutes from "./routes/category.routes.js"
import companyRoutes from "./routes/company.routes.js"
import employeeRoutes from "./routes/employee.routes.js"
import planRoutes from "./routes/plan.routes.js"
import productRoutes from "./routes/product.routes.js"
import subscriptionRoutes from "./routes/subscription.routes.js"
import userRoutes from "./routes/user.routes.js"


const app = express(); // Crea una instancia de la aplicación Express

// Conjunto de rutas que serán registradas
const routes = [categoryRoutes, companyRoutes, employeeRoutes, planRoutes, productRoutes, subscriptionRoutes, userRoutes];

// Middlewares básicos
app.use(corsMiddleware)
app.use(express.json()); // Analiza cuerpos JSON de las solicitudes entrantes
app.use(express.urlencoded({ extended: false })); // Analiza cuerpos codificados en URL
app.use(cookieParser()); // Habilita el análisis de cookies

app.use("/api/v1/health", (_, res) => {
    res.status(200).json({status: "healthy"})
})

// Registro de rutas en el prefijo "/api/v1"
for (const route of routes) {
    app.use("/api/v1", route);
}


// Registro del middleware de manejo de errores
// @ts-ignore Se ignoran temporalmente los errores de tipado en TypeScript relacionados con el middleware
app.use(errorMiddleware);

export default app; // Exporta la instancia de la aplicación Express para usar en otros archivos