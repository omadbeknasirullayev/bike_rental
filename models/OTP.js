const sequelize = require("../config/db")
const {DataTypes} = require('sequelize')

const OTP = sequelize.define("otp", {
    id: {type: DataTypes.UUID, primaryKey: true},
    user_id: {type: DataTypes.INTEGER},
    otp: {type: DataTypes.STRING(100)},
    expiration_time: {type: DataTypes.DATE},
    verified: {type: DataTypes.BOOLEAN}
    
}, {freezeTableName: true, timestamps: false})

module.exports = OTP