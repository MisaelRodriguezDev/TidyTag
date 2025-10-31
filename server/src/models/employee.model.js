import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const Employee = sequelize.define("Employee", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false
    }
})

export default Employee