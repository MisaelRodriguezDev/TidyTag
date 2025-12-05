//@ts-nocheck
import SubscriptionRepository from "../repositories/subscription.repository.js";

class SubscriptionService {
    async createSubscription(data) {
        try {
            return await SubscriptionRepository.create(data);
        } catch (error) {
            throw new Error(`No se pudo crear el usuario: ${error.message}`);
        }
    }

    async getSubscriptionById(id, includeRelations = false) {
        try {
            if (includeRelations) {
                return await SubscriptionRepository.findByIdWithRelations(id);
            }
            return await SubscriptionRepository.findById(id);
        } catch (error) {
            throw new Error(`No se pudo obtener el usuario: ${error.message}`);
        }
    }

    async updateSubscription(id, data) {
        try {
            return await SubscriptionRepository.update(id, data);
        } catch (error) {
            throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
        }
    }

    async deleteSubscription(id) {
        try {
            return await SubscriptionRepository.delete(id);
        } catch (error) {
            throw new Error(`No se pudo eliminar el usuario: ${error.message}`);
        }
    }
}

export default new SubscriptionService();
