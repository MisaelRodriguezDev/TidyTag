//@ts-nocheck

// repositories/BaseRepository.js
class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            throw new Error(error.message || "Error creando el registro.");
        }
    }

    async findAll(options = {}) {
        try {
            const results = await this.model.findAll(options);
            return results;
        } catch (error) {
            throw new Error(error.message || "Error obteniendo registros.");
        }
    }

    async findById(id, options = {}) {
        try {
            const result = await this.model.findByPk(id, options);
            if (!result) throw new Error("Registro no encontrado.");
            return result;
        } catch (error) {
            throw new Error(error.message || "Error obteniendo registro.");
        }
    }

    async update(id, data) {
        try {
            const record = await this.findById(id);
            await record.update(data);
            return record;
        } catch (error) {
            throw new Error(error.message || "Error actualizando registro.");
        }
    }

    async delete(id) {
        try {
            const record = await this.findById(id);
            await record.destroy();
            return { message: "Registro eliminado correctamente." };
        } catch (error) {
            throw new Error(error.message || "Error eliminando registro.");
        }
    }
}

export default BaseRepository;
