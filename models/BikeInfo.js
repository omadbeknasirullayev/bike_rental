const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const BikeInfo = sequelize.define("bikeinfo", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    bike_category_id: {type: DataTypes.INTEGER},
    shop_id: {type: DataTypes.INTEGER},
    bike_name: {type: DataTypes.STRING(50)},
    specs: {type: DataTypes.STRING(100)},
    rent_price: {type: DataTypes.FLOAT},
    availability: {type: DataTypes.BOOLEAN, defaultValue: true},
    user_id: {type: DataTypes.INTEGER},

}, {freezeTableName: true, timestamps: false})

module.exports = BikeInfo   