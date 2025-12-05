//@ts-nocheck
import BaseRepository from "./base.repository.js";
import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import Subscription from "../models/subscription.model.js";

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByIdWithRelations(id) {
        return this.findById(id, {
            include: [
                { model: Company, as: "ownedCompanies", include: [{ model: Subscription, as: "subscription" }] },
                { model: Subscription, as: "subscription", include: ["plan", "company"] },
            ],
        });
    }
}

export default new UserRepository();
