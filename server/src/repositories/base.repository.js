//@ts-nocheck
export class BaseRepository {
    /**
     * 
     * @param {import('sequelize').Model} model 
     */
    constructor(model) {
      this.model = model;
    }   
    
    async findAll({ where = {}, limit = 10, offset = 0, include = [] } = {}) {
      return this.model.findAll({ where, limit, offset, include });
    }   
    
    async count(where = {}) {
      return this.model.count({ where });
    }   
    
    async findById(id, include = []) {
      return this.model.findByPk(id, { include });
    }   
    
    async create(data) {
      return this.model.create(data);
    }   
    
    async update(id, data) {
      const record = await this.model.findByPk(id);
      if (!record) return null;
      return record.update(data);
    }   
    
    async delete(id) {
      const record = await this.model.findByPk(id);
      if (!record) return null;
      await record.destroy();
      return true;
    }
}
