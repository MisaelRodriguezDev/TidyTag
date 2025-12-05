import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false
    },
});

export default Category;