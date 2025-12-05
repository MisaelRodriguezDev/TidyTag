import {Router} from "express"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { ProductSchema, ProductSchemaUpdate } from "../schemas/product.schema.js"
import productController from "../controllers/product.controller.js"

const router = Router()

router
    .get("/products", productController.getAll)
    .post("/products", validateSchema(ProductSchema), productController.create)
    .get("/products/:id", productController.getById)
    .patch("/products/:id", validateSchema(ProductSchemaUpdate), productController.update)
    .delete("/products/:id", productController.delete)

export default router