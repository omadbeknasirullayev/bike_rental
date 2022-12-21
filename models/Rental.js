const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const Rental = sequelize.define("rental", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    bike_id: {type: DataTypes.INTEGER, unique: true},
    client_id: {type: DataTypes.INTEGER},
    rental_start_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    rental_end_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    total_amount: {type: DataTypes.FLOAT},
    payment_status: {type: DataTypes.BOOLEAN, defaultValue: false},
    rental_status: {type: DataTypes.BOOLEAN, defaultValue: false},
    remarks: {type: DataTypes.STRING},
    user_id: {type: DataTypes.INTEGER},
}, {freezeTableName: true})

module.exports = Rental