//@ts-nocheck
import EmployeeService from "../services/employee.service.js";

class EmployeeController {
    async getAll(req, res) {
        try {
            // Verifica si se quiere incluir relaciones desde query ?includeRelations=true
            const includeRelations = req.query.includeRelations === "true";

            const employees = await EmployeeService.getAllEmployees(req, includeRelations);
            res.status(200).json(employees);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const employee = await EmployeeService.createEmployee(req.body);
            res.status(201).json(employee);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const employee = await EmployeeService.getEmployeeById(req.params.id, req.query.includeRelations === "true");
            res.status(200).json(employee);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
            res.status(200).json(employee);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await EmployeeService.deleteEmployee(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new EmployeeController();
