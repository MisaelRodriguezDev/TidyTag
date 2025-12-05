//@ts-nocheck
import BaseRepository from "./base.repository.js";
import Category from "../models/category.model.js";
import Company from "../models/company.model.js";
import Product from "../models/product.model.js";

class CategoryRepository extends BaseRepository {
    constructor() {
        super(Category);
    }

    async findByIdWithRelations(id) {
        return this.findById(id, { include: [{ model: Company, as: "company" }, { model: Product, as: "products" }] });
    }
}

export default new CategoryRepository();
