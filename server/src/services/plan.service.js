//@ts-nocheck
import PlanRepository from "../repositories/plan.repository.js";

class PlanService {
    async createPlan(data) {
        try {
            return await PlanRepository.create(data);
        } catch (error) {
            throw new Error(`No se pudo crear el usuario: ${error.message}`);
        }
    }

    async getPlanById(id, includeRelations = false) {
        try {
            if (includeRelations) {
                return await PlanRepository.findByIdWithRelations(id);
            }
            return await PlanRepository.findById(id);
        } catch (error) {
            throw new Error(`No se pudo obtener el usuario: ${error.message}`);
        }
    }

    async updatePlan(id, data) {
        try {
            return await PlanRepository.update(id, data);
        } catch (error) {
            throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
        }
    }

    async deletePlan(id) {
        try {
            return await PlanRepository.delete(id);
        } catch (error) {
            throw new Error(`No se pudo eliminar el usuario: ${error.message}`);
        }
    }
}

export default new PlanService();
