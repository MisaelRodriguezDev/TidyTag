import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import User from "./user.model.js";
import Company from "./company.model.js";
import Plan from ".//plan.model.js";

const Subscription = sequelize.define("Subscription", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: User, key: "id" },
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: { model: Company, key: "id" },
  },
  planId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Plan, key: "id" },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("active", "cancelled", "expired"),
    allowNull: false,
    defaultValue: "active",
  },
});

export default Subscription;
