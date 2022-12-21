const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const ShopInfo = sequelize.define("shopinfo", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    shop_name: {type: DataTypes.STRING, unique: true},
    owner_name: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING(500)},
    email_address: {type: DataTypes.STRING},
    contact_no: {type: DataTypes.STRING(15)},
    website: {type: DataTypes.STRING(100)},
    updated_by: {type: DataTypes.INTEGER},
}, {freezeTableName: true})

module.exports = ShopInfo