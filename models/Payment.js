const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const Payment = sequelize.define("payment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    rental_id: {type: DataTypes.INTEGER,},
    penalty_amount: {type: DataTypes.FLOAT},
    payment_status: {type: DataTypes.BOOLEAN, defaultValue: false},
    remarks: {type: DataTypes.STRING(100)},
    paid_by: {type: DataTypes.STRING(30)},
    user_id: {type: DataTypes.INTEGER},
}, {freezeTableName: true})

module.exports = Payment