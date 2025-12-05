//@ts-nocheck
import SubscriptionService from "../services/subscription.service.js";

class SubscriptionController {
    async create(req, res) {
        try {
            const subscription = await SubscriptionService.createSubscription(req.body);
            res.status(201).json(subscription);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const subscription = await SubscriptionService.getSubscriptionById(req.params.id, req.query.includeRelations === "true");
            res.status(200).json(subscription);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const subscription = await SubscriptionService.updateSubscription(req.params.id, req.body);
            res.status(200).json(subscription);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await SubscriptionService.deleteSubscription(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new SubscriptionController();
