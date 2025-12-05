//@ts-nocheck
import CategoryRepository from "../repositories/category.repository.js";
import Company from "../models/company.model.js";
import Product from "../models/product.model.js";


class CategoryService {
async getAllCategories(req, includeRelations = false) {
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
                { model: Product, as: "products" },
            ];
        }

        return await CategoryRepository.findAll(options);
    } catch (error) {
        throw new Error(`No se pudo obtener las categorías: ${error.message}`);
    }
}

    async createCategory(data) {
        try {
            return await CategoryRepository.create(data);
        } catch (error) {
            throw new Error(`No se pudo crear la categoria: ${error.message}`);
        }
    }

    async getCategoryById(id, includeRelations = false) {
        try {
            if (includeRelations) {
                return await CategoryRepository.findByIdWithRelations(id);
            }
            return await CategoryRepository.findById(id);
        } catch (error) {
            throw new Error(`No se pudo obtener la categoria: ${error.message}`);
        }
    }

    async updateCategory(id, data) {
        try {
            return await CategoryRepository.update(id, data);
        } catch (error) {
            throw new Error(`No se pudo actualizar la categoria: ${error.message}`);
        }
    }

    async deleteCategory(id) {
        try {
            return await CategoryRepository.delete(id);
        } catch (error) {
            throw new Error(`No se pudo eliminar la categoria: ${error.message}`);
        }
    }
}

export default new CategoryService();
