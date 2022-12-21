const shopinfoSchema = require("./shopinfo.validators")
const userSchema = require("./user.validators")
const paymentSchema = require("./payment.validators.js")
const penaltySchema = require("./penalty.validators")
const rentalSchema = require("./rental.validators")
const bikeCategorySchema = require("./bike_category.validators")
const bikeInfoSchema = require("./bike_info.validators")
const clientSchema = require(("./client.validators"))
const userGroupSchema = require("./user_group.validators")
const adsManagmentSchema = require("./ads_managment.validators")



module.exports = {
    shopinfoSchema,
    userSchema,
    paymentSchema,
    penaltySchema,
    rentalSchema,
    bikeCategorySchema,
    bikeInfoSchema,
    clientSchema,
    userGroupSchema,
    adsManagmentSchema,
}