import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Plan = sequelize.define("Plan", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxUsers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxBusinesses: {
    type: DataTypes.INTEGER,
    allowNull: true, // null significa ilimitado
  },
  maxProducts: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

export default Plan;
