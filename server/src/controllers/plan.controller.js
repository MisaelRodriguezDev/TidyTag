//@ts-nocheck
import PlanService from "../services/plan.service.js";

class PlanController {
    async create(req, res) {
        try {
            const plan = await PlanService.createPlan(req.body);
            res.status(201).json(plan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const plan = await PlanService.getPlanById(req.params.id, req.query.includeRelations === "true");
            res.status(200).json(plan);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const plan = await PlanService.updatePlan(req.params.id, req.body);
            res.status(200).json(plan);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await PlanService.deletePlan(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PlanController();
