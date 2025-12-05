//@ts-nocheck
import BaseRepository from "./base.repository.js";
import Subscription from "../models/subscription.model.js";
import Plan from "../models/plan.model.js";
import User from "../models/user.model.js";
import Company from "../models/company.model.js";

class SubscriptionRepository extends BaseRepository {
    constructor() {
        super(Subscription);
    }

    async findByIdWithRelations(id) {
        return this.findById(id, {
            include: [
                { model: Plan, as: "plan" },
                { model: User, as: "user" },
                { model: Company, as: "company" },
            ],
        });
    }
}

export default new SubscriptionRepository();
