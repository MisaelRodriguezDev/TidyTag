import {Router} from "express"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { EmployeeSchema, EmployeeSchemaUpdate } from "../schemas/employee.schema.js"
import employeeController from "../controllers/employee.controller.js"

const router = Router()

router
    .get("/employees", employeeController.getAll)
    .post("/employees", validateSchema(EmployeeSchema), employeeController.create)
    .get("/employees/:id", employeeController.getById)
    .patch("/employees/:id", validateSchema(EmployeeSchemaUpdate), employeeController.update)
    .delete("/employees/:id", employeeController.delete)

export default router