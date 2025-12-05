import {Router} from "express"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { UserSchemaUpdate } from "../schemas/user.schema.js"
import userController from "../controllers/user.controller.js"

const router = Router()

router
    .get("/users/:id", userController.getById)
    .patch("/users/:id", validateSchema(UserSchemaUpdate), userController.update)
    .delete("/users/:id", userController.delete)

export default router