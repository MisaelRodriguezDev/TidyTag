//@ts-nocheck
import BaseRepository from "./base.repository.js";
import Employee from "../models/employee.model.js";
import Company from "../models/company.model.js";

class EmployeeRepository extends BaseRepository {
    constructor() {
        super(Employee);
    }

    async findByIdWithRelations(id) {
        return this.findById(id, { include: [{ model: Company, as: "company" }] });
    }
}

export default new EmployeeRepository();
