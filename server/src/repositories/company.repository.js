//@ts-nocheck
import BaseRepository from "./base.repository.js";
import Company from "../models/company.model.js";
import Employee from "../models/employee.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import Subscription from "../models/subscription.model.js";

class CompanyRepository extends BaseRepository {
    constructor() {
        super(Company);
    }

    async findByIdWithRelations(id) {
        return this.findById(id, {
            include: [
                { model: Employee, as: "employees" },
                { model: Product, as: "products" },
                { model: Category, as: "categories" },
                { model: Subscription, as: "subscription", include: ["plan"] },
            ],
        });
    }
}

export default new CompanyRepository();
