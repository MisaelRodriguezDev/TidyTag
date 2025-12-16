import {DataTypes} from 'sequelize'
import sequelize from '../config/db.config.js'
import User from './user.model.js'
import Product from './product.model.js'
import Company from './company.model.js'

const Transaction = sequelize.define("Transaction", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    action: {
        type: DataTypes.ENUM("sale", "restock", "create", "update", "delete"),
        allowNull: false
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Product, key: "id" }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: User, key: "id" }
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: Company, key: "id" }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }

});

export default Transaction;