import User from "./user.model.js";
import Company from "./company.model.js";
import Category from "./category.model.js";
import Product from "./product.model.js";
import Employee from "./employee.model.js";
import Plan from "./plan.model.js";
import Subscription from "./subscription.model.js";
import Settings from "./settings.model.js";

// --------------------
// Company ↔ Category
// --------------------
Company.hasMany(Category, { foreignKey: 'companyId', as: 'categories' });
Category.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

// --------------------
// Company ↔ Employee
// --------------------
Company.hasMany(Employee, { foreignKey: 'companyId', as: 'employees' });
Employee.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

// --------------------
// Company ↔ Product
// --------------------
Company.hasMany(Product, { foreignKey: 'companyId', as: 'products' });
Product.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

//Company-> Settings
Company.hasOne(Settings, { foreignKey: 'companyId', as: 'settings' });
Settings.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

// --------------------
// User ↔ Company (propietario)
// --------------------
User.hasMany(Company, { foreignKey: 'ownerId', as: 'ownedCompanies' });
Company.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

// --------------------
// Category ↔ Product
// --------------------
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// --------------------
// Plan ↔ Subscription
// --------------------
Plan.hasMany(Subscription, { foreignKey: 'planId', as: 'subscriptions' });
Subscription.belongsTo(Plan, { foreignKey: 'planId', as: 'plan' });

// --------------------
// Company ↔ Subscription
// Cada compañía solo puede tener una suscripción activa
// --------------------
Company.hasOne(Subscription, { foreignKey: 'companyId', as: 'subscription' });
Subscription.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

// --------------------
// User ↔ Subscription
// Cada usuario puede tener una suscripción que se aplica a su compañía
// --------------------
User.hasOne(Subscription, { foreignKey: 'userId', as: 'subscription' });
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });
