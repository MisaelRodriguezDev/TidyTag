import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(13),
        allowNull: false,
    },
    ownerId: {
        type: DataTypes.UUID,
        allowNull: false
    }
    
})

export default Company;