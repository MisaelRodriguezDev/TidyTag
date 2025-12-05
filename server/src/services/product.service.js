//@ts-nocheck
import ProductRepository from "../repositories/product.repository.js";
import Company from "../models/company.model.js";
import Category from "../models/category.model.js";


class ProductService {
    async getAllProducts(req, includeRelations = false) {
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
                    { model: Category, as: "category" },
                ];
            }

            return await CategoryRepository.findAll(options);
        } catch (error) {
            throw new Error(`No se pudo obtener las categorías: ${error.message}`);
        }
    }

    async createProduct(data) {
        try {
            return await ProductRepository.create(data);
        } catch (error) {
            throw new Error(`No se pudo crear el usuario: ${error.message}`);
        }
    }

    async getProductById(id, includeRelations = false) {
        try {
            if (includeRelations) {
                return await ProductRepository.findByIdWithRelations(id);
            }
            return await ProductRepository.findById(id);
        } catch (error) {
            throw new Error(`No se pudo obtener el usuario: ${error.message}`);
        }
    }

    async updateProduct(id, data) {
        try {
            return await ProductRepository.update(id, data);
        } catch (error) {
            throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            return await ProductRepository.delete(id);
        } catch (error) {
            throw new Error(`No se pudo eliminar el usuario: ${error.message}`);
        }
    }
}

export default new ProductService();
