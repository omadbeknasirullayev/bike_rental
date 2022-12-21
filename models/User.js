const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING(300)},
    fullname: {type: DataTypes.STRING},
    contact: {type: DataTypes.STRING(15)},
    email: {type: DataTypes.STRING(100), unique: true},
    user_category_id: {type: DataTypes.INTEGER},
    status: {type: DataTypes.BOOLEAN},
    tokens: {type: DataTypes.STRING(500)}
}, {freezeTableName: true})

module.exports = User