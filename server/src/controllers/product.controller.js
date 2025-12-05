//@ts-nocheck
import ProductService from "../services/product.service.js";

class ProductController {
    async getAll(req, res) {
        try {
            // Verifica si se quiere incluir relaciones desde query ?includeRelations=true
            const includeRelations = req.query.includeRelations === "true";

            const products = await ProductService.getAllProducts(req, includeRelations);
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const product = await ProductService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const product = await ProductService.getProductById(req.params.id, req.query.includeRelations === "true");
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const product = await ProductService.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await ProductService.deleteProduct(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new ProductController();
