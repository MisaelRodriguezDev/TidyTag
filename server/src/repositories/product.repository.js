//@ts-nocheck
import BaseRepository from "./base.repository.js";
import Product from "../models/product.model.js";
import Company from "../models/company.model.js";
import Category from "../models/category.model.js";

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }
    

    async findByIdWithRelations(id) {
        return this.findById(id, { include: [{ model: Company, as: "company" }, { model: Category, as: "category" }] });
    }
}

export default new ProductRepository();
