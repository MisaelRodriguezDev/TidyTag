//@ts-nocheck
import CategoryService from "../services/category.service.js";

class CategoryController {
    async getAll(req, res) {
        try {
            // Verifica si se quiere incluir relaciones desde query ?includeRelations=true
            const includeRelations = req.query.includeRelations === "true";

            const categories = await CategoryService.getAllCategories(req, includeRelations);
            res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
    async create(req, res) {
        try {
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id, req.query.includeRelations === "true");
            res.status(200).json(category);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const category = await CategoryService.updateCategory(req.params.id, req.body);
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await CategoryService.deleteCategory(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new CategoryController();