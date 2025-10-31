import User from "./user.model";
import Company from "./company.model";
import Category from "./category.model";
import Product from "./product.model";
import Employee from "./employee.model";

Company.hasMany(Category, { foreignKey: 'companyId', as: 'company' })
Category.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

Company.hasMany(Employee, { foreignKey: 'companyId', as: 'company' })
Employee.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

Company.hasMany(Category, { foreignKey: 'companyId', as: 'company' })
Category.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

Company.hasMany(Product, { foreignKey: 'companyId', as: 'company' })
Product.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

User.hasMany(Company, { foreignKey: 'ownerId', as: 'owner' })
Company.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' })

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'category' })
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' })