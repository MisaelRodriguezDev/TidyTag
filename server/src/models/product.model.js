import {DataTypes} from 'sequelize'
import sequelize from '../config/db.config.js'

const Product = sequelize.define('Product',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    barcode: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    companyId: {
        type: DataTypes.UUID,
        allowNull: false
    }
})

export default Product;