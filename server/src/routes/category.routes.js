import {Router} from "express"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { CategorySchema, CategorySchemaUpdate } from "../schemas/category.schema.js"
import categoryController from "../controllers/category.controller.js"

const router = Router()

router
    .get("/categories", categoryController.getAll)
    .post("/categories", validateSchema(CategorySchema), categoryController.create)
    .get("/categories/:id", categoryController.getById)
    .patch("/categories/:id", validateSchema(CategorySchemaUpdate), categoryController.update)
    .delete("/categories/:id", categoryController.delete)

export default router