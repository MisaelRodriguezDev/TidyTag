//@ts-nocheck
import CompanyRepository from "../repositories/company.repository.js";

class CompanyService {
    async createCompany(data) {
        try {
            return await CompanyRepository.create(data);
        } catch (error) {
            throw new Error(`No se pudo crear el usuario: ${error.message}`);
        }
    }

    async getCompanyById(id, includeRelations = false) {
        try {
            if (includeRelations) {
                return await CompanyRepository.findByIdWithRelations(id);
            }
            return await CompanyRepository.findById(id);
        } catch (error) {
            throw new Error(`No se pudo obtener el usuario: ${error.message}`);
        }
    }

    async updateCompany(id, data) {
        try {
            return await CompanyRepository.update(id, data);
        } catch (error) {
            throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
        }
    }

    async deleteCompany(id) {
        try {
            return await CompanyRepository.delete(id);
        } catch (error) {
            throw new Error(`No se pudo eliminar el usuario: ${error.message}`);
        }
    }
}

export default new CompanyService();
