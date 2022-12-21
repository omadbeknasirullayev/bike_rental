const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const AdsManagment = sequelize.define("adsmanagment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },

    ad_name: {type: DataTypes.STRING},
    shop_id: {type: DataTypes.INTEGER, allowNull: false},
    banner_image: {type: DataTypes.STRING(200)},
    description: {type: DataTypes.STRING},
    start_date: {type: DataTypes.DATE},
    end_date: {type: DataTypes.DATE},
    ad_location: {type: DataTypes.STRING},
    amount: {type: DataTypes.FLOAT},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
}, {freezeTableName: true, timestamps: false})

module.exports = AdsManagment