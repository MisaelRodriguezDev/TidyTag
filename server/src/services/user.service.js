//@ts-nocheck
import UserRepository from "../repositories/user.repository.js";

class UserService {
    async createUser(data) {
        try {
            return await UserRepository.create(data);
        } catch (error) {
            throw new Error(`No se pudo crear el usuario: ${error.message}`);
        }
    }

    async getUserById(id, includeRelations = false) {
        try {
            if (includeRelations) {
                return await UserRepository.findByIdWithRelations(id);
            }
            return await UserRepository.findById(id);
        } catch (error) {
            throw new Error(`No se pudo obtener el usuario: ${error.message}`);
        }
    }

    async updateUser(id, data) {
        try {
            return await UserRepository.update(id, data);
        } catch (error) {
            throw new Error(`No se pudo actualizar el usuario: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            return await UserRepository.delete(id);
        } catch (error) {
            throw new Error(`No se pudo eliminar el usuario: ${error.message}`);
        }
    }
}

export default new UserService();
