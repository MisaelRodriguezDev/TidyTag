//@ts-nocheck
import CompanyService from "../services/company.service.js";

class CompanyController {
    async create(req, res) {
        try {
            const company = await CompanyService.createCompany(req.body);
            res.status(201).json(company);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const company = await CompanyService.getCompanyById(req.params.id, req.query.includeRelations === "true");
            res.status(200).json(company);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const company = await CompanyService.updateCompany(req.params.id, req.body);
            res.status(200).json(company);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await CompanyService.deleteCompany(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new CompanyController();
