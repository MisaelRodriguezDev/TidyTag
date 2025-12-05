//@ts-nocheck
import BaseRepository from "./base.repository.js";
import Plan from "../models/plan.model.js";
import Subscription from "../models/subscription.model.js";

class PlanRepository extends BaseRepository {
    constructor() {
        super(Plan);
    }

    async findByIdWithRelations(id) {
        return this.findById(id, { include: [{ model: Subscription, as: "subscriptions" }] });
    }
}

export default new PlanRepository();
