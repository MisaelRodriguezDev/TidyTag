import {Router} from "express"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { PlanSchema, PlanSchemaUpdate } from "../schemas/plan.schema.js"
import planController from "../controllers/plan.controller.js"

const router = Router()

router
    .post("/plan", validateSchema(PlanSchema), planController.create)
    .get("/plan/:id", planController.getById)
    .patch("/plan/:id", validateSchema(PlanSchemaUpdate), planController.update)
    .delete("/plan/:id", planController.delete)

export default router