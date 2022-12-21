const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const Client = sequelize.define("client", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    client_code: {type: DataTypes.STRING(100)},
    avatar: {type: DataTypes.STRING},
    client_name: {type: DataTypes.STRING(30)},
    email_address: {type: DataTypes.STRING},
    contact_number: {type: DataTypes.STRING(15)},
    complete_address: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING(30)},
    password: {type: DataTypes.STRING(100)},
    status: {type: DataTypes.BOOLEAN, defaultValue: false},



}, {freezeTableName: true})

module.exports = Client