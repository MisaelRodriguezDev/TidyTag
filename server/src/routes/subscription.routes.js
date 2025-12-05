import {Router} from "express"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { SubscriptionSchema, SubscriptionSchemaUpdate } from "../schemas/subscription.schema.js"
import subscriptionController from "../controllers/subscription.controller.js"

const router = Router()

router
    .post("/subscription", validateSchema(SubscriptionSchema), subscriptionController.create)
    .get("/subscription/:id", subscriptionController.getById)
    .patch("/subscription/:id", validateSchema(SubscriptionSchemaUpdate), subscriptionController.update)
    .delete("/subscription/:id", subscriptionController.delete)

export default router