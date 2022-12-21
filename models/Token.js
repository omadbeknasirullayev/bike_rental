const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const Token = sequelize.define("token", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    user_id: {type: DataTypes.INTEGER},
    os: {type: DataTypes.STRING},
    device: {type: DataTypes.STRING},
    token: {type: DataTypes.STRING(500)}
}, {freezeTableName: true})

module.exports = Token