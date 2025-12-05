import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";
import Company from "./company.model";

const Settings = sequelize.define("Settings", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Company, key: "id" },
  },
  lowStock: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  currency: {
    type: DataTypes.CHAR(3)
  }
})

export default Settings;