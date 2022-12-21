const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const BikeCategory = sequelize.define("bike_category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    category_name: {type: DataTypes.STRING(30)},
    description: {type: DataTypes.STRING(100)},

}, {freezeTableName: true, timestamps: false})

module.exports = BikeCategory