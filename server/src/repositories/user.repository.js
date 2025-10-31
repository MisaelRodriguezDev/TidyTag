import User from "../models/user.model"
import { BaseRepository } from "./base.repository"

class UserRepository extends BaseRepository {
    constructor () {
        super(User)
    }

    getByEmail(email) {
        this.model
    }
}