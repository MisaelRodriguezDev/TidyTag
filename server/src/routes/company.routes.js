import {Router} from "express"
import validateSchema from "../middleware/validateSchema.middleware.js"
import { CompanySchema, CompanySchemaUpdate } from "../schemas/company.schema.js"
import companyController from "../controllers/company.controller.js"

const router = Router()

router
    .post("/companies", validateSchema(CompanySchema), companyController.create)
    .get("/companies/:id", companyController.getById)
    .patch("/companies/:id", validateSchema(CompanySchemaUpdate), companyController.update)
    .delete("/companies/:id", companyController.delete)

export default router