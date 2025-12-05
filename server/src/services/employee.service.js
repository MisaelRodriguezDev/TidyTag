//@ts-nocheck
import EmployeeRepository from "../repositories/employee.repository.js";
import Company from "../models/company.model.js";


class EmployeeService {
    async getAllEmployees(req, includeRelations = false) {
        try {
            const companyId = req.user?.companyId; // obtenemos companyId desde el token
            if (!companyId) throw new Error("No se encontró la compañía asociada al usuario.");

            // Construir opciones dinámicamente
            const options = {
                where: { companyId },
            };

            if (includeRelations) {
                options.include = [
                    { model: Company, as: "company" },
                ];
            }

            return await CategoryRepository.findAll(options);
        } catch (error) {
            throw new Error(`No se pudo obtener las categorías: ${error.message}`);
        }
    }
    
    async createEmployee(data) {
        try {
            return await EmployeeRepository.create(data);
        } catch (error) {
            throw new Error(`No se pudo crear el usuario: ${error.message}`);
        }
    }

    async getEmployeeById(id, includeRelations = false) {
        try {
            if (includeRelations) {
                return await EmployeeRepository.findByIdWithRelations(id);
            }
            return await EmployeeRepository.findById(id);
        } catch (error) {
            throw new Error(`No se pudo obtener el usuario: ${error.message}`);
        }
    }

    async updateEmployee(id, data) {
        try {
            return await EmployeeRepository.update(id, data);
        } catch (error) {
            throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
        }
    }

    async deleteEmployee(id) {
        try {
            return await EmployeeRepository.delete(id);
        } catch (error) {
            throw new Error(`No se pudo eliminar el usuario: ${error.message}`);
        }
    }
}

export default new EmployeeService();
